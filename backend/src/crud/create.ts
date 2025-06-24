import type { ObjectType, ObjectLiteral } from 'typeorm';
import AppDataSource from '../dataSource/dataSource.js';
import { readInstance } from './read.js';
import {
    getEntityFileds,
    getEntityRelations,
} from '../utils/getEntityFileds.js';
import { filterObjectProperties } from '../utils/filterObject.js';

const createRelationData = <T extends ObjectLiteral>(
    entity: ObjectType<T>,
    relation: string,
    id: string,
    relationData: unknown,
) => {
    return AppDataSource.createQueryBuilder()
        .relation(entity, relation)
        .of(id)
        .add(relationData);
};

const createInstance = async <T extends ObjectLiteral>(
    entity: ObjectType<T>,
    data: Omit<ObjectType<T>, 'id'>,
) => {
    const basicFields = filterObjectProperties(data, getEntityFileds(entity));
    const relationFields = filterObjectProperties(
        data,
        getEntityRelations(entity),
    );

    const newAuthorId = (
        await AppDataSource.manager
            .createQueryBuilder()
            .insert()
            .into(entity)
            .values(basicFields)
            .execute()
    ).generatedMaps[0]?.id;

    if (newAuthorId) {
        if (relationFields) {
            Promise.all(
                (Object.keys(relationFields) as Array<keyof typeof data>).map(
                    (relation) =>
                        createRelationData(
                            entity,
                            relation,
                            newAuthorId,
                            data[relation],
                        ),
                ),
            );
        }

        return readInstance(entity, newAuthorId);
    }
};

export { createInstance, createRelationData };
