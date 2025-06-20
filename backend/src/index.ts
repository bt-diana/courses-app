import express from 'express';
import coursesRouter from './routes/courses.js';
import authorsRouter from './routes/authors.js';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = process.env.PORT;
const coursesPath = process.env.API_COURSES_PATH!;
const authorsPath = process.env.API_AUTHORS_PATH!;
const appURL = process.env.APP_URL!;
const appDevURL = process.env.APP_DEV_URL!;
const corsOptions = {
    origin: [appURL, appDevURL],
};

app.use(cors(corsOptions));
app.use(coursesPath, coursesRouter);
app.use(authorsPath, authorsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
