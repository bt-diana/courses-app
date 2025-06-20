import express from 'express';
import 'dotenv/config';

const app = express();
const port = process.env.PORT;

app.get('/', (_, res) => {
    res.type('text');
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
