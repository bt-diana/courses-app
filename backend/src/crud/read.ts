import { ObjectLiteral, EntityTarget } from 'typeorm';
import AppDataSource from '../dataSource.js';

const readInstance = <T extends ObjectLiteral>(
    entity: EntityTarget<T>,
    id: string,
) => {
    return AppDataSource.manager
        .createQueryBuilder(entity, 'entity')
        .where('entity.id = :id', { id: id })
        .getOne();
};

const readInstanceAll = <T extends ObjectLiteral>(entity: EntityTarget<T>) => {
    return AppDataSource.manager.find(entity);
};

export { readInstance, readInstanceAll };
