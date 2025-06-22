import express from 'express';
import { Author } from '../entity/Author.js';
import { readById, readAll } from '../crud/read.js';
import { createAuthor } from '../crud/create.js';
import { updateAuthor } from '../crud/update.js';

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
        res.send('Wrong request body');
    }
});

router.put('/:id', async (req, res) => {
    const author = await updateAuthor(Author, req.params.id, req.body);

    if (author) {
        res.type('json');
        res.send(author);
    } else {
        res.status(400);
        res.type('text');
        res.send('Could not find user with id' + req.params.id);
    }
});

export default router;
