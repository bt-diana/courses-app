import { ObjectLiteral, EntityTarget } from 'typeorm';
import AppDataSource from '../dataSource.js';
import { Author } from '../entity/Author.js';

const readById = <T extends ObjectLiteral>(
    entity: EntityTarget<T>,
    id: string,
) => {
    return AppDataSource.manager
        .createQueryBuilder(entity, 'entity')
        .where('entity.id = :id', { id: id })
        .getOne();
};

const readAll = () => {
    return AppDataSource.manager.find(Author);
};

export { readById, readAll };
