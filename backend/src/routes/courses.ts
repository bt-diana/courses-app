import express from 'express';
import { Course } from '../entity/Course.js';
import { readInstance, readInstanceAll } from '../crud/read.js';
import { createInstance } from '../crud/create.js';
import { updateInstance } from '../crud/update.js';
import { deleteInstance } from '../crud/delete.js';
import AppDataSource from '../dataSource.js';

const router = express.Router();

router.get('/', async (_, res) => {
    res.type('json');
    const courses = await Promise.all(
        (await readInstanceAll(Course)).map(async (course) => {
            const authors = await AppDataSource.createQueryBuilder()
                .relation(Course, 'authors')
                .of(course)
                .loadMany();
            return { ...course, authors };
        }),
    );
    res.send(courses);
});

router.get('/:id', async (req, res) => {
    const course = await readInstance(Course, req.params.id);

    if (course) {
        res.type('json');
        res.send(course);
    } else {
        res.status(404);
        res.type('text');
        res.send('Could not find course with id=' + req.params.id);
    }
});

router.post('/', async (req, res) => {
    const course = await createInstance(Course, req.body);

    if (course) {
        res.status(201);
        res.type('json');
        res.send(course);
    } else {
        res.status(400);
        res.type('text');
        res.send('Wrong request body');
    }
});

router.put('/:id', async (req, res) => {
    const course = await updateInstance(Course, req.params.id, req.body);

    if (course) {
        res.type('json');
        res.send(course);
    } else {
        res.status(404);
        res.type('text');
        res.send('Could not find course with id=' + req.params.id);
    }
});

router.delete('/:id', async (req, res) => {
    if (await readInstance(Course, req.params.id)) {
        if (await deleteInstance(Course, req.params.id)) {
            res.status(204);
            res.end();
        } else {
            res.status(400);
            res.type('text');
            res.send('Could not delete course with id=' + req.params.id);
        }
    } else {
        res.status(404);
        res.type('text');
        res.send('Could not find course with id=' + req.params.id);
    }
});

export default router;
