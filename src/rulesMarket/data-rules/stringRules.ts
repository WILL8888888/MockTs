interface Pool {
  [key: string]: string;
}

const defaultPool: Pool = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  symbol: "!@#$%^&*()[]",
};

export default class StringRules {
  private pool: string = "";
  private min: number = 3;
  private max: number = 7;
  private minToLength: number = 0; //@string( pool, length )

  constructor(pool: string | number, min: number, max: number) {
    if (typeof pool === "string") {
      this.pool = defaultPool?.[pool] ?? pool;
      this.minToLength = max ? this.minToLength : min;
    } else {
      this.minToLength = pool;
      this.pool = "";
      for (const key in defaultPool) {
        this.pool += defaultPool[key];
      }
    }
    this.min = typeof min !== 'undefined' ? min : this.min;
    this.max = typeof max !== 'undefined' ? max : this.max;
  }

  private defaultString() {
    return this.pool;
  }

  private getRandomChar(): string {
    return this.pool.charAt(Math.floor(Math.random() * this.pool.length));
  }

  public stringRandom(): string {
    if (this.max === 0) {
      return this.defaultString();
    }
    let length = this.minToLength ? this.minToLength : Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    let result = "";
    for (let i = 0; i < length; i++) {
      result += this.getRandomChar();
    }
    return result;
  }
}