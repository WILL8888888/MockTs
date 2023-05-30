interface CustomDataGenerator {
  generate(isObjectType: boolean, name: string): SafeAny;
}

class IDCardGenerator implements CustomDataGenerator {
  private idResult: string;
  constructor(result: string) {
    this.idResult = result;
  }
  generate(isObjectType: boolean, name: string): { [key: string]: string } | string {
    // generate ID card number
    return isObjectType ? { [name]: this.idResult } : this.idResult
  }
}

export default IDCardGenerator;