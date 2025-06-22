const omit = <T extends object>(obj: T, key: keyof T) => {
    const { [key]: ommited, ...rest } = obj;
    return rest;
};

export { omit };
