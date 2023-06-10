import { it, expect, describe } from 'vitest';
import DataToRules from '../../src/utils/templateSplit';

describe('DataToRules', () => {
    it('string with a name and no rules', () => {
        const obj = {
            'name': 'value'
        };
        const dataToRules = new DataToRules(obj);
        expect(dataToRules.name).toBe('name');
        expect(dataToRules.rules).toBe('');
        expect(dataToRules.type).toBe('string');
        expect(dataToRules.initData).toBe('value');
    });

    it('array with a name and rules', () => {
        const obj = {
            'name|1-10': [1, 2, 3]
        };
        const dataToRules = new DataToRules(obj);
        expect(dataToRules.name).toBe('name');
        expect(dataToRules.rules).toBe('1-10');
        expect(dataToRules.type).toBe('array');
        expect(dataToRules.initData).toEqual([1, 2, 3]);
    });

    it('object with a name and rules', () => {
        const obj = {
            'name|1-10': { a: 1, b: 2 }
        };
        const dataToRules = new DataToRules(obj);
        expect(dataToRules.name).toBe('name');
        expect(dataToRules.rules).toBe('1-10');
        expect(dataToRules.type).toBe('object');
        expect(dataToRules.initData).toEqual({ a: 1, b: 2 });
    });

    it('string with a name and a function rule', () => {
        const obj = {
            'name|1-10': '@string'
        };
        const dataToRules = new DataToRules(obj);
        expect(dataToRules.name).toBe('name');
        expect(dataToRules.rules).toBe('1-10');
        expect(dataToRules.type).toBe('string');
        expect(dataToRules.initData).toBe('@string');
    });

    it('object with a name and a function rule', () => {
        const obj = {
            'name|1-10': { a: '@string', b: '@number(1, 10)' }
        };
        const dataToRules = new DataToRules(obj);
        expect(dataToRules.name).toBe('name');
        expect(dataToRules.rules).toBe('1-10');
        expect(dataToRules.type).toBe('object');
        expect(dataToRules.initData).toEqual({ a: '@string', b: '@number(1, 10)' });
    });
});
