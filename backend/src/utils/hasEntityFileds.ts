import { ObjectType, ObjectLiteral } from 'typeorm';
import { getEntityFileds, getEntityRelations } from './getEntityFileds.js';

const hasEntityFileds = <T extends ObjectLiteral>(
    entity: ObjectType<T>,
    data: object,
    onlyRequired: boolean = false,
): data is Omit<ObjectType<T>, 'id'> =>
    getEntityFileds(entity, onlyRequired).every((field) =>
        Object.prototype.hasOwnProperty.call(data, field),
    );

const hasEntityRelations = <T extends ObjectLiteral>(
    entity: ObjectType<T>,
    data: object,
    onlyRequired: boolean = false,
): data is Omit<ObjectType<T>, 'id'> =>
    getEntityRelations(entity, onlyRequired).every((field) =>
        Object.prototype.hasOwnProperty.call(data, field),
    );

export { hasEntityFileds, hasEntityRelations };
