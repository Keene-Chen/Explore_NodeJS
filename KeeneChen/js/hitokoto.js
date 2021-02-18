fetch(
    'https://v1.hitokoto.cn?c=d&c=i&c=k&charset=utf-8&encode=json&max_length=30&min_length=10'
)
    .then((response) => response.json())
    .then((data) => {
        const hitokoto = document.getElementById('hitokoto_text');
        hitokoto.href = 'https://hitokoto.cn/?uuid=' + data.uuid;
        hitokoto.innerText = '「' + data.hitokoto.replace('。', '') + '」';
    })
    .catch(console.error);