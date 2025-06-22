import { EntityTarget, ObjectLiteral } from 'typeorm';
import AppDataSource from '../dataSource.js';
import { readById } from './read.js';

const updateAuthor = async <T extends ObjectLiteral>(
    entity: EntityTarget<T>,
    id: string,
    data: Omit<EntityTarget<T>, 'id'>,
) => {
    const authorId = (
        await AppDataSource.manager
            .createQueryBuilder()
            .update(entity)
            .set(data)
            .where('id = :id', { id: id })
            .execute()
    ).generatedMaps[0]?.id;

    if (authorId) {
        return readById(entity, authorId);
    }
};

export { updateAuthor };
