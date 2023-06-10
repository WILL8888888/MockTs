import { DataGenerator, CustomDataGenerator, TemplateDataTransformer } from 'src/factory/interface';

import NumberGenerator from './factory/data-generators/numberGen';
import StringGenerator from './factory/data-generators/stringGen';
import BooleanGenerator from './factory/data-generators/booleanGen';
import DateGenerator from './factory/data-generators/dateGen';
import TimeGenerator from './factory/data-generators/timeGen';
import DateTimeGenerator from './factory/data-generators/dateTimeGen';
import ObjectGenerator from './factory/data-generators/objectGen';
import ArrayGenerator from './factory/data-generators/arrayGen';
import IDCardGenerator from './factory/specific-generators/idCardGen';
import PhoneNumberGenerator from './factory/specific-generators/phoneNumberGen';

import TemplateNumberTransformer from './factory/template-transformers/templateNumberTrans';
import TemplateStringTransformer from './factory/template-transformers/templateStringTrans';
import TemplateBooleanTransformer from './factory/template-transformers/templateBooleanTrans';
import TemplateObjectTransformer from './factory/template-transformers/templateObjectTrans';
import TemplateArrayTransformer from './factory/template-transformers/templateArrayTrans';
import TemplatePhoneNumberTransformer from './factory/template-transformers/templatePhoneNumberTrans';
import TemplateIdCardTransformer from './factory/template-transformers/templateIdCardTrans';

import { extractMockType } from './utils/transformer';
import DataToRules from './utils/templateSplit';
import { isObject } from './utils/common';
import { typeMap, generatorType, valueType } from './const';
import { Result } from './rulesMarket/data-rules/objectRules'

import NumberRules from './rulesMarket/data-rules/numberRules';
import StringRules from './rulesMarket/data-rules/stringRules';
import BooleanRules from './rulesMarket/data-rules/booleanRules';
import DateRules from './rulesMarket/data-rules/dateRules';
import TimeRules from './rulesMarket/data-rules/timeRules';
import DateTimeRules from './rulesMarket/data-rules/dateTimeRules';
import ArrayRules from './rulesMarket/data-rules/arrayRules';
import ObjectRules from './rulesMarket/data-rules/objectRules';
import IdCardRules from './rulesMarket/specific-rules/idCardRules';
import PhoneNumberRules from './rulesMarket/specific-rules/phoneNumRules';

class Mock {
  private dataGeneratorFactory: { [key in generatorType]?: (params: SafeAny[]) => DataGenerator } = {
    number: (params) => new NumberGenerator(
      new NumberRules(...params).intergerRandom()
    ),
    string: (params) => new StringGenerator(
      new StringRules(...(params as [string | number, number, number])).stringRandom()
    ),
    boolean: (params) => new BooleanGenerator(
      new BooleanRules(...params).booleanRandom()
    ),
    date: (params) => new DateGenerator(
      DateRules.dateRandom(...params)
    ),
    time: (params) => new TimeGenerator(
      TimeRules.timeRandom(...params)
    ),
    datetime: (params) => new DateTimeGenerator(
      DateTimeRules.dateTimeRandom(...params)
    ),
    object: (params) => new ObjectGenerator(
      new ObjectRules(...params as [number, number, Result]).objectRandom()
    ),
    array: (params) => new ArrayGenerator(
      new ArrayRules(...params as [SafeAny, number, number]).arrayRandom()
    )
  };

  private customDataGeneratorFactory: { [key in generatorType]?: (params: SafeAny[]) => CustomDataGenerator } = {
    idCard: (params) => new IDCardGenerator(
      new IdCardRules(...params as [string]).IdCardRandom()
    ),
    phoneNumber: (params) => new PhoneNumberGenerator(
      new PhoneNumberRules(...params as [string]).phoneNumRandom()
    ),
  };

  private templateTransformerFactory: { [key in generatorType]?: (params: string, init: valueType) => TemplateDataTransformer } = {
    number: (params, init) => new TemplateNumberTransformer(params, init),
    string: (params, init) => new TemplateStringTransformer(params, init),
    boolean: (params, init) => new TemplateBooleanTransformer(params, init),
    object: (params, init) => new TemplateObjectTransformer(params, init),
    array: (params, init) => new TemplateArrayTransformer(params, init),
    idCard: (params, init) => new TemplateIdCardTransformer(params, init),
    phoneNumber: (params, init) => new TemplatePhoneNumberTransformer(params, init),
  };

