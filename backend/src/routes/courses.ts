import express from 'express';
import { Course } from '../entity/Course.js';
import {
    readInstance,
    readInstanceAll,
    readRelatedData,
} from '../crud/read.js';
import { createInstance, createRelationData } from '../crud/create.js';
import { updateInstance } from '../crud/update.js';
import { deleteInstance } from '../crud/delete.js';

const router = express.Router();

router.get('/', async (_, res) => {
    res.type('json');
    const courses = await readInstanceAll(Course);
    await Promise.all(
        courses.map(async (course) => {
            course.authors = await readRelatedData(Course, 'authors', course);
        }),
    );
    res.send(courses);
});

router.get('/:id', async (req, res) => {
    const course = await readInstance(Course, req.params.id);

    if (course) {
        course.authors = await readRelatedData(Course, 'authors', course);
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
        await createRelationData(Course, 'authors', course, req.body.authors);
        course.authors = await readRelatedData(Course, 'authors', course);

        res.status(201);
        res.type('json');
        res.send(course);
    } else {
        res.status(400);
        res.type('text');
        res.send(
            'Request body does not contain required fields ro containg wrong data type',
        );
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
