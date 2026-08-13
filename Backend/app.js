import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import cloudinary from 'cloudinary';
import router from './routes/TeacherRoute.js';
import feeSubmitRouter from './routes/FeeSubmitRoute.js';
import studentRouter from './routes/StudentRoute.js';

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME || '',
  api_key: process.env.CLOUD_API || '',
  api_secret: process.env.CLOUD_SCRET || '',
});

app.disable('x-powered-by');
app.use(helmet());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(cookieParser());

app.use('/api/user', router);
app.use('/api/student/fee', feeSubmitRouter);
app.use('/api/student-data', studentRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/Frontend/dist')));
app.get(/^\/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'));
});

export default app;
