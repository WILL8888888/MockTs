interface DataGenerator {
  generate(isObjectType: boolean): SafeAny;
}

class ArrayGenerator implements DataGenerator {
  private arrayResult: number[];

  constructor(result: number[]) {
    this.arrayResult = result;
  }

  generate(isObjectType: boolean): SafeAny[] {
    return this.arrayResult;
  }
}

export default ArrayGenerator;