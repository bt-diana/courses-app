import { ObjectType, ObjectLiteral } from 'typeorm';
import AppDataSource from '../dataSource/dataSource.js';
import { readInstance, readRelationData } from './read.js';

const updateRelationData = async <T extends ObjectLiteral>(
    entity: ObjectType<T>,
    relation: string,
    instance: T,
    relationData: unknown,
) => {
    await AppDataSource.createQueryBuilder()
        .relation(entity, relation)
        .of(instance)
        .remove(await readRelationData(entity, relation, instance));

    return AppDataSource.createQueryBuilder()
        .relation(entity, relation)
        .of(instance)
        .add(relationData);
};

const updateInstance = async <T extends ObjectLiteral>(
    entity: ObjectType<T>,
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

export { updateInstance, updateRelationData };
