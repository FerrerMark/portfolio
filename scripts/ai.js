function toggleBotModal(show) {
    const botModal = document.getElementById("botModal");
    const askIcon = document.querySelector(".ask");
    botModal.style.display = show ? 'block' : 'none';
    askIcon.style.display = show ? 'none' : 'block';
}
