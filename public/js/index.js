const socket = io("http://localhost:3000");

const form = document.querySelector('form');
const input = document.querySelector('.input');
const messagelist = document.querySelector('.messagelist');
const clients = document.querySelector('.clients');
const profile = document.querySelector('.profile')
























// socket.emit("chat message", {
//     message: "Salut je suis penuel Essoh, developpeur Js"
// })

// socket.on("message", (message) => {
//     console.log(message);

// const messages = []
// socket.on('messageClient', (message) => {
//     let msg = message.msg;
//     messages.push(msg)
    
//     let item = document.createElement('li');
//     item.textContent = messages;
//     messagelist.appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight);
// });


// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     if (input.value) {
//     socket.emit('message', input.value);
//     input.value = '';
//     }
// });