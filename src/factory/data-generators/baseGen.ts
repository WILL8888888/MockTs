import { DataGenerator } from '../interface';

export default abstract class BaseGenerator<T> implements DataGenerator {
  protected result: T;

  constructor(result: T) {
    this.result = result;
  }

  generate(isObjectType: boolean, name: string): { [key: string]: T } | T {
    const result = isObjectType ? { [name]: this.result } : this.result;
    return result;
  }
}