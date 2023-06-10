import { it, expect, describe } from 'vitest';
import StringRules from 'src/rulesMarket/data-rules/stringRules';

describe('stringRandom', () => {
    it('pool is lower and length between min and max', () => {
        const stringRules = new StringRules('lower', 3, 7);
        const result = stringRules.stringRandom();
        expect(result.length).toBeGreaterThanOrEqual(3);
        expect(result.length).toBeLessThanOrEqual(7);
        expect(result).toMatch(/[a-z]{3,7}/);
    });


    it('pool is upper and length between min and max', () => {
        const stringRules = new StringRules('upper', 5, 5);
        const result = stringRules.stringRandom();
        expect(result.length).toEqual(5);
        expect(result).toMatch(/[A-Z]{5}/);
    });

    it('pool is number and length between min and max', () => {
        const stringRules = new StringRules('number', 1, 3);
        const result = stringRules.stringRandom();
        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result.length).toBeLessThanOrEqual(3);
        expect(result).toMatch(/[0-9]{1,3}/);
    });

    it('pool is symbol and length between min and max', () => {
        const stringRules = new StringRules('symbol', 1, 3);
        const result = stringRules.stringRandom();
        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result.length).toBeLessThanOrEqual(3);
        expect(result).toMatch(/[!@#$%^&*()\[\]]{1,3}/);
    });

    it('free pool and length between min and max', () => {
        const stringRules = new StringRules('aeiou', 1, 3);
        const result = stringRules.stringRandom();
        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result.length).toBeLessThanOrEqual(3);
        expect(result).toMatch(/[aeiou]{1,3}/);
    });

    it('sure string', () => {
        const stringRules = new StringRules('myself', 0, 0);
        const result = stringRules.stringRandom();
        expect(result).toEqual('myself');
    });

    it('fixed length string', () => {
        const stringRules = new StringRules(5, undefined as SafeAny, undefined as SafeAny);
        const result = stringRules.stringRandom();
        expect(result.length).toEqual(5);
        expect(result).toMatch(/[a-zA-Z0-9!@#$%^&*()\[\]]{5}/);
    });

    it('no arguments are provided', () => {
        const stringRules = new StringRules(undefined as SafeAny, undefined as SafeAny, undefined as SafeAny);
        const result = stringRules.stringRandom();
        expect(result).toMatch(/[a-zA-Z0-9!@#$%^&*()\[\]]{3,7}/);
    });

    it('pool is number', () => {
        const stringRules = new StringRules(7, 10, undefined as SafeAny);
        const result = stringRules.stringRandom();
        expect(stringRules.minToLength).toBe(7);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThanOrEqual(7);
        expect(result.length).toBeLessThanOrEqual(10);
    });
});