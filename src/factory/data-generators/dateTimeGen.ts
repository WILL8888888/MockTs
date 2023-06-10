import BaseGenerator from './baseGen';
class DateTimeGenerator extends BaseGenerator<string> {
  constructor(dateTime: string) {
    super(dateTime);
  }
}

export default DateTimeGenerator;