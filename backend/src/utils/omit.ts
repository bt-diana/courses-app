const omit = <T extends object>(obj: T, key: keyof T) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: ommited, ...rest } = obj;
    return rest;
};

export { omit };
