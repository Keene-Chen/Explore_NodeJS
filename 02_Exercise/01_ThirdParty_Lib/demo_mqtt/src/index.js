// 写一个mqtt的客户端，连接到mqtt服务器
// 1. 连接到mqtt服务器
// 2. 订阅一个主题
// 3. 发布一个主题
// 4. 接收一个主题

import { connect } from 'mqtt';
// MQTT 服务器的 URL
const brokerUrl = 'mqtt://test.mosquitto.org';

// 创建 MQTT 客户端
const client = connect(brokerUrl);

// 连接成功时的回调函数
client.on('connect', () => {
  console.log('Connected to MQTT server');

  // 订阅主题
  client.subscribe('myTopic', (err) => {
    if (!err) {
      console.log('Subscribed to myTopic');
    } else {
      console.error('Failed to subscribe:', err);
    }
  });

  // 发布主题
  client.publish('myTopic', 'Hello MQTT');
});

// 接收到消息时的回调函数
client.on('message', (topic, message) => {
  console.log('Received message:', message.toString());
  client.end();
});

// 断开连接时的回调函数
client.on('close', () => {
  console.log('Disconnected from MQTT server');
});
