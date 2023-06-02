import { DataGenerator } from '../interface';

class ObjectGenerator implements DataGenerator {
  private objectResult: object;
  constructor(result: object) {
    this.objectResult = result;
  }
  generate(isObjectType: boolean, name: string): { [key: string]: object } | object {
    return isObjectType ? { [name]: this.objectResult } : this.objectResult;
  }
}

export default ObjectGenerator;