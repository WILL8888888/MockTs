import { it, expect, describe } from 'vitest';
import BooleanRules from 'src/rulesMarket/data-rules/booleanRules';

describe('booleanRandom', () => {
    it('return true with 100% odds', () => {
        const booleanRules = new BooleanRules(1);
        const result = booleanRules.booleanRandom();
        expect(result).toBe(true);
    });

    it('return false with 0% odds', () => {
        const booleanRules = new BooleanRules(0);
        const result = booleanRules.booleanRandom();
        expect(result).toBe(false);
    });
});