import StringRules from './stringRules';
import NmuberRules from './numberRules';
import BooleanRules from './booleanRules';
import ObjectRules from './objectRules';
import DateRules from './dateRules';
import dateTimeRules from './dateTimeRules';
import TimeRules from './timeRules';
import { validateMinMax } from '../../utils/validMinMax';
import { generateRangeRandom } from '../../utils/common';

interface TypeMap {
  [key: string]: SafeAny;
}
export default class ArrayRules {
  private init: SafeAny;
  private min: number;
  private max: number;
  constructor(init: SafeAny, min: number, max: number) {
    this.init = init;
    this.min = min;
    this.max = max;
  }

  private valid() {
    if (this.init && !Array.isArray(this.init) && !(typeof this.init === 'string')) {
      throw new Error('Invalid type! from: @array')
    }
    validateMinMax(this.min, this.max);
  }

  public arrayRandom() {
    this.valid();
    return Array.isArray(this.init) ? this.poolStrategy() : this.typeStrategy();
  }

  private poolStrategy() {
    const result = [];
    if (!this.max && !this.min) return this.init;
    const count = this.max ? generateRangeRandom(this.min, this.max) : this.min;
    for (let i = 0; i < count; i++) {
      const index = Math.floor(Math.random() * this.init.length); // 随机生成一个下标
      result.push(this.init[index]);
    }

    return result;
  }

  private typeStrategy() {
    const result: SafeAny[] = [];
    const count = this.max ? generateRangeRandom(this.min, this.max) : this.min;


    for (let i = 0; i < count; i++) {
      const typeMap: TypeMap = {
        number: new NmuberRules().intergerRandom(),
        string: new StringRules("lower", 3, 7).stringRandom(),
        boolean: new BooleanRules().booleanRandom(),
        object: new ObjectRules(1, 3, { "310000": "上海市", "320000": "江苏省", "330000": "浙江省", "340000": "安徽省" }).objectRandom(),
        date: DateRules.dateRandom(),
        time: TimeRules.timeRandom(),
        datetime: dateTimeRules.dateTimeRandom(),
      }
      result.push(typeMap?.[this.init] ?? this.init);
    }

    return result;
  }
}