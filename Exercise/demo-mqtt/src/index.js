const mqtt = require('mqtt');

// MQTT代理服务器的地址和端口
const brokerUrl = 'mqtt://local.rocky.kc';
const options = {
  // port: 1883,
  username: 'chen',
  password: '2555',
};

// 创建一个客户端实例
const client = mqtt.connect(brokerUrl, options);

// 客户端连接成功事件处理函数
client.on('connect', () => {
  console.log('连接成功');

  // 订阅主题
  client.subscribe('test_topic');

  // 发布消息
  client.publish(
    'test_topic',
    'Hello MQTT',
    {
      qos: 1,
    },
    console.log
  );
});

// 接收到新消息事件处理函数
client.on('message', (topic, message) => {
  console.log('收到新消息:', topic, message.toString());
});

// 客户端断开连接事件处理函数
client.on('close', () => {
  console.log('连接已断开');
});

// 客户端错误事件处理函数
client.on('error', (error) => {
  console.error('发生错误:', error);
});
