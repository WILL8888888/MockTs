import { it, expect, describe } from 'vitest';

import { extractMockType, hasObjDeal } from '../../src/utils/transformer';


describe('extractMockType', () => {
    it('should return object type and params when input is @object(2, 3, {"name": "@string", "age": "@integer(10, 20)"})', () => {
        const mockType = '@object(2, 3, {"name": "@string", "age": "@integer(10, 20)"})';
        const result = extractMockType(mockType);
        expect(result).toEqual({
            type: 'object',
            params: [
                '2',
                '3',
                {
                    name: '@string',
                    age: '@integer(10, 20)'
                }
            ]
        });
    });

    it('should return array type and params when input is @array(["@string", "@integer(1, 10)"], 5)', () => {
        const mockType = '@array(["@string", "@integer(1, 10)"], 5)';
        const result = extractMockType(mockType);
        expect(result).toEqual({
            type: 'array',
            params: [
                ['@string', '@integer(1, 10)'],
                5
            ]
        });
    });

    it('should return regex type and params when input is @integer(10, 20)', () => {
        const mockType = '@integer(10, 20)';
        const result = extractMockType(mockType);
        expect(result).toEqual({
            type: 'integer',
            params: [10, 20]
        });
    });

    it('should return null when input is invalid', () => {
        const mockType = 'invalid';
        const result = extractMockType(mockType);
        expect(result).toBeNull();
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

