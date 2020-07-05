var express=require("express");
var app=express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use("/build", express.static(__dirname + '/build'));
app.use("/midi", express.static(__dirname + '/node_modules/midiconvert/build'));
app.use("/images", express.static(__dirname + './images'));
app.use("/audio/Salamander", express.static(__dirname + '/audio/Salamander'));
app.use("/audio/string_ensemble", express.static(__dirname + '/audio/string_ensemble'));


app.get('/server', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/user', (req, res) => {
  res.sendFile(__dirname + '/user.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);             //muestro en consola
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);                   //mando el mensaje a todos y a mi
  });
});/*
io.on('connection', (socket) => {               //mando mensajes a todos menos a mi
  socket.broadcast.emit('hi');
});*/
http.listen(3000, () => {
  console.log('listening on *:3000/server and *:3000/user');
});
