interface DataGenerator {
  generate(isObjectType: boolean, type: string): SafeAny;
}

interface CustomDataGenerator {
  generate(isObjectType: boolean, type: string): SafeAny;
}

interface TemplateDataTransformer {
  transformer(): SafeAny;
}

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
import TemplatePhoneNumberTransformer from './factory/template-transformers/templatePhoneNumberTrans';
import TemplateIdCardTransformer from './factory/template-transformers/templateIdCardTrans';

import { extractMockType } from './utils/transformer';
import DataToRules from './utils/templateSplit';
import { typeMap, generatorType, valueType } from './const';
import { Result } from './rulesMarket/data-rules/objectRules'

import NumberRules from './rulesMarket/data-rules/numberRules';
import StringRules from './rulesMarket/data-rules/stringRules';
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
    boolean: () => new BooleanGenerator(),
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
      ArrayRules.arrayRandom(...(params as [number]))
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
    idCard: (params, init) => new TemplateIdCardTransformer(params, init),
    phoneNumber: (params, init) => new TemplatePhoneNumberTransformer(params, init),
  };

  //TODO 后续拆分优化
  generate(config: string | { [key: string]: valueType; }) {
    let generator: DataGenerator | CustomDataGenerator = new BooleanGenerator();
    let isObjectType = false;
    let templateName = '';
    let generatorCollector: { maker: typeof generator, name: string }[] = [];
    let originType = '';
    //针对mock.generate({})模板的情况
    if (typeof config === 'object') {
      isObjectType = true;
      for (const key in config) {
        if (config.hasOwnProperty(key)) {
          let templateConfig = new DataToRules({ [key]: config[key] });
          templateName = templateConfig.name;
          //针对值为@的情况e.g: "number|+100": '@number(7,10)',
          if (typeof templateConfig.initData === 'string' && /@/.test(templateConfig.initData)) {
            originType = /@array/.test(templateConfig.initData) ? 'array' : '';
            templateConfig.initData = this.generatorBuild(templateConfig.initData).generate(false, templateConfig.type);
          }
          let templateTransformer = this.templateTransformerFactory[templateConfig.type]?.(templateConfig.rules, templateConfig.initData);
          generator = this.generatorBuild(templateTransformer?.transformer(), originType);
          generatorCollector.push({
            maker: generator,
            name: templateName
          });
        }
      }
      //针对mock.generate(@type)的情况
    } else if (typeof config === 'string') {
      generator = this.generatorBuild(config);
    } else {
      console.log('参数类型未知');
    }
    if (generatorCollector.length > 0) {
      let generateorTemplateResult = {};
      for (let val of generatorCollector) {
        Object.assign(generateorTemplateResult, val.maker.generate(isObjectType, val.name))
      }
      return generateorTemplateResult;
    } else {
      return generator.generate(isObjectType, templateName);
    }
  }

  generatorBuild(config: string, originType: string = ''): DataGenerator | CustomDataGenerator {
    let generator: DataGenerator | CustomDataGenerator = new BooleanGenerator();
    let extract = extractMockType(config);
    if (!extract || !typeMap.includes(extract?.type ?? '')) {
      throw new Error('非法类型！');
    }
    if (this.dataGeneratorFactory[extract.type]) {
      generator = this.dataGeneratorFactory[extract.type]?.(originType === 'array' ? [extract.params] : extract.params) ?? new BooleanGenerator();
    } else if (this.customDataGeneratorFactory[extract.type]) {
      generator = this.customDataGeneratorFactory[extract.type]?.(extract.params) ?? new BooleanGenerator();
    }
    return generator;
  }

}

export default Mock;