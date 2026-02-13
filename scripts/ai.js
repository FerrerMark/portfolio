const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_KEY = 'AIzaSyBwa2EUdXeJ9qMAIZAFY1mmHKYA5Y2vT08';

let resumeTextCache = null;

async function getResumeText() {
  if (resumeTextCache) return resumeTextCache;

  const res = await fetch('https://personal-api-ftdn.onrender.com/api/data');
  if (!res.ok) throw new Error('Failed to fetch resume data');

  const data = await res.json();
  let text = '';
  for (const key in data) {
    if (Array.isArray(data[key])) {
      text += `${key}:\n`;
      data[key].forEach((item, idx) => {
        if (typeof item === 'object') {
          text += `  - ${idx + 1}:\n`;
          for (const k in item) text += `      ${k}: ${item[k]}\n`;
        } else {
          text += `  - ${item}\n`;
        }
      });
    } else {
      text += `${key}: ${data[key]}\n`;
    }
  }

  resumeTextCache = text;
  return text;
}

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

const createPrompt = (question, resumeText, memory) => {
  return `
You are an AI assistant describing John Mark Ferrer.
Use the following resume data to answer all questions:
${resumeText}

Here is the chat history so far:
${memory}

Visitor question: ${question}

If the question is unrelated to him, politely reply: "I can only answer questions about John Mark Ferrer and his profile."
`;
};

async function getGeminiResponse(question) {
  const resumeText = await getResumeText();
  const memory = getChatMemory();
  const prompt = createPrompt(question, resumeText, memory);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Gemini request failed (${response.status}): ${details}`);
  }

  const data = await response.json();
  let fullText = data?.candidates?.[0]?.content?.parts?.map(p => p.text).join('') || 'No response from Gemini.';
  return fullText.split(/\s+/).slice(0, 80).join(' ');
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('botForm');
  const input = document.getElementById('userInput');

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