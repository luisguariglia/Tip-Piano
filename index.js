var express=require("express");
var app=express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT ||3000
var sala="1";

app.use("/build", express.static(__dirname + '/build'));
app.use("/style", express.static(__dirname + '/style'));
app.use("/midi", express.static(__dirname + '/node_modules/midiconvert/build'));
app.use("/images", express.static(__dirname + './images'));
app.use("/audio/Salamander", express.static(__dirname + '/audio/Salamander'));
app.use("/audio/string_ensemble", express.static(__dirname + '/audio/string_ensemble'));
app.use("/", express.static(__dirname + '/'));

app.get('/server', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/user', (req, res) => {
  res.sendFile(__dirname + '/user.html');
});
app.get('/screen', (req, res) => {
  res.sendFile(__dirname + '/screen.html');
});

io.on('connection', (socket) => {
  //socket.join(sala);
  let sroom;
  console.log('a user connected to:'+sala);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('join', function(room) {
    console.log('join', room);
    sroom = 'sala'+room;
    socket.join(sroom, function() {
        console.log(socket.rooms); 
    });
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);             //muestro en consola
    io.to(sroom).emit('chat message', msg);                   //mando el mensaje a todos y a mi
  });
});
/*io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);             //muestro en consola
  });
});*/

io.on('connection', (socket) => {
  /*socket.on('chat message', (msg) => {
    io.to(sala).emit('chat message', msg);                   //mando el mensaje a todos y a mi
  });*/
});


http.listen(PORT, () => {
  console.log('listening on *:PORT/server and *:PORT/user');
});

function setSala(){
  this.sala=document.getElementById("sala").value;
}