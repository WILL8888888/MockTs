import { it, expect, describe } from 'vitest';
import ObjectRules from 'src/rulesMarket/data-rules/objectRules';

describe('objectRandom', () => {
    it('invalid object for init is not object', () => {
        const objectRules = new ObjectRules(2, 2, [] as SafeAny);
        expect(() => { objectRules.objectRandom() }).toThrow('Invalid type! from: @object');
    });

    it('create object if no pool', () => {
        const objectRules = new ObjectRules(3, 7, undefined as SafeAny);
        const result = objectRules.objectRandom();
        expect(Object.keys(result).length).toBeGreaterThanOrEqual(3);
        expect(Object.keys(result).length).toBeLessThanOrEqual(7);
        expect(typeof result[Object.keys(result)[0]]).toBe('string');
    });

    it('max is less than the pool size', () => {
        const pool = { key1: 'value1', key2: 'value2', key3: 'value3' };
        const objectRules = new ObjectRules(2, 2, pool);
        const result = objectRules.objectRandom();
        expect(Object.keys(result).length).toBe(2);
    });

    it('max is greater than the pool size', () => {
        const pool = { key1: 'value1', key2: 'value2', key3: 'value3' };
        const objectRules = new ObjectRules(2, 5, pool);
        const result = objectRules.objectRandom();
        expect(Object.keys(result).length).toBeGreaterThanOrEqual(2);
        expect(Object.keys(result).length).toBeLessThanOrEqual(5);
    });
});