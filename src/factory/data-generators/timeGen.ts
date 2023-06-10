import BaseGenerator from './baseGen';
class TimeGenerator extends BaseGenerator<string> {
  constructor(result: string) {
    super(result);
  }
}

export default TimeGenerator;