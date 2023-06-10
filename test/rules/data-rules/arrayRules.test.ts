import { it, expect, describe } from 'vitest';
import ArrayRules from 'src/rulesMarket/data-rules/arrayRules';

describe('ArrayRules', () => {
    describe('arrayRandom', () => {
        it('should return the input array when init is an array and min and max are not provided', () => {
            const arr = [1, 2, 3];
            const arrayRules = new ArrayRules(arr, undefined as SafeAny, undefined as SafeAny);
            const result = arrayRules.arrayRandom();
            expect(result).toEqual(arr);
        });

        it('should return an array with length between min and max when init is an array and min and max are provided', () => {
            const arr = [1, 2, 3];
            const arrayRules = new ArrayRules(arr, 2, 4);
            const result: number[] = arrayRules.arrayRandom();
            expect(result.length).toBeGreaterThanOrEqual(2);
            expect(result.length).toBeLessThanOrEqual(4);
            expect(result.every((item) => arr.includes(item))).toBe(true);
        });

        it('should return an array with length between min and max when init is a string and min and max are provided', () => {
            const arrayRules = new ArrayRules('number', 2, 4);
            const result: number[] = arrayRules.arrayRandom();
            expect(result.length).toBeGreaterThanOrEqual(2);
            expect(result.length).toBeLessThanOrEqual(4);
            expect(result.every((item) => typeof item === 'number')).toBe(true);
        });

        it('should return an array with length between min and max when init is a string and min and max are provided', () => {
            const arrayRules = new ArrayRules('string', 2, 4);
            const result: string[] = arrayRules.arrayRandom();
            expect(result.length).toBeGreaterThanOrEqual(2);
            expect(result.length).toBeLessThanOrEqual(4);
            expect(result.every((item) => typeof item === 'string')).toBe(true);
        });

        it('should return an array with length between min and max when init is a string and min and max are provided', () => {
            const arrayRules = new ArrayRules('boolean', 2, 4);
            const result: boolean[] = arrayRules.arrayRandom();
            expect(result.length).toBeGreaterThanOrEqual(2);
            expect(result.length).toBeLessThanOrEqual(4);
            expect(result.every((item) => typeof item === 'boolean')).toBe(true);
        });

        it('should return an array with length between min and max when init is a string and min and max are provided', () => {
            const arrayRules = new ArrayRules('object', 2, 4);
            const result: object[] = arrayRules.arrayRandom();
            expect(result.length).toBeGreaterThanOrEqual(2);
            expect(result.length).toBeLessThanOrEqual(4);
            expect(result.every((item) => typeof item === 'object')).toBe(true);
        });

        it('should return an array with length between min and max when init is a string and min and max are provided', () => {
            const arrayRules = new ArrayRules('date', 2, 4);
            const result: Date[] = arrayRules.arrayRandom();
            expect(result.length).toBeGreaterThanOrEqual(2);
            expect(result.length).toBeLessThanOrEqual(4);
            expect(result.every((item) => typeof item === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(item))).toBe(true);
        });

        it('should return an array with length between min and max when init is a string and min and max are provided', () => {
            const arrayRules = new ArrayRules('time', 2, 4);
            const result: Date[] = arrayRules.arrayRandom();
            expect(result.length).toBeGreaterThanOrEqual(2);
            expect(result.length).toBeLessThanOrEqual(4);
            expect(result.every((item) => typeof item === 'string' && /^\d{2}:\d{2}:\d{2}$/.test(item))).toBe(true);
        });
        it('should return an array with length between min and max when init is a string and min and max are provided', () => {
            const arrayRules = new ArrayRules('datetime', 2, 4);
            const result: Date[] = arrayRules.arrayRandom();
            expect(result.length).toBeGreaterThanOrEqual(2);
            expect(result.length).toBeLessThanOrEqual(4);
            expect(result.every((item) => typeof item === 'string' && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(item))).toBe(true);
        });
    });

    describe('poolStrategy', () => {
        it('should return an array with length between min and max when init is an array and min and max are provided', () => {
            const arr = [1, 2, 3];
            const arrayRules = new ArrayRules(arr, 2, 4);
            const result: SafeAny[] = arrayRules['poolStrategy']();
            expect(result.length).toBeGreaterThanOrEqual(2);
            expect(result.length).toBeLessThanOrEqual(4);
            expect(result.every((item) => arr.includes(item))).toBe(true);
        });

        it('should return the input array when init is an array and min and max are not provided', () => {
            const arr = [1, 2, 3];
            const arrayRules = new ArrayRules(arr, undefined as SafeAny, undefined as SafeAny);
            const result = arrayRules['poolStrategy']();
            expect(result).toEqual(arr);
        });

        it('should return an empty array when init is an empty array and min and max are not provided', () => {
            const arr: SafeAny[] = [];
            const arrayRules = new ArrayRules(arr, undefined as SafeAny, undefined as SafeAny);
            const result = arrayRules['poolStrategy']();
            expect(result).toEqual([]);
        });
    });

    describe('typeStrategy', () => {
        it('should return an array with length between min and max when init is a string and min and max are provided', () => {
            const arrayRules = new ArrayRules('number', 2, 4);
            const result = arrayRules['typeStrategy']();
            expect(result.length).toBeGreaterThanOrEqual(2);
            expect(result.length).toBeLessThanOrEqual(4);
            expect(result.every((item) => typeof item === 'number')).toBe(true);
        });

        it('should return an array with length between min and max when init is a string and min and max are provided', () => {
            const arrayRules = new ArrayRules('string', 2, 4);
            const result = arrayRules['typeStrategy']();
            expect(result.length).toBeGreaterThanOrEqual(2);
            expect(result.length).toBeLessThanOrEqual(4);
            expect(result.every((item) => typeof item === 'string')).toBe(true);
        });
        it('should return an array with length between min and max when init is a string and min and max are provided', () => {
            const arrayRules = new ArrayRules('boolean', 2, 4);
            const result = arrayRules['typeStrategy']();
            expect(result.length).toBeGreaterThanOrEqual(2);
            expect(result.length).toBeLessThanOrEqual(4);
            expect(result.every((item) => typeof item === 'boolean')).toBe(true);
        });

        it('should return an array with length between min and max when init is a string and min and max are provided', () => {
            const arrayRules = new ArrayRules('object', 2, 4);
            const result = arrayRules['typeStrategy']();
            expect(result.length).toBeGreaterThanOrEqual(2);
            expect(result.length).toBeLessThanOrEqual(4);
            expect(result.every((item) => typeof item === 'object')).toBe(true);
        });

        it('should return an array with length between min and max when init is a string and min and max are provided', () => {
            const arrayRules = new ArrayRules('date', 2, 4);
            const result = arrayRules['typeStrategy']();
            expect(result.length).toBeGreaterThanOrEqual(2);
            expect(result.length).toBeLessThanOrEqual(4);
            expect(result.every((item) => typeof item === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(item))).toBe(true);
        });

        it('should return an array with length between min and max when init is a string and min and max are provided', () => {
            const arrayRules = new ArrayRules('time', 2, 4);
            const result = arrayRules['typeStrategy']();
            expect(result.length).toBeGreaterThanOrEqual(2);
            expect(result.length).toBeLessThanOrEqual(4);
            expect(result.every((item) => typeof item === 'string' && /^\d{2}:\d{2}:\d{2}$/.test(item))).toBe(true);
        });

        it('should return an array with length between min and max when init is a string and min and max are provided', () => {
            const arrayRules = new ArrayRules('datetime', 2, 4);
            const result = arrayRules['typeStrategy']();
            expect(result.length).toBeGreaterThanOrEqual(2);
            expect(result.length).toBeLessThanOrEqual(4);
            expect(result.every((item) => typeof item === 'string' && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(item))).toBe(true);
        });
    });
});