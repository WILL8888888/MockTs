import { it, expect, describe } from 'vitest';
import IDCardGenerator from '../../src/factory/specific-generators/idCardGen';
import PhoneNumberGenerator from '../../src/factory/specific-generators/phoneNumberGen';

describe('IDCardGenerator', () => {
    it('valid IdCard, Object is false', () => {
        const idCardGenerator = new IDCardGenerator('44030319991231060X');
        const idCardNumber = idCardGenerator.generate(false, '');
        expect(idCardNumber).toMatch(/^\d{17}[\dX]$/);
    });

    it('valid IdCard, Object is true', () => {
        const idCardGenerator = new IDCardGenerator('44030319991231060X');
        const idCardObject = idCardGenerator.generate(true, 'idCardNumber');
        expect(idCardObject).toEqual({ idCardNumber: '44030319991231060X' });
    });
});

describe('PhoneNumberGenerator', () => {
    it('valid phoneNumber, Object is false', () => {
        const phoneNumber = '1234567890';
        const generator = new PhoneNumberGenerator(phoneNumber);
        const result = generator.generate(false, '');
        expect(result).toBe(phoneNumber);
    });

    it('valid phoneNumber, Object is true', () => {
        const phoneNumber = '1234567890';
        const generator = new PhoneNumberGenerator(phoneNumber);
        const result = generator.generate(true, 'phone');
        expect(result).toEqual({ phone: phoneNumber });
    });
})
