import express from 'express';
import { Author } from '../entity/Author.js';
import { readInstance, readInstanceAll } from '../crud/read.js';
import { createInstance } from '../crud/create.js';
import { updateInstance } from '../crud/update.js';
import { deleteInstance } from '../crud/delete.js';

const router = express.Router();

router.get('/', async (_, res) => {
    res.type('json');
    res.send(await readInstanceAll(Author));
});

router.get('/:id', async (req, res) => {
    const author = await readInstance(Author, req.params.id);

    if (author) {
        res.type('json');
        res.send(author);
    } else {
        res.status(404);
        res.type('text');
        res.send('Could not find author with id=' + req.params.id);
    }
});

router.post('/', async (req, res) => {
    const author = await createInstance(Author, req.body);

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
        res.status(404);
        res.type('text');
        res.send('Could not find author with id=' + req.params.id);
    }
});

router.delete('/:id', async (req, res) => {
    if (await readInstance(Author, req.params.id)) {
        if (await deleteInstance(Author, req.params.id)) {
            res.status(204);
            res.end();
        } else {
            res.status(400);
            res.type('text');
            res.send('Could not delete author with id=' + req.params.id);
        }
    } else {
        res.status(404);
        res.type('text');
        res.send('Could not find author with id=' + req.params.id);
    }
});

export default router;
