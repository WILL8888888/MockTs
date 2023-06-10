import BaseGenerator from './baseGen';
class StringGenerator extends BaseGenerator<string> {
  constructor(result: string) {
    super(result);
  }
}

export default StringGenerator;