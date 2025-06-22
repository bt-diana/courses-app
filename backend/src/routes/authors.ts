import express from 'express';
import AppDataSource from '../dataSource.js';
import { Author } from '../entity/Author.js';

const router = express.Router();

const getAuthorById = async (id: string) => {
    const author = await AppDataSource.manager
        .createQueryBuilder(Author, 'author')
        .where('author.id = :id', { id: id })
        .getOne();
    return author;
};

router.get('/', async (_, res) => {
    res.type('json');
    res.send(await AppDataSource.manager.find(Author));
});

router.get('/:id', async (req, res) => {
    res.type('json');
    res.send(await getAuthorById(req.params.id));
});

router.post('/', async (req, res) => {
    const newAuthorId = (
        await AppDataSource.manager
            .createQueryBuilder()
            .insert()
            .into(Author)
            .values(req.body)
            .execute()
    ).identifiers[0]?.id;
    if (newAuthorId) {
        res.status(201);
        res.type('json');
        res.send(await getAuthorById(newAuthorId));
    } else {
        res.status(400);
        res.type('text');
        res.send('Could not create an author');
    }
});

export default router;
