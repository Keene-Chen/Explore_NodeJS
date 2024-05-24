import { PrismaClient } from '@prisma/client';
import express from 'express';

// Create a new instance of PrismaClient
const prisma = new PrismaClient();
// Create a new instance of Express
const app = express();
const port: number = 3000;

// 解析 application/json
app.use(express.json());

/* 增加 */
app.post('/create', async (req, res) => {
  const { email, username, password } = req.body;
  const data = await prisma.user.create({
    data: {
      email,
      username,
      password,
      posts: {
        create: {
          title: 'Hello World',
          content: 'This is my first post',
        },
      },
    },
  });
  res.send(data);
});

/* 删除 */
app.delete('/delete', async (req, res) => {
  const { id } = req.body;
  const data = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.send(data);
});

/* 更新 */
app.put('/update', async (req, res) => {
  const { id, username, email } = req.body;
  const data = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      username,
      email,
    },
  });
  res.send(data);
});

/* 关联查找 */
app.get('/', async (req, res) => {
  const data = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  res.send(data);
});

/* 单个查找 */
app.get('/user/:id', async (req, res) => {
  const data = await prisma.user.findMany({
    where: {
      id: Number(req.params.id), // req获取的字符串要转为数值
    },
  });
  res.send(data);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
