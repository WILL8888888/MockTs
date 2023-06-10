import { it, expect, describe } from 'vitest';
import PhoneNumberGenerator from '../../../src/rulesMarket/specific-rules/phoneNumRules';

describe('PhoneNumberGenerator', () => {
    describe('phoneNumRandom', () => {
        it('should generate a valid Chinese phone number', () => {
            const phoneNumberGenerator = new PhoneNumberGenerator('CN');
            const phoneNumber = phoneNumberGenerator.phoneNumRandom();
            expect(phoneNumber).toMatch(/^1[3-9]\d{9}$/);
        });

        it('should generate a valid US phone number', () => {
            const phoneNumberGenerator = new PhoneNumberGenerator('US');
            const phoneNumber = phoneNumberGenerator.phoneNumRandom();
            expect(phoneNumber).toMatch(/^\d{10}$/);
        });

        it('should generate a valid phone number with initData', () => {
            const phoneNumberGenerator = new PhoneNumberGenerator('CN', 13812345678);
            const phoneNumber = phoneNumberGenerator.phoneNumRandom();
            expect(phoneNumber).toBe(13812345678);
        });

        it('should throw an error for unsupported country', () => {
            const phoneNumberGenerator = new PhoneNumberGenerator('JP');
            expect(() => phoneNumberGenerator.phoneNumRandom()).toThrow('Unsupported country');
        });
    });
});
