import express from 'express';
import multer from 'multer';
import cors from 'cors';

const app = express();

// 允许跨域
app.use(cors());

// 设置存储配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/'); // 确保这个目录已经存在
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// 文件上传路由
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file)
    return res.status(400).send('No file uploaded.');

  return res.send('File uploaded successfully.');
});

// 启动服务器
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
