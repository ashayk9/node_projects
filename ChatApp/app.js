var express = require("express");
var path = require("path");
var http = require("http");
const { emit } = require("process");
var port = process.env.port || 5000;
var moment = require('moment');

var app = express();
var server = http.createServer(app);
var io = require("socket.io")(server);
const users={}
var bodyParser = require("body-parser");
var {genmessage} = require("./message");


app.use(express.static(path.join(__dirname ,"public")));
app.use(bodyParser.urlencoded({extended:true}));

// app.get("/",(req,res)=>{
//     res.render("index.ejs");
// });
// app.get("/join",(req,res)=>{
//     res.render("join.ejs");
// });
// app.post('/join',(req,res)=>{
//     name = req.body.name;
//     console.log(name);
//     res.redirect('/');
// });



io.on('connection',(socket)=>{
    //console.log("helo");

    socket.on('userjoin',function(name){
        //console.log(name)
        socket.emit('default',genmessage('admin','welcome to the chat'));
        users[socket.id]=name;
        socket.broadcast.emit('default',genmessage('admin',`${name} joined the chat`));

    });
    
    socket.on('disconnect', function () {
         io.emit('default',genmessage('admin',`user left the chat`));
     });
     
    socket.on('chatmessage',function(msg){
        socket.broadcast.emit('messagel',genmessage(users[socket.id],msg));
        socket.emit('messager',genmessage('you',msg))
    });
});



server.listen(port,()=>{
    console.log("server started");
})