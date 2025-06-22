import { ObjectLiteral, EntityTarget } from 'typeorm';
import AppDataSource from '../dataSource.js';
import { Author } from '../entity/Author.js';

const readInstance = <T extends ObjectLiteral>(
    entity: EntityTarget<T>,
    id: string,
) => {
    return AppDataSource.manager
        .createQueryBuilder(entity, 'entity')
        .where('entity.id = :id', { id: id })
        .getOne();
};

const readInstanceAll = () => {
    return AppDataSource.manager.find(Author);
};

export { readInstance, readInstanceAll };
