'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');

const WebSocket = require('ws');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

const server = createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function(ws) {
  const id = setInterval(function() {
    ws.send(JSON.stringify(process.memoryUsage()), function() {
      //
      // Ignore errors.
      //
    });
  }, 10000);
  console.log('client connected');

  ws.on('close', function() {
    console.log('client closed connection');
    clearInterval(id);
  });

  ws.on('message', function(data) {
    console.dir(data);
  });
});

server.listen(8080, function() {
  console.log('Listening on http://localhost:8080');
});
