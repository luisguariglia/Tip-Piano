var express=require("express");
var app=express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use("/build", express.static(__dirname + '/build'));
app.use("/midi", express.static(__dirname + '/node_modules/midiconvert/build'));
app.use("/images", express.static(__dirname + './images'));
app.use("/audio/Salamander", express.static(__dirname + '/audio/Salamander'));
app.use("/audio/string_ensemble", express.static(__dirname + '/audio/string_ensemble'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
