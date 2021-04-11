// require variables
const express = require('express');
const path = require('path');
// const session = require('express-session');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const routes = require('./controllers')

const port = process.env.PORT || 3000;


//connects public folder for CSS / JS
app.use(express.static(path.join(__dirname, "/public")));

// app.use()
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//connects socket.io
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

app.use(routes);


http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

