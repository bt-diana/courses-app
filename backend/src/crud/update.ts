import type { ObjectType, ObjectLiteral } from 'typeorm';
import AppDataSource from '../dataSource/dataSource.js';
import { readInstance, readRelationData } from './read.js';
import {
    getEntityFileds,
    getEntityRelations,
} from '../utils/getEntityFileds.js';
import { filterObjectProperties } from '../utils/filterObject.js';

const updateRelationData = async <T extends ObjectLiteral>(
    entity: ObjectType<T>,
    relation: string,
    id: string,
    relationData: unknown,
) => {
    await AppDataSource.createQueryBuilder()
        .relation(entity, relation)
        .of(id)
        .remove(await readRelationData(entity, relation, id));

    return AppDataSource.createQueryBuilder()
        .relation(entity, relation)
        .of(id)
        .add(relationData);
};

const updateInstance = async <T extends ObjectLiteral>(
    entity: ObjectType<T>,
    id: string,
    data: Omit<ObjectType<T>, 'id'>,
) => {
    const basicFields = filterObjectProperties(data, getEntityFileds(entity));
    const relationFields = filterObjectProperties(
        data,
        getEntityRelations(entity),
    );

    if (
        (
            await AppDataSource.manager
                .createQueryBuilder()
                .update(entity)
                .set(basicFields)
                .where('id = :id', { id: id })
                .execute()
        ).affected
    ) {
        if (relationFields) {
            Promise.all(
                (Object.keys(relationFields) as Array<keyof typeof data>).map(
                    (relation) =>
                        updateRelationData(
                            entity,
                            relation,
                            id,
                            data[relation],
                        ),
                ),
            );
        }

        return readInstance(entity, id);
    }
};

export { updateInstance, updateRelationData };
