import { EntityTarget, ObjectLiteral } from 'typeorm';
import AppDataSource from '../dataSource.js';
import { readInstance } from './read.js';

const updateInstance = async <T extends ObjectLiteral>(
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
        return readInstance(entity, id);
    }
};

export { updateInstance };
