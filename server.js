const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Y = require('yjs');
const { setupWSConnection } = require('y-websocket/bin/utils');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

const docs = new Map();

io.on('connection', (socket) => {
  const room = socket.handshake.query.room || 'default';
  socket.join(room);
  if (!docs.has(room)) {
    const doc = new Y.Doc();
    docs.set(room, doc);
  }
  const doc = docs.get(room);
  setupWSConnection(socket, doc);

  socket.on('note:add', (data) => {
    socket.to(room).emit('note:added', data);
  });

  socket.on('disconnect', () => {});
});

app.use(express.json());
app.post('/summarize', async (req, res) => {
  const { notes } = req.body;
  try {
    const response = await axios.post('http://localhost:5000/summarize', { text: notes.join('\n') });
    res.json({ summary: response.data.summary });
  } catch (err) {
    res.status(500).json({ error: 'Summarization service unreachable' });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
