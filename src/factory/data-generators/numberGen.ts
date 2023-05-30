interface DataGenerator {
  generate(isObjectType: boolean, name: string): SafeAny;
}

class NumberGenerator implements DataGenerator {
  private numberResult: number;

  constructor(result: number) {
    this.numberResult = result;
  }

  generate(isObjectType: boolean, name: string): { [key: string]: number } | number {
    return isObjectType ? { [name]: this.numberResult } : this.numberResult;
  }
}

export default NumberGenerator;