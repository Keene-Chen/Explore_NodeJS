import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('A new client connected!');
  ws.send('Welcome new client!');

  ws.on('message', (message) => {
    console.log(`received: ${message}`);
  });

  ws.on('close', () => {
    console.log('A client disconnected');
  });
});

console.log('WebSocket server started on ws://localhost:8080');
