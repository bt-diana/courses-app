import { EntityTarget, ObjectLiteral } from 'typeorm';
import AppDataSource from '../dataSource.js';
import { readById } from './read.js';

const createAuthor = async <T extends ObjectLiteral>(
    entity: EntityTarget<T>,
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
        return readById(entity, newAuthorId);
    }
};

export { createAuthor };
