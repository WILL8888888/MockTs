import { generatorType, valueType } from '../const';
import { extractMockType } from './transformer';
interface configTemplate {
  name: string,
  type: generatorType,
  rules: string
}


export default class DataToRules {
  public name: string;
  public rules: string = "";
  public initData: valueType = "";
  public type: generatorType;

  constructor(obj: { [key: string]: valueType }) {
    const keyStr = Object.keys(obj)[0];
    const { name, rules, type }: configTemplate = this.splitString(keyStr, obj[keyStr]);
    this.name = name;
    this.type = type;
    this.rules = rules;
    this.initData = obj[keyStr];
  }

  private splitString(str: string, initData: valueType): configTemplate {
    const [nameSplit, ruleSplit] = str.split("|");
    let initType: string | null = '';
    if (typeof initData === 'string' && /@/.test(initData)) {
      initType = extractMockType(initData)?.type ?? 'string'
    } else {
      initType = typeof initData;
    }
    return {
      name: nameSplit,
      rules: ruleSplit ?? '',
      type: initType
    } as configTemplate
  }
}