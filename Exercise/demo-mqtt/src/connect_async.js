const mqtt = require('mqtt');

const connectAsync = async () => {
  const brokerUrl = 'mqtt://local.rocky.kc';
  const options = {
    // port: 1883,
    username: 'chen',
    password: '2555',
  };

  const client = mqtt.connect(brokerUrl, options);

  return new Promise((resolve, reject) => {
    client.on('connect', () => {
      console.log('连接成功');
      resolve(client);
    });

    client.on('error', (error) => {
      console.error('发生错误:', error);
      reject(error);
    });
  });
};

(async () => {
  try {
    const client = await connectAsync();

    client.subscribe('test_topic');
    client.publish('test_topic', 'Hello MQTT');

    client.on('message', (topic, message) => {
      console.log('收到新消息:', topic, message.toString());
    });

    client.on('close', () => {
      console.log('连接已断开');
    });
  } catch (error) {
    console.error('连接失败:', error);
  }
});
