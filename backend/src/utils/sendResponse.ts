import type { Response } from 'express';
import { ObjectLiteral } from 'typeorm';

enum StatusCode {
    success = 200,
    created = 201,
    deleted = 204,
    invalid = 400,
    notFound = 404,
    internalError = 500,
}

enum Message {
    invalidBody = 'Request body does not contain required fields',
    resourceNotFound = 'Resource does not exist',
    instanceNotFound = "Instance with provided id doesn't exist",
    deletionRestricted = 'Could not delete instance',
    internalErorr = 'Internal Server Error',
}

const sendResponse = <T extends ObjectLiteral>(
    res: Response,
    status: StatusCode = StatusCode.success,
    data?: Message | T | Array<T>,
): void => {
    res.status(status);
    if (data) {
        res.type(typeof data === 'string' ? 'text' : 'json');
        res.send(data);
    } else {
        res.end();
    }
};

export { sendResponse, StatusCode, Message };
