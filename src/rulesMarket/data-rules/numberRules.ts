export default class NmuberRules {
  private min: number;
  private max: number;
  private init: number;

  constructor(min: number = -9007199254740992, max: number = 9007199254740992, init: number = 0) {
    this.min = min;
    this.max = max;
    this.init = init;
  }

  public defaultValue(): number {
    return this.init;
  }

  public intergerRandom(): number {
    if (this.min === this.max) {
      this.init = this.min;
      return this.init;
    }
    return (~~(Math.random() * (this.max - this.min + 1)) + this.min) || this.defaultValue();
  }
}