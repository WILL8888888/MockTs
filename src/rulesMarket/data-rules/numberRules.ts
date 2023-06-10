export default class NmuberRules {
  private min: number;
  private max: number;
  private init: number;

  constructor(min: number = -9007199254740992, max: number = 9007199254740992, init: number = 0) {
    this.min = min;
    this.max = max;
    this.init = init;
  }

  public intergerRandom(): number {
    if (this.min === this.max) {
      return this.min;
    }
    return (~~(Math.random() * (this.max - this.min + 1)) + this.min) || this.init;
  }
}