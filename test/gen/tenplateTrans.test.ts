import { it, expect, describe } from 'vitest';
import TemplateArrayTrans from '../../src/factory/template-transformers/templateArrayTrans';
import TemplateBooleanTrans from '../../src/factory/template-transformers/templateBooleanTrans';
import TemplateNumberTrans from '../../src/factory/template-transformers/templateNumberTrans';
import TemplateStringTrans from '../../src/factory/template-transformers/templateStringTrans';
import TemplateObjectTrans from '../../src/factory/template-transformers/templateObjectTrans';
import TemplateIdCardTrans from '../../src/factory/template-transformers/templateIdCardTrans';
import TemplatePhoneNumberTrans from '../../src/factory/template-transformers/templatePhoneNumberTrans';

describe('ArrayTransfomer', () => {
    it('generate Array transformer', () => {
        const trans1 = new TemplateArrayTrans('1-5', 'tran1');
        expect(trans1.transformer()).toBe('@array("tran1", 1, 5)');

        const trans2 = new TemplateArrayTrans('+3', 'trans2');
        expect(trans2.transformer()).toBe('@array("trans2", 3)');

        const trans3 = new TemplateArrayTrans('', 'trans3');
        expect(trans3.transformer()).toBe('@array(string, 3)');
    })
});

describe('BooleanTransfomer', () => {
    it('generate Boolean transformer', () => {
        const trans = new TemplateBooleanTrans('', true);
        expect(trans.transformer()).toBe('@boolean');
    })
});

describe('BooleanTransfomer', () => {
    it('generate Boolean transformer', () => {
        const trans = new TemplateBooleanTrans('', true);
        expect(trans.transformer()).toBe('@boolean');
    })
});

describe('NumberTransformer', () => {
    it('generate Number transformer', () => {
        const trans1 = new TemplateNumberTrans('1-5', 3);
        expect(trans1.transformer()).toBe('@number(1, 5, 3)');

        const trans2 = new TemplateNumberTrans('+2', 5);
        expect(trans2.transformer()).toBe('@number(7, 7)');

        const trans3 = new TemplateNumberTrans('', 10);
        expect(trans3.transformer()).toBe('@number(10, 10, 10)');
    })
})

describe('StringTransformer', () => {
    it('generate String transformer', () => {
        const trans1 = new TemplateStringTrans('1-5', 'abc');
        expect(trans1.transformer()).toBe('@string(abc, 1, 5)');

        const trans2 = new TemplateStringTrans('', 'def');
        expect(trans2.transformer()).toBe('@string(def, 0, 0)');
    })
})

describe('ObjectTransformer', () => {
    it('generate Object transformer', () => {
        const trans1 = new TemplateObjectTrans('2-4', { foo: 'bar', baz: 123 });
        expect(trans1.transformer()).toBe('@object(2, 4, {"foo":"bar","baz":123})');

        const trans2 = new TemplateObjectTrans('3', { foo: 'bar', baz: 123 });
        expect(trans2.transformer()).toBe('@object(3, 3, {"foo":"bar","baz":123})');
    })
})

describe('IdCardTransformer', () => {
    it('generate IdCard transformer', () => {
        const trans1 = new TemplateIdCardTrans('', '');
        expect(trans1.transformer()).toBe('@idCard(,)');

        const trans2 = new TemplateIdCardTrans('', 'US');
        expect(trans2.transformer()).toBe('@idCard(,US)');
    })
})

describe('phoneNumberTransformer', () => {
    it('generate phoneNumber transformer', () => {
        const phoneNumber = '18922333797';
        const transformer = new TemplatePhoneNumberTrans('', phoneNumber);
        expect(transformer.transformer()).toBe(`@phoneNumber(,${phoneNumber})`);
    })
})