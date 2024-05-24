import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
  console.log('Connected to server');
  ws.send('Hello Server!');
});

ws.on('message', (data) => {
  console.log(data);
});

ws.on('close', () => {
  console.log('Disconnected from server');
});
