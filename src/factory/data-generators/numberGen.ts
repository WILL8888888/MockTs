import BaseGenerator from './baseGen';
class NumberGenerator extends BaseGenerator<number> {
  constructor(result: number) {
    super(result);
  }
}

export default NumberGenerator;