import express from 'express';
import 'dotenv/config';
import { connectDB } from './database/db.js';
import cloudinary from 'cloudinary';
import router from './routes/TeacherRoute.js';
import cookieParser from 'cookie-parser';
import path from 'path';

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SCRET,
})
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", router);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/Frontend/dist")));

app.get(/^\/.*/ ,(req,res) =>{
    res.sendFile(path.join(__dirname, "Frontend","dist","index.html"));
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
})