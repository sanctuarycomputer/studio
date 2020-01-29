'use strict'

// setup websocket
const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:8080')

ws.on('message', (data) => {
  console.dir(data);
})

// setup readline
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// handle line in
rl.on('line', function(input) {
  readline.moveCursor(process.stdout, 0, -1)
  readline.clearLine(process.stdout, 1)
  ws.send(input)
}).on('close',function(){
    process.exit(0);
});
