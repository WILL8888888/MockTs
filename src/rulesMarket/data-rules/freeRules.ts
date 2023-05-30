export default class FreeRules {
  private init: SafeAny;
  constructor(init: SafeAny) {
    this.init = init;
  }

  public freeRandom(): SafeAny {
    return this.init
  }
}