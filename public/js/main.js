const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

// Handle messages from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // Scroll down to most recent message
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// User submits message to chat
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get message text
    const msg = e.target.elements.msg.value;

    // Send message to server
    socket.emit('chatMessage', msg);

    // Clear message in input box
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus;
});

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}