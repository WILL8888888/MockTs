import { it, expect, describe } from 'vitest';

import { extractMockType, hasObjDeal } from '../../src/utils/transformer';


describe('extractMockType', () => {
    it('should extract object type correctly', () => {
        const mockType = '@object(2, 3, {"name": "@string", "age": "@number(10, 20)"})';
        const result = extractMockType(mockType);
        expect(result).toEqual({
            type: 'object',
            params: [2, 3, { name: '@string', age: '@number(10, 20)' }]
        });
    });

    it('should extract array type correctly', () => {
        const mockType = '@array(["@string", "@number(1, 10)"], 5)';
        const result = extractMockType(mockType);
        expect(result).toEqual({
            type: 'array',
            params: [['@string', '@number(1, 10)'], 5]
        });
    });

    it('should extract normal type correctly', () => {
        const mockType = '@string(10)';
        const result = extractMockType(mockType);
        expect(result).toEqual({
            type: 'string',
            params: [10]
        });
    });
});

describe('hasObjDeal', () => {
    it('should return correct result when input is valid array and string', () => {
        const result = hasObjDeal(['{ "name": "John", "age": 30 }'], '{ "name": "John", "age": 30 }');
        expect(result).toEqual([{ "name": "John", "age": 30 }]);
    });

    it('should return correct result when input is valid array and string with nested object', () => {
        const result = hasObjDeal(['{ "name": "John", "address": { "city": "New York", "state": "NY" } }'], '{ "name": "John", "address": { "city": "New York", "state": "NY" } }');
        expect(result).toEqual([{ "name": "John", "address": { "city": "New York", "state": "NY" } }]);
    });
});

