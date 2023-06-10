import BaseGenerator from './baseGen';
class ArrayGenerator extends BaseGenerator<SafeAny[]> {
  constructor(result: SafeAny[]) {
    super(result);
  }
}

export default ArrayGenerator;