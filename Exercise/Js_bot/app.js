const { Bot, Message } = require('mirai-js');

const bot = new Bot();

const myFun2 = async () => {
    // 连接到一个 mirai-api-http 服务
    await bot.open({
        baseUrl: 'http://127.0.0.1:8080',
        verifyKey: 'INITKEYcbq5XG7x',
        // 要绑定的 qq，须确保该用户已在 mirai-console 登录
        qq: 940457151,
    });

    // await bot.sendMessage({
    //     // 群号
    //     group: '642137134',
    //     // 是 http server 接口所需的原始格式，若提供则优先使用
    //     message: new Message().addAtAll().addText('千节莫抄了！'),
    // });
    await bot.sendMessage({
        group: 642137134,
        message: new Message()
            .addFlashImageUrl(
                'https://dogefs.s3.ladydaily.com/~/source/wallhaven/full/x1/wallhaven-x166j3.jpg'
            )
            .addText('机器人发送'),
    });
};
myFun2();
