import { it, expect, describe } from 'vitest';
import NumberRules from 'src/rulesMarket/data-rules/numberRules';

describe('numberRandom', () => {
    it('random integer between min and max', () => {
        const numberRules = new NumberRules(-10, 10, 0);
        const result = numberRules.intergerRandom();
        expect(result).toBeGreaterThanOrEqual(-10);
        expect(result).toBeLessThanOrEqual(10);
        expect(Number.isInteger(result)).toBe(true);
    });

    it('min and max are equal', () => {
        const numberRules = new NumberRules(5, 5, 0);
        const result = numberRules.intergerRandom();
        expect(result).toEqual(5);
    });
});