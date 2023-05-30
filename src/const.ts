export type valueType = boolean | number | string | string[] | object;
export type generatorType = 'number' | 'string' | 'boolean' | 'date' | 'time' | 'datetime' | 'object' | 'array' | 'free' | 'idCard' | 'phoneNumber'
export const typeMap: readonly generatorType[] = ['number', 'string', 'boolean', 'date', 'time', 'datetime', 'object', 'array', 'free', 'idCard', 'phoneNumber']