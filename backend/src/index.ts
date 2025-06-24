import https from 'https';
import { readFileSync } from 'fs';
import express from 'express';
import { getRouter } from './router.js';
import { Author } from './entity/Author.js';
import { Course } from './entity/Course.js';
import cors from 'cors';
import 'dotenv/config';

const port = process.env.PORT;
const coursesPath = process.env.API_COURSES_PATH!;
const authorsPath = process.env.API_AUTHORS_PATH!;
const appURL = process.env.APP_URL!;

const app = express();
const options = {
    key: readFileSync('server.key'),
    cert: readFileSync('server.cert'),
};
const corsOptions = {
    origin: appURL,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(coursesPath, getRouter(Course));
app.use(authorsPath, getRouter(Author));

https.createServer(options, app).listen(port, () => {
    console.log(`HTTPS Server running on port ${port}`);
});
