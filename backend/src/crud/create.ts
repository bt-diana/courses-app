import type { ObjectType, ObjectLiteral } from 'typeorm';
import AppDataSource from '../dataSource/dataSource.js';
import { readInstance } from './read.js';

const createRelationData = <T extends ObjectLiteral>(
    entity: ObjectType<T>,
    relation: string,
    instance: T,
    relationData: unknown,
) => {
    return AppDataSource.createQueryBuilder()
        .relation(entity, relation)
        .of(instance)
        .add(relationData);
};

const createInstance = async <T extends ObjectLiteral>(
    entity: ObjectType<T>,
    data: Omit<EntityTarget<T>, 'id'>,
) => {
    const newAuthorId = (
        await AppDataSource.manager
            .createQueryBuilder()
            .insert()
            .into(entity)
            .values(data)
            .execute()
    ).generatedMaps[0]?.id;

    if (newAuthorId) {
        return readInstance(entity, newAuthorId);
    }
};

export { createInstance, createRelationData };
