import 'dotenv/config';
import app from './app.js';
import { connectDB } from './database/db.js';

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});
