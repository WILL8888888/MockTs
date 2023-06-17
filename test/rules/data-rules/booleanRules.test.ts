import { it, expect, describe } from 'vitest';
import BooleanRules from 'src/rulesMarket/data-rules/booleanRules';

describe('booleanRandom', () => {
    it('should throw an error if odds > 1', () => {
        const booleanRules = new BooleanRules(2);
        expect(() => { booleanRules.booleanRandom() }).toThrow('Invalid type! from: @boolean');
    });

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

    it('should return a boolean value', () => {
        const booleanRules = new BooleanRules();
        const result = booleanRules.booleanRandom();
        expect(typeof result).to.equal('boolean');
    });

    it('booleanRandom should throw an error with invalid odds', () => {
        const booleanRules = new BooleanRules(-1);
        expect(() => booleanRules.booleanRandom()).toThrow();
    });
});