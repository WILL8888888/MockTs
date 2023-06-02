import { DataGenerator } from '../interface';

class TimeGenerator implements DataGenerator {
  private timeResult: string;
  constructor(time: string) {
    this.timeResult = time
  }
  generate(isObjectType: boolean, name: string): { [key: string]: string } | string {
    return isObjectType ? { [name]: this.timeResult } : this.timeResult
  }
}

export default TimeGenerator;