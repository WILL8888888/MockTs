export default class BooleanRules {
  private odds: number
  constructor(odds: number = 0.5) {
    this.odds = odds;
  }

  public booleanRandom(): boolean {
    return Math.random() < this.odds;
  }
}