import type { ObjectLiteral, ObjectType } from 'typeorm';
import AppDataSource from '../dataSource/dataSource.js';

const readRelationData = <T extends ObjectLiteral>(
    entity: ObjectType<T>,
    relation: string,
    instance: T,
) => {
    return AppDataSource.createQueryBuilder()
        .relation(entity, relation)
        .of(instance)
        .loadMany();
};

const readInstance = <T extends ObjectLiteral>(
    entity: ObjectType<T>,
    id: string,
) => {
    return AppDataSource.manager
        .createQueryBuilder(entity, 'entity')
        .where('entity.id = :id', { id: id })
        .getOne();
};

const readInstanceAll = <T extends ObjectLiteral>(entity: ObjectType<T>) => {
    return AppDataSource.manager.find(entity);
};

export { readInstance, readInstanceAll, readRelationData };
