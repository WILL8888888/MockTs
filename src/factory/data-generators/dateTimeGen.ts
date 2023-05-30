interface DataGenerator {
  generate(isObjectType: boolean, name: string): SafeAny;
}

class DateTimeGenerator implements DataGenerator {
  private dateTimeResult: string;
  constructor(dateTime: string) {
    this.dateTimeResult = dateTime
  }
  generate(isObjectType: boolean, name: string): { [key: string]: string } | string {
    return isObjectType ? { [name]: this.dateTimeResult } : this.dateTimeResult
  }
}

export default DateTimeGenerator;