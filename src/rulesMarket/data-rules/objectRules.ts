import StringRules from './stringRules';
import { isObject } from '../../utils/common';
import { validateMinMax } from '../../utils/validMinMax';

export interface Result {
  [key: string | number]: string | number | boolean;
}
export default class ObjectRules {
  private min: number;
  private max: number;
  private pool: Result = {};

  constructor(min: number = 1, max: number = min, pool: Result) {
    this.min = min;
    this.max = max;
    if (this.max === 0) this.pool = pool;
    const count = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    for (let i = 0; i < count; i++) {
      const key: string = new StringRules("lower", 3, 7).stringRandom();
      const value: string = new StringRules("upper", 3, 7).stringRandom();
      pool ? this.pool = pool : this.pool[key] = value;
    }
  }

  private valid() {
    if (!isObject(this.pool)) throw new Error('Invalid type! from: @object')
    validateMinMax(this.min, this.max);
  }

  public objectRandom(): Result {
    this.valid();
    if (this.max === 0) return this.pool;
    const keys = Object.keys(this.pool);
    const count = Math.min(keys.length, Math.floor(Math.random() * (this.max - this.min + 1)) + this.min);
    const selectedKeys = new Set<string>(); //有可能会取到重复属性，导致数量不对
    const result: Result = {};
    for (let i = 0; i < count; i++) {
      let randomIndex = Math.floor(Math.random() * keys.length);
      while (selectedKeys.has(keys[randomIndex])) {
        randomIndex = Math.floor(Math.random() * keys.length);
      }
      const key = keys[randomIndex];
      selectedKeys.add(key);
      result[key] = this.pool[key];
    }
    return result;
  }
}