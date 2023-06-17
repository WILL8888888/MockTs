export enum ErrorMessages {
    NOT_NUMBER = 'min and max must be numbers',
    LESS_THAN_ZERO = 'min and max must be greater than or equal to 0',
    MIN_GREATER_THAN_MAX = 'min must be less than or equal to max',
}
  
type Validator = {
    condition: (min: number, max: number) => boolean;
    message: ErrorMessages;
};
  
const validators: Validator[] = [
    {
        condition: (min, max) => typeof min !== 'number' || typeof max !== 'number',
        message: ErrorMessages.NOT_NUMBER,
    },
    {
        condition: (min, max) => min < 0 || max < 0,
        message: ErrorMessages.LESS_THAN_ZERO,
    },
    {
        condition: (min, max) => min > max,
        message: ErrorMessages.MIN_GREATER_THAN_MAX,
    },
];
  
export function validateMinMax(min: number, max: number): string | undefined {
    if(typeof min === 'undefined' || typeof max === 'undefined') return;
    const validator = validators.find((v) => v.condition(min, max));
    return validator?.message;
}