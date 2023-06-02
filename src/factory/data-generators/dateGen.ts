import { DataGenerator } from '../interface';

class DateGenerator implements DataGenerator {
  dateResult = ""
  constructor(result: string) {
    this.dateResult = result;
  }

  generate(isObjectType: boolean, name: string): { [key: string]: string } | string {
    return isObjectType ? { [name]: this.dateResult } : this.dateResult;
  }
}

export default DateGenerator;