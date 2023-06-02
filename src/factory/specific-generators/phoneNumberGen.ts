import { CustomDataGenerator } from '../interface';

class PhoneNumberGenerator implements CustomDataGenerator {
  private phoneNumResult: string;
  constructor(result: string) {
    this.phoneNumResult = result;
  }
  generate(isObjectType: boolean, name: string): { [key: string]: string } | string {
    return isObjectType ? { [name]: this.phoneNumResult } : this.phoneNumResult
  }
}

export default PhoneNumberGenerator;