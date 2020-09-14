var socket = io();
//var chatForm  = document.getElementById('chatform');
socket.on('connect',()=>{
    console.log('user connected ');
    const name = prompt("enter name to join");
    socket.emit('userjoin',name);
    
})



socket.on('messagel', message => {
    console.log(message);
    outputMessage(message,'left');
});
socket.on('messager', message => {
    console.log(message);
    outputMessage(message,'right');
});
socket.on('default',messsage => {
    console.log(messsage);
    outputMessage(messsage,'center');
})

var chatForm = document.querySelector('#chatform');

chatForm.addEventListener('submit', e=>{
    e.preventDefault();
    const message = e.target.elements.msg.value;
    //console.log(message);
    socket.emit('chatmessage',message);
});

function outputMessage(message,pos){
    //console.log(message.text)
    const div = document.createElement('div');
    div.classList.add('chat');
    div.classList.add(pos);
    div.innerHTML = `<p>${message.user}   :${message.createdAt}</p>
                <p>${message.text}</p>`;
    //div.innerHTML = `<p>${message.user}</p>`;
    
    document.querySelector('.chat-messages').append(div);

}
// function outputDefault(message){
//     //console.log(message.text)
//     const div = document.createElement('div');
//     div.classList.add('default');

//     div.innerHTML = `<p>${message.user}   ${message.createdAt}</p>
//                 <p>${message.text}</p>`;
                
//     //div.innerHTML = `<p>${message.user}</p>`;
    
//     document.querySelector('.chat-messages').appendChild(div);

// }


