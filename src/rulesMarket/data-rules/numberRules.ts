import { validateMinMax } from '../../utils/validMinMax';

export default class NmuberRules {
  private min: number;
  private max: number;
  private init: number;

  constructor(min: number = -9007199254740992, max: number = 9007199254740992, init: number = 0) {
    this.min = min;
    this.max = max;
    this.init = init;
  }

  private valid() {
    if (!(typeof this.init === 'number')) throw new Error('Invalid type! from: @number')
    validateMinMax(this.min, this.max);
  }

  public intergerRandom(): number {
    this.valid();
    return this.min === this.max ? this.min : ~~(Math.random() * (this.max - this.min + 1)) + this.min || this.init;
  }
}