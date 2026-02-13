const WAKE_INTERVAL = 5 * 60 * 1000;
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_KEY = window.GEMINI_API_KEY || '';

const getGeminiResponse = async (question) => {
    if (!GEMINI_API_KEY) {
        throw new Error('Gemini API key is missing. Set window.GEMINI_API_KEY in index.html.');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [
                {
                    role: 'user',
                    parts: [{ text: question }]
                }
            ]
        })
    });

    if (!response.ok) {
        const details = await response.text();
        throw new Error(`Gemini request failed (${response.status}): ${details}`);
    }

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.map(part => part.text).join('') || 'No response from Gemini.';
};

const waker = () => {
    const lastWake = localStorage.getItem('lastWakeTime');
    const now = Date.now();

    if (lastWake && now - Number(lastWake) < WAKE_INTERVAL) {
        return;
    }

    localStorage.setItem('lastWakeTime', now.toString());

    const input = document.getElementById('userInput');
    loading(true, 'AI is waking, please wait 1-30s', 'message'); 
    input.disabled = true;
    input.focus();

    const wake = "hey"; 
    getGeminiResponse(wake)
    .then(reply => {
        appendMessage('Bot', reply);
        loading(false);
        input.disabled = false;
    })
    .catch(error => {
        console.error('Error:', error);
        appendMessage('Bot', 'Error: ' + error.message);
        loading(false);
        input.disabled = false;
    });
};

waker();

document.getElementById('botForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const input = document.getElementById('userInput');
    const message = input.value.trim();

    if (!message) return;
    if (message.length > 300) {
        appendMessage('Bot', 'Message must be 80 words or less.');
        return;
    }

    appendMessage('user', message);
    input.value = '';
    input.disabled = true;
    loading(true, 'Thinking', 'message');

    getGeminiResponse(message)
    .then(reply => {
        appendMessage('Bot', reply);
    })
    .catch(err => {
        appendMessage('Bot', 'Sorry, something went wrong. Please try again later.');
        console.error('Fetch error:', err);
    })
    .finally(() => {
        input.disabled = false;
        input.focus();
        loading(false);
    });
});

function appendMessage(sender, text) {
    const messageContainer = document.querySelector('#botModal .message');
    const msgDiv = document.createElement('div');
    msgDiv.className = sender;
    msgDiv.innerHTML = `<p>${text}</p>`;
    messageContainer.appendChild(msgDiv);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

function toggleBotModal(show) {
    if (show) {
        waker();
    }
    const botModal = document.getElementById("botModal");
    const askIcon = document.querySelector(".ask");
    botModal.classList.toggle("hidChat", !show);
    botModal.classList.toggle("ShowChat", show);
    askIcon.style.display = show ? 'none' : 'block';
}
