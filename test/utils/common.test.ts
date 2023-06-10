import { it, expect, describe } from 'vitest';

import { isObject } from '../../src/utils/common';

describe('isObject', () => {
    it('return true for an object', () => {
        const obj = { a: 1, b: 2 };
        expect(isObject(obj)).toBe(true);
    });

    it('return false for a string', () => {
        const str = 'hello';
        expect(isObject(str)).toBe(false);
    });

    it('return false for a number', () => {
        const num = 123;
        expect(isObject(num)).toBe(false);
    });

    it('return false for an array', () => {
        const arr = [1, 2, 3];
        expect(isObject(arr)).toBe(false);
    });

    it('return false for null', () => {
        const value = null;
        expect(isObject(value)).toBe(false);
    });

    it('return false for undefined', () => {
        const value = undefined;
        expect(isObject(value)).toBe(false);
    });
});