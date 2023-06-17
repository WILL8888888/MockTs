export default class BooleanRules {
  private odds: number
  constructor(odds: number = 0.5) {
    this.odds = odds;
  }

  private valid() {
    if (!(typeof this.odds === 'number') || !(this.odds >= 0 && this.odds <= 1)) throw new Error('Invalid type! from: @boolean')
  }

  public booleanRandom(): boolean {
    this.valid();
    return Math.random() < this.odds;
  }
}