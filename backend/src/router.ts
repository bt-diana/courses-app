import express from 'express';
import type { ObjectLiteral, ObjectType } from 'typeorm';
import { readInstance, readInstanceAll } from './crud/read.js';
import { createInstance } from './crud/create.js';
import { updateInstance } from './crud/update.js';
import { deleteInstance } from './crud/delete.js';
import { sendResponse, StatusCode, Message } from './utils/sendResponse.js';
import {
    hasEntityFileds,
    hasEntityRelations,
} from './utils/hasEntityFileds.js';

const getRouter = <T extends ObjectLiteral>(entity: ObjectType<T>) => {
    const router = express.Router();

    router.get('/', async (_, res) => {
        res.type('json');
        const courses = await readInstanceAll(entity);
        sendResponse(res, StatusCode.success, courses);
    });

    router.get('/:id', async (req, res) => {
        const course = await readInstance(entity, req.params.id);

        if (course) {
            sendResponse(res, StatusCode.success, course);
        } else {
            sendResponse(res, StatusCode.notFound, Message.instanceNotFound);
        }
    });

    router.post('/', async (req, res) => {
        if (
            hasEntityFileds(entity, req.body, true) &&
            hasEntityRelations(entity, req.body, true)
        ) {
            const course = await createInstance(entity, req.body);
            sendResponse(res, StatusCode.created, course!);
        } else {
            sendResponse(res, StatusCode.invalid, Message.invalidBody);
        }
    });

    router.put('/:id', async (req, res) => {
        if (
            hasEntityFileds(entity, req.body, true) &&
            hasEntityRelations(entity, req.body, true)
        ) {
            const course = await updateInstance(
                entity,
                req.params.id,
                req.body,
            );

            if (course) {
                sendResponse(res, StatusCode.created, course);
            } else {
                sendResponse(
                    res,
                    StatusCode.notFound,
                    Message.instanceNotFound,
                );
            }
        } else {
            sendResponse(res, StatusCode.invalid, Message.invalidBody);
        }
    });

    router.delete('/:id', async (req, res) => {
        if (await readInstance(entity, req.params.id)) {
            if (await deleteInstance(entity, req.params.id)) {
                sendResponse(res, StatusCode.deleted);
            } else {
                sendResponse(
                    res,
                    StatusCode.invalid,
                    Message.deletionRestricted,
                );
            }
        } else {
            sendResponse(res, StatusCode.notFound, Message.instanceNotFound);
        }
    });

    return router;
};

export { getRouter };
