import { it, expect, describe } from 'vitest';
import NumberGenerator from '../../src/factory/data-generators/numberGen';
import StringGenerator from '../../src/factory/data-generators/stringGen';
import BooleanGenerator from '../../src/factory/data-generators/booleanGen';
import ArrayGenerator from '../../src/factory/data-generators/arrayGen';
import ObjectGenerator from '../../src/factory/data-generators/objectGen';
import DateGenerator from '../../src/factory/data-generators/dateGen';
import TimeGenerator from '../../src/factory/data-generators/timeGen';
import DateTimeGenerator from '../../src/factory/data-generators/dateTimeGen';


describe('NumberGenerator', () => {
    it('isObjectType is false', () => {
        const generator = new NumberGenerator(42);
        const result = generator.generate(false, '');
        expect(result).to.equal(42);
    });

    it('isObjectType is true', () => {
        const generator = new NumberGenerator(42);
        const result = generator.generate(true, 'test');
        expect(result).to.deep.equal({ test: 42 });
    });
});

describe('StringGenerator', () => {
    it('empty string and isObjectType is false', () => {
        const generator = new StringGenerator('');
        const result = generator.generate(false, '');
        expect(result).to.equal('');
    });

    it('isObjectType is false', () => {
        const generator = new StringGenerator('hello');
        const result = generator.generate(false, '');
        expect(result).to.equal('hello');
    });

    it('should generate an object with the string value when isObjectType is true', () => {
        const generator = new StringGenerator('world');
        const result = generator.generate(true, 'str');
        expect(result).to.deep.equal({ str: 'world' });
    });
});

describe('BooleanGenerator', () => {
    it('value is false and isObjectType is false', () => {
        const generator = new BooleanGenerator(false);
        const result = generator.generate(false, '');
        expect(result).to.equal(false);
    });

    it('value is true and isObjectType is false', () => {
        const generator = new BooleanGenerator(true);
        const result = generator.generate(false, '');
        expect(result).to.equal(true);
    });

    it('isObjectType is true', () => {
        const generator = new BooleanGenerator(true);
        const result = generator.generate(true, 'bool');
        expect(result).to.deep.equal({ bool: true });
    });
});

describe('ArrayGenerator', () => {
    it('empty array when isObjectType is false', () => {
        const generator = new ArrayGenerator([]);
        const result = generator.generate(false, '');
        expect(result).to.deep.equal([]);
    });

    it('isObjectType is true', () => {
        const generator = new ArrayGenerator([]);
        const result = generator.generate(true, 'array');
        expect(result).to.deep.equal({ array: [] });
    });
});

describe('ObjectGenerator', () => {
    it('empty object when isObjectType is false', () => {
        const generator = new ObjectGenerator({});
        const result = generator.generate(false, '');
        expect(result).to.deep.equal({});
    });

    it('isObjectType is false', () => {
        const generator = new ObjectGenerator({ foo: 'bar' });
        const result = generator.generate(false, '');
        expect(result).to.deep.equal({ foo: 'bar' });
    });

    it('isObjectType is true', () => {
        const generator = new ObjectGenerator({ foo: 'bar' });
        const result = generator.generate(true, 'obj');
        expect(result).to.deep.equal({ obj: { foo: 'bar' } });
    });
});

describe('DateGenerator', () => {
    it('isObjectType is false', () => {
        const generator = new DateGenerator('2023-06-06');
        const result = generator.generate(false, '');
        expect(result).to.equal('2023-06-06');
    });

    it('isObjectType is true', () => {
        const generator = new DateGenerator('2023-06-06');
        const result = generator.generate(true, 'date');
        expect(result).to.deep.equal({ date: '2023-06-06' });
    });
});

describe('TimeGenerator', () => {
    it('isObjectType is false', () => {
        const generator = new TimeGenerator('12:00:00');
        const result = generator.generate(false, '');
        expect(result).to.equal('12:00:00');
    });

    it('isObjectType is true', () => {
        const generator = new TimeGenerator('12:00:00');
        const result = generator.generate(true, 'time');
        expect(result).to.deep.equal({ time: '12:00:00' });
    });
});

describe('DateTimeGenerator', () => {
    it('isObjectType is false', () => {
        const generator = new DateTimeGenerator('15 15 03 3 55 55 57 57 SS S PM pm 1685433357830');
        const result = generator.generate(false, '');
        expect(result).to.equal('15 15 03 3 55 55 57 57 SS S PM pm 1685433357830');
    });

    it('isObjectType is true', () => {
        const generator = new DateTimeGenerator('15 15 03 3 55 55 57 57 SS S PM pm 1685433357830');
        const result = generator.generate(true, 'datetime');
        expect(result).to.deep.equal({ datetime: '15 15 03 3 55 55 57 57 SS S PM pm 1685433357830' });
    });
});

