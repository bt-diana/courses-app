import express from 'express';
import coursesRouter from './routes/courses.js';
import authorsRouter from './routes/authors.js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT;
const coursesPath = process.env.API_COURSES_PATH!;
const authorsPath = process.env.API_AUTHORS_PATH!;

app.use(coursesPath, coursesRouter);
app.use(authorsPath, authorsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
