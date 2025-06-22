import express from 'express';
import AppDataSource from '../dataSource.js';
import { Course } from '../entity/Course.js';

const router = express.Router();

router.get('/', async (_, res) => {
    res.type('json');
    res.send(await AppDataSource.manager.find(Course));
});

router.get('/:id', async (req, res) => {
    res.type('json');
    const course = await AppDataSource.manager
        .createQueryBuilder(Course, 'course')
        .where('course.id = :id', { id: req.params.id })
        .getOne();
    res.send(course);
});

export default router;
