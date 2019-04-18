
if (!window.WebSocket) {
    document.body.innerHTML = 'This browser WebSocket does not support ';
}

const socket = new WebSocket("ws://localhost:3001");

socket.onopen = function () {
    // connection is opened and ready to use
};

socket.onmessage = function(event) {
    const incomingMessage = event.data;
    showMessage(incomingMessage);
};

function showMessage(message) {
   console.log(message);
}