  //TODO 后续拆分优化
  gen(config: string | { [key: string]: valueType; }) {
    let generator: DataGenerator | CustomDataGenerator = new BooleanGenerator(new BooleanRules().booleanRandom());
    let isObjectType = false;
    let templateName = '';
    let originType = '';
    //针对mock.generate({})模板的情况
    if (isObject(config)) {
      isObjectType = true;
      const generatorCollector = Object.entries(config).map(([key, value]: [string, SafeAny]) => {
        //处理深层对象
        if (isObject(value)) {
          let innerObjectDeal: SafeAny = {};
          for (const innerKey in value) {
            if (isObject(value[innerKey]) || Array.isArray(value[innerKey])) {
              let [innerGenKey, innerGenVal] = Object.entries(this.gen({ [innerKey]: value[innerKey] }))[0]
              innerObjectDeal[innerGenKey] = innerGenVal;
            } else {
              innerObjectDeal[innerKey] = value[innerKey];
            }
          }
          value = innerObjectDeal;
        }

        //处理深层对象数组
        if (Array.isArray(value)) {
          value = value.map((inner) => {
            let innerArrayDeal: SafeAny = {};
            for (const innerKey in inner) {
              if (isObject(inner[innerKey]) || Array.isArray(inner[innerKey])) {
                const [innerGenKey, innerGenVal] = Object.entries(this.gen({ [innerKey]: inner[innerKey] }))[0];
                innerArrayDeal[innerGenKey] = innerGenVal;
              } else {
                innerArrayDeal[innerKey] = inner[innerKey];
              }
            }
            return this.gen(innerArrayDeal);
          });
        }

        const templateConfig = new DataToRules({ [key]: value });
        templateName = templateConfig.name;
        //针对值为@的情况e.g: "number|+100": '@number(7,10)',
        if (typeof templateConfig.initData === 'string' && /@/.test(templateConfig.initData)) {
          originType = /@array/.test(templateConfig.initData) ? 'array' : '';
          templateConfig.initData = this.generatorBuild(templateConfig.initData).generate(false, templateConfig.type);
        }

        const templateTransformer = this.templateTransformerFactory[templateConfig.type]?.(templateConfig.rules, templateConfig.initData);
        generator = this.generatorBuild(templateTransformer?.transformer(), originType);
        return {
          maker: generator,
          name: templateName
        };
      });
      const generateorTemplateResult = Object.assign({}, ...generatorCollector.map(val => val.maker.generate(isObjectType, val.name)));
      return generateorTemplateResult;
    } else if (typeof config === 'string') {
      generator = this.generatorBuild(config);
    } else {
      console.log('参数类型未知');
    }
    return generator.generate(isObjectType, templateName);
  }

  generatorBuild(config: string, originType: string = ''): DataGenerator | CustomDataGenerator {
    let generator: DataGenerator | CustomDataGenerator = new BooleanGenerator(new BooleanRules().booleanRandom());
    let extract = extractMockType(config);
    if (!extract || !typeMap.includes(extract?.type ?? '')) {
      throw new Error('非法类型！');
    }
    for (let val of extract.params) {
      if (isObject(val)) {
        Object.entries(val).forEach(([key, value]) => {
          if (typeof value === 'string' && /@/.test(value)) {
            val[key] = this.generatorBuild(value).generate(false, "");
          }
        })
      }
    }
    if (this.dataGeneratorFactory[extract.type]) {
      generator = this.dataGeneratorFactory[extract.type]?.(extract.params) ?? new BooleanGenerator(new BooleanRules().booleanRandom());
    } else if (this.customDataGeneratorFactory[extract.type]) {
      generator = this.customDataGeneratorFactory[extract.type]?.(extract.params) ?? new BooleanGenerator(new BooleanRules().booleanRandom());
    }
    return generator;
  }

}

export default Mock;