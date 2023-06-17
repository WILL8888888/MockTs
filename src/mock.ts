import { DataGenerator, TemplateDataTransformer } from 'src/factory/interface';

import {
  NumberGenerator, StringGenerator, BooleanGenerator, DateGenerator, TimeGenerator, DateTimeGenerator,
  ObjectGenerator, ArrayGenerator, IDCardGenerator, PhoneNumberGenerator, TemplateNumberTransformer,
  TemplateStringTransformer, TemplateBooleanTransformer, TemplateObjectTransformer, TemplateArrayTransformer,
  TemplatePhoneNumberTransformer, TemplateIdCardTransformer
} from './factory/index';

import {
  NumberRules, StringRules, BooleanRules, DateRules, TimeRules, DateTimeRules,
  ArrayRules, ObjectRules, IdCardRules, PhoneNumberRules
} from './rulesMarket/index';

import { extractMockType } from './utils/transformer';
import DataToRules from './utils/templateSplit';
import { isObject } from './utils/common';
import { typeMap, generatorType, valueType } from './const';
import { Result } from './rulesMarket/data-rules/objectRules'

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
    ),
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

  private deepDataStructure(value: string[]) {
    let innerDeal: SafeAny = {};
    for (const innerKey in value) {
      const isComplexType = isObject(value[innerKey]) || Array.isArray(value[innerKey]);
      let [innerGenKey, innerGenVal] = Object.entries(this.gen({ [innerKey]: value[innerKey] }))[0]
      innerDeal[isComplexType ? innerGenKey : innerKey] = isComplexType ? innerGenVal : value[innerKey];
    }
    return innerDeal;
  }

  private templateTransformerGenerate(template: { [key: string]: valueType; }) {
    let originType = '';
    const templateConfig = new DataToRules(template);
    let templateName = templateConfig.name;
    //针对值为@的情况e.g: "number|+100": '@number(7,10)',
    if (typeof templateConfig.initData === 'string' && /@/.test(templateConfig.initData)) {
      originType = /@array/.test(templateConfig.initData) ? 'array' : '';
      templateConfig.initData = this.generatorBuild(templateConfig.initData).generate(false, templateConfig.type);
    }

    const templateTransformer = this.templateTransformerFactory[templateConfig.type]?.(templateConfig.rules, templateConfig.initData);
    return {
      tansformerGenerate: this.generatorBuild(templateTransformer?.transformer(), originType),
      templateName
    }
  }

  generatorIsObjectBuild(config: { [key: string]: valueType; }) {
    let generator: DataGenerator = new BooleanGenerator(new BooleanRules().booleanRandom());
    let templateName = '';
    const generatorCollector = Object.entries(config).map(([key, value]: [string, SafeAny]) => {
      // 处理深层对象
      isObject(value) && (value = this.deepDataStructure(value));

      // 处理深层对象数组
      Array.isArray(value) && (value = value.map(inner => this.gen(this.deepDataStructure(inner))));
      const transformer = this.templateTransformerGenerate({ [key]: value })
      generator = transformer.tansformerGenerate;
      templateName = transformer.templateName;
      return {
        maker: generator,
        name: templateName
      };
    });
    const generateorTemplateResult = Object.assign({}, ...generatorCollector.map(val => val.maker.generate(true, val.name)));
    return {
      generateorTemplateResult,
      templateName
    }
  }

  generatorBuild(config: string, originType: string = ''): DataGenerator {
    let generator: DataGenerator = new BooleanGenerator(new BooleanRules().booleanRandom());
    let extract = extractMockType(config);
    if (!extract || !typeMap.includes(extract?.type ?? '')) {
      throw new Error('Invalid type!');
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
    }
    return generator;
  }

  gen(config: string | { [key: string]: valueType; }) {
    if (!(isObject(config) || typeof config === 'string')) throw new Error('Unknown parameter type');
    let isObjectType = false;
    let templateName = '';
    return [{
      //针对mock.generate({})模板的情况
      rules: isObject(config),
      action: () => {
        isObjectType = true;
        const templateBuild = this.generatorIsObjectBuild(config as { [key: string]: valueType; });
        templateName = templateBuild.templateName;
        return templateBuild.generateorTemplateResult;
      }
    }, {
      rules: typeof config === 'string',
      action: () => {
        let generator: DataGenerator = new BooleanGenerator(new BooleanRules().booleanRandom());
        generator = this.generatorBuild(config as string);
        return generator.generate(isObjectType, templateName);
      }
    }].filter(item => item.rules)[0].action()
  }



}

export default Mock;