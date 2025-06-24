import { ObjectType, ObjectLiteral } from 'typeorm';
import AppDataSource from '../dataSource/dataSource.js';

const getEntityFileds = <T extends ObjectLiteral>(
    entity: ObjectType<T>,
    onlyRequired: boolean = false,
): string[] => {
    const metadata = AppDataSource.getMetadata(entity);
    const fields = metadata.columns
        .filter(
            ({ isNullable, isPrimary }) =>
                (!onlyRequired || !isNullable) && !isPrimary,
        )
        .map((column) => column.propertyName);

    return fields;
};

const getEntityRelations = <T extends ObjectLiteral>(
    entity: ObjectType<T>,
    onlyRequired: boolean = false,
) => {
    const metadata = AppDataSource.getMetadata(entity);
    const relations = metadata.relations
        .filter(
            ({ isNullable, isPrimary }) =>
                (!onlyRequired || !isNullable) && !isPrimary,
        )
        .map(({ propertyName }) => propertyName);

    return relations;
};

export { getEntityFileds, getEntityRelations };
