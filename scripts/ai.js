const WAKE_INTERVAL = 5 * 60 * 1000;

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
    fetch('https://personal-api-ftdn.onrender.com/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: wake })
    })
    .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
    })
    .then(data => {
        const reply = data.answer || 'No response from AI.'; 
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

    fetch('https://personal-api-ftdn.onrender.com/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: message }) 
    })
    .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
    })
    .then(data => {
        const reply = data.answer || 'No response from AI.'; 
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
