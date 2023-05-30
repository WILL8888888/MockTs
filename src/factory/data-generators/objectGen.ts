interface DataGenerator {
  generate(isObjectType: boolean, name: string): SafeAny;
}

class ObjectGenerator implements DataGenerator {
  private objectResult: object;
  constructor(result: object) {
    this.objectResult = result;
  }
  generate(isObjectType: boolean, name: string): { [key: string]: Object } | Object {
    return isObjectType ? { [name]: this.objectResult } : this.objectResult;
  }
}

export default ObjectGenerator;