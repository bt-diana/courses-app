import express from 'express';
import AppDataSource from '../dataSource.js';
import { Author } from '../entity/Author.js';

const router = express.Router();

router.get('/', async (_, res) => {
    res.type('json');
    res.send(await AppDataSource.manager.find(Author));
});

router.get('/:id', async (req, res) => {
    res.type('json');
    const author = await AppDataSource.manager
        .createQueryBuilder(Author, 'author')
        .where('author.id = :id', { id: req.params.id })
        .getOne();
    res.send(author);
});

export default router;
