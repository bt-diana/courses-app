import express from 'express';
import { Author } from '../entity/Author.js';
import { readInstance, readInstanceAll } from '../crud/read.js';
import { createInstance } from '../crud/create.js';
import { updateInstance } from '../crud/update.js';

const router = express.Router();

router.get('/', async (_, res) => {
    res.type('json');
    res.send(await readInstanceAll());
});

router.get('/:id', async (req, res) => {
    res.type('json');
    res.send(await readInstance(Author, req.params.id));
});

router.post('/', async (req, res) => {
    const author = createInstance(Author, req.body);

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
    const author = await updateInstance(Author, req.params.id, req.body);

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
