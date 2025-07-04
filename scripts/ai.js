    const waker = () => {
       const wake = "hey"; //the domain needs to wake because it's only free in render. It's sleeps when not in use
        fetch('https://apis-femq.onrender.com/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: wake })
        })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            return res.json();
        })
        .then(data => {
            const reply = data.response || 'No response from AI.';
            appendMessage('Bot', reply);
        })
        .catch(error => {
            console.error('Error:', error);
            appendMessage('Bot', 'Error: ' + error.message);
        })        
    };

    waker();

document.getElementById('botForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const input = document.getElementById('userInput');
    const message = input.value.trim();

    if (!message) return;
    if (message.length > 300) {
        appendMessage('Bot', 'Message must be 300 characters or less.');
        return;
    }

    appendMessage('user', message);
    input.value = '';
    input.disabled = true;
    loading(true, 'Thinking', 'message');

    fetch('https://apis-femq.onrender.com/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
    })
    .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
    })
    .then(data => {
        const reply = data.response || 'No response from AI.';
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
    const botModal = document.getElementById("botModal");
    const askIcon = document.querySelector(".ask");
    botModal.classList.toggle("hidChat", !show);
    botModal.classList.toggle("ShowChat", show);
    askIcon.style.display = show ? 'none' : 'block';
}