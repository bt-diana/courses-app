import { EntityTarget, ObjectLiteral } from 'typeorm';
import AppDataSource from '../dataSource.js';
import { readById } from './read.js';

const updateAuthor = async <T extends ObjectLiteral>(
    entity: EntityTarget<T>,
    id: string,
    data: Omit<EntityTarget<T>, 'id'>,
) => {
    if (
        (
            await AppDataSource.manager
                .createQueryBuilder()
                .update(entity)
                .set(data)
                .where('id = :id', { id: id })
                .execute()
        ).affected
    ) {
        return readById(entity, id);
    }
};

export { updateAuthor };
