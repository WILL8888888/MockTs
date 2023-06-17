import { it, expect, describe } from 'vitest';
import { validateMinMax, ErrorMessages } from '../../src/utils/validMinMax';

describe('validateMinMax', () => {
  it('should return undefined when both min and max are numbers greater than or equal to 0 and min is less than or equal to max', () => {
    expect(validateMinMax(0, 10)).toBeUndefined();
  });

  it('should return NOT_NUMBER error message when either min or max is not a number', () => {
    expect(validateMinMax('0' as SafeAny, 10)).toBe(ErrorMessages.NOT_NUMBER);
    expect(validateMinMax(0, '10' as SafeAny)).toBe(ErrorMessages.NOT_NUMBER);
    expect(validateMinMax('0' as SafeAny, '10' as SafeAny)).toBe(ErrorMessages.NOT_NUMBER);
  });

  it('should return LESS_THAN_ZERO error message when either min or max is less than 0', () => {
    expect(validateMinMax(-1, 10)).toBe(ErrorMessages.LESS_THAN_ZERO);
    expect(validateMinMax(0, -1)).toBe(ErrorMessages.LESS_THAN_ZERO);
    expect(validateMinMax(-1, -1)).toBe(ErrorMessages.LESS_THAN_ZERO);
  });

  it('should return MIN_GREATER_THAN_MAX error message when min is greater than max', () => {
    expect(validateMinMax(10, 0)).toBe(ErrorMessages.MIN_GREATER_THAN_MAX);
  });

  it('should return undefined when either min or max is undefined', () => {
    expect(validateMinMax(undefined as SafeAny, 10)).toBeUndefined();
    expect(validateMinMax(0, undefined as SafeAny)).toBeUndefined();
    expect(validateMinMax(undefined as SafeAny, undefined as SafeAny)).toBeUndefined();
  });
});