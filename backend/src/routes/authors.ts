import express from 'express';
import { readById, readAll } from '../crud/read.js';
import { createAuthor } from '../crud/create.js';
import { Author } from 'entity/Author.js';

const router = express.Router();

router.get('/', async (_, res) => {
    res.type('json');
    res.send(await readAll());
});

router.get('/:id', async (req, res) => {
    res.type('json');
    res.send(await readById(Author, req.params.id));
});

router.post('/', async (req, res) => {
    const author = createAuthor(Author, req.body);

    if (author) {
        res.status(201);
        res.type('json');
        res.send(author);
    } else {
        res.status(400);
        res.type('text');
        res.send('Could not create an author');
    }
});

export default router;
