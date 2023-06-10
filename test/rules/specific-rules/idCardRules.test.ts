import { it, expect, describe } from 'vitest';
import IdCardRules from '../../../src/rulesMarket/specific-rules/idCardRules';

describe('IdCardRules', () => {
    describe('IdCardRandom', () => {
        it('should return the default value if initData is provided', () => {
            const idCardRules = new IdCardRules('CN', 123456789012345678);
            const result = idCardRules.IdCardRandom();
            expect(result).toEqual(123456789012345678);
        });

        it('should generate a Chinese ID card number if country is CN', () => {
            const idCardRules = new IdCardRules('CN');
            const result = idCardRules.IdCardRandom();
            expect(result.length).toEqual(18);
            expect(result.slice(0, 6)).toMatch(/^\d{6}$/);
            expect(result.slice(6, 14)).toMatch(/^\d{8}$/);
            expect(result.slice(14, 17)).toMatch(/^\d{3}$/);
            expect(result.slice(17)).toMatch(/^[0-9X]$/);
        });

        it('should generate a US ID card number if country is US', () => {
            const idCardRules = new IdCardRules('US');
            const result = idCardRules.IdCardRandom();
            expect(result.length).toEqual(7);
            expect(result.slice(0, 3)).toMatch(/^\d{3}$/);
            expect(result.slice(3, 6)).toMatch(/^\d{3}$/);
            expect(result.slice(6)).toMatch(/^\d{1}$/);
        });

        it('should throw an error if country is not supported', () => {
            const idCardRules = new IdCardRules('JP');
            expect(() => {
                idCardRules.IdCardRandom();
            }).toThrow('Unsupported country');
        });
    });

    describe('generateChineseID', () => {
        it('should generate a valid Chinese ID card number', () => {
            const idCardRules = new IdCardRules('CN');
            const result = idCardRules.generateChineseID();
            expect(result.length).toEqual(18);
            expect(result.slice(0, 6)).toMatch(/^\d{6}$/);
            expect(result.slice(6, 14)).toMatch(/^\d{8}$/);
            expect(result.slice(14, 17)).toMatch(/^\d{3}$/);
            expect(result.slice(17)).toMatch(/^[0-9X]$/);
        });
    });

    describe('generateAddressCode', () => {
        it('should generate a valid Chinese address code', () => {
            const idCardRules = new IdCardRules('CN');
            const result = idCardRules.generateAddressCode();
            expect(result).toMatch(/^\d{6}$/);
        });
    });

    describe('generateBirthdayCode', () => {
        it('should generate a valid Chinese birthday code', () => {
            const idCardRules = new IdCardRules('CN');
            const result = idCardRules.generateBirthdayCode();
            expect(result).toMatch(/^\d{8}$/);
        });
    });

    describe('generateSequenceCode', () => {
        it('should generate a valid Chinese sequence code', () => {
            const idCardRules = new IdCardRules('CN');
            const result = idCardRules.generateSequenceCode();
            expect(result).toMatch(/^\d{3}$/);
        });
    });

    describe('generateUSID', () => {
        it('should generate a valid US ID card number', () => {
            const idCardRules = new IdCardRules('US');
            const result = idCardRules.generateUSID();
            expect(result.length).toEqual(7);
            expect(result.slice(0, 3)).toMatch(/^\d{3}$/);
            expect(result.slice(3, 6)).toMatch(/^\d{3}$/);
            expect(result.slice(6)).toMatch(/^\d{1}$/);
        });
    });

    describe('generateAreaCode', () => {
        it('should generate a valid US area code', () => {
            const idCardRules = new IdCardRules('US');
            const result = idCardRules.generateAreaCode();
            expect(result).toMatch(/^\d{3}$/);
        });
    });

    describe('generateOrgCode', () => {
        it('should generate a valid US organization code', () => {
            const idCardRules = new IdCardRules('US');
            const result = idCardRules.generateOrgCode();
            expect(result).toMatch(/^\d{3}$/);
        });
    });

    describe('calculateUSCheckCode', () => {
        it('should calculate a valid US check code', () => {
            const idCardRules = new IdCardRules('US');
            const result = idCardRules.calculateUSCheckCode('123456789');
            expect(result).toEqual('5');
        });
    });
});