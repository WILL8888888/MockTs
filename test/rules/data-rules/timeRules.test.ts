import { it, expect, describe } from 'vitest';
import DateRules from 'src/rulesMarket/data-rules/dateRules';
import TimeRules from 'src/rulesMarket/data-rules/timeRules';
import dateTimeRules from 'src/rulesMarket/data-rules/dateTimeRules';

describe('DateRules', () => {
    it('should return a string in the specified format', () => {
        const result = DateRules.dateRandom('yyyy-MM-dd');
        expect(typeof result).toBe('string');
        expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
});

describe('TimeRules', () => {
    it('should return a string in the specified format', () => {
        const result = TimeRules.timeRandom('HH:mm:ss');
        expect(typeof result).toBe('string');
        expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    });
});

describe('dateTimeRules', () => {
    it('should return a string in the specified format', () => {
        const result = dateTimeRules.dateTimeRandom('yyyy-MM-dd HH:mm:ss');
        expect(typeof result).toBe('string');
        expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    });
});
