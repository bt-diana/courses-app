import { ObjectLiteral, ObjectType } from 'typeorm';
import AppDataSource from '../dataSource/dataSource.js';

const deleteInstance = async <T extends ObjectLiteral>(
    entity: ObjectType<T>,
    id: string,
) => {
    return !!(
        await AppDataSource.manager
            .createQueryBuilder()
            .delete()
            .from(entity)
            .where('id = :id', { id: id })
            .execute()
    ).affected;
};

export { deleteInstance };
