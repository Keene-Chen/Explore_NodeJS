let WebSocketClient = require('websocket').client;

let client = new WebSocketClient();

client.on('connectFailed', function (error) {
  console.log('Connect Error: ' + error.toString());
});

client.on('connect', (conn) => {
  console.log('WebSocket Client Connected');
  conn.on('error', function (error) {
    console.log('Connection Error: ' + error.toString());
  });
  conn.on('close', () => {
    console.log('echo-protocol Connection Closed');
  });
  conn.on('message', (message) => {
    if (message.type === 'utf8') {
      console.log("Received: '" + message.utf8Data + "'");
    }
  });

  function sendNumber() {
    if (conn.connected) {
      var number = Math.round(Math.random() * 0xffffff);
      conn.sendUTF(number.toString());
      setTimeout(sendNumber, 1000);
    }
  }
  sendNumber();
});

client.connect('ws://localhost:8080/', 'echo-protocol');
