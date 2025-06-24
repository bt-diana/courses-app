import type { ObjectLiteral, ObjectType } from 'typeorm';
import AppDataSource from '../dataSource/dataSource.js';
import { getEntityRelations } from '../utils/getEntityFileds.js';

const readRelationData = <T extends ObjectLiteral>(
    entity: ObjectType<T>,
    relation: string,
    id: string,
) => {
    return AppDataSource.createQueryBuilder()
        .relation(entity, relation)
        .of(id)
        .loadMany();
};

const readInstance = <T extends ObjectLiteral>(
    entity: ObjectType<T>,
    id: string,
) => {
    return AppDataSource.getRepository(entity).findOne({
        where: { id: id as T[keyof T] },
        relations: getEntityRelations(entity),
    });
};

const readInstanceAll = <T extends ObjectLiteral>(entity: ObjectType<T>) => {
    const relations = getEntityRelations(entity);

    return AppDataSource.getRepository(entity).find({
        relations,
    });
};

export { readInstance, readInstanceAll, readRelationData };
