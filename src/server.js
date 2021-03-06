const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const socket = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors());

const server = http.Server(app);
const io = socket(server);

io.on('connection', (socket) => {
  socket.on('connectionRoom', (box) => {
    socket.join(box);
  });
  console.log('OK');
});

mongoose.connect('mongodb+srv://xanatrone:xanatrone@cluster0-qpfpp.mongodb.net/xanatrone?retryWrites=true', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(process.env.PORT || 8000);
