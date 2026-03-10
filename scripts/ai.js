const API_BASE_URL = 'https://personal-api-ftdn.onrender.com';
const RESUME_API_URL = `${API_BASE_URL}/api/data`;
const AI_API_URL = `${API_BASE_URL}/api/ai/ask`;
const KEEP_ALIVE_INTERVAL_MS = 3 * 60 * 1000;

async function keepResumeApiAwake() {
  try {
    await fetch(`${RESUME_API_URL}?wake=${Date.now()}`, {
      method: 'GET',
      cache: 'no-store'
    });
  } catch (_error) {
    // ignore
  }
}

keepResumeApiAwake();
setInterval(keepResumeApiAwake, KEEP_ALIVE_INTERVAL_MS);

function getChatMemory() {
  const messages = document.querySelectorAll('#botModal .message > div');
  let memory = '';
  messages.forEach(msg => {
    const role = msg.className === 'user' ? 'User' : 'Bot';
    const text = msg.innerText.trim();
    if (text) memory += `${role}: ${text}\n`;
  });
  return memory;
}

async function getGeminiResponse(question) {
  const memory = getChatMemory();
  const questionWithContext = memory
    ? `${question}\n\nChat history:\n${memory}`
    : question;

  const response = await fetch(AI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: questionWithContext })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`AI request failed (${response.status}): ${details}`);
  }

  const data = await response.json();
  const fullText = data?.answer || 'No response from AI.';
  return fullText.split(/\s+/).slice(0, 80).join(' ');
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('botForm');
  const input = document.getElementById('userInput');

  keepResumeApiAwake();
  setInterval(keepResumeApiAwake, KEEP_ALIVE_INTERVAL_MS);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    appendMessage('user', message);
    input.value = '';
    input.disabled = true;
    loading(true);

    try {
      const reply = await getGeminiResponse(message);
      appendMessage('Bot', reply);
    } catch (err) {
      appendMessage('Bot', 'Sorry, something went wrong. Please try again later.');
    } finally {
      input.disabled = false;
      input.focus();
      loading(false);
    }
  });
});

function appendMessage(sender, text) {
  const container = document.querySelector('#botModal .message');
  const div = document.createElement('div');
  div.className = sender;
  div.innerHTML = `<p>${text}</p>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function toggleBotModal(show) {
  const botModal = document.getElementById('botModal');
  const askIcon = document.querySelector('.ask');
  botModal.classList.toggle('hidChat', !show);
  botModal.classList.toggle('ShowChat', show);
  askIcon.style.display = show ? 'none' : 'block';
}

function loading(isLoading, msg = 'Thinking...') {
  const container = document.querySelector('#botModal .message');
  if (isLoading) {
    const div = document.createElement('div');
    div.id = 'loadingIndicator';
    div.className = 'loading';
    div.innerHTML = `<p>${msg}</p>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  } else {
    const el = document.getElementById('loadingIndicator');
    if (el) el.remove();
  }
}


