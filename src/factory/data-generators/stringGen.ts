interface DataGenerator {
  generate(isObjectType: boolean, name: string): SafeAny;
}

class StringGenerator implements DataGenerator {
  private stringResult: string;

  constructor(result: string) {
    this.stringResult = result;
  }

  generate(isObjectType: boolean, name: string): { [key: string]: string } | string {
    return isObjectType ? { [name]: this.stringResult } : this.stringResult;
  }
}

export default StringGenerator;