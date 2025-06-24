const filterObjectProperties = (raw: object, allowedProperties: string[]) =>
    (Object.keys(raw) as Array<keyof typeof raw>)
        .filter((propName) => allowedProperties.includes(propName))
        .reduce((filtered: Partial<typeof raw>, propName: keyof typeof raw) => {
            filtered[propName] = raw[propName];
            return filtered;
        }, {});

export { filterObjectProperties };
