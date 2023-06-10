import BaseGenerator from './baseGen';
class DateGenerator extends BaseGenerator<string> {
  constructor(date: string) {
    super(date);
  }
}

export default DateGenerator;