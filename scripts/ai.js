

function toggleBotModal(show) {
    const botModal = document.getElementById("botModal");
    const askIcon = document.querySelector(".ask");
    botModal.style.display = show ? 'block' : 'none';
    askIcon.style.display = show ? 'none' : 'block';
}

document.getElementById('botForm').addEventListener('submit', function(e) {

    
    e.preventDefault();

    const input = document.getElementById('userInput');
    const message = input.value.trim();
    if (!message) return;

    appendMessage('user', message);
    input.value = '';
    input.disabled = true;
    loading(true, "Thinking", "message");
    fetch('https://faculty.schoolmanagementsystem2.com/personalAPI/AIapi.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
    })
    .then(res => res.json())
    .then(data => {
        const reply = data.response || 'No response from AI.';
        appendMessage('Bot', reply);
        loading(false);
    })
    .catch(err => {
        appendMessage('Bot', 'Error contacting AI.');
        console.error(err);
        loading(false);
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
    const modal = document.getElementById('botModal');
    modal.style.display = show ? 'block' : 'none';
}