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
  public pool: string = "";
  private min: number = 3;
  private max: number = 7;
  public minToLength: number = 0; //@string( pool, length )

  constructor(pool: string | number, min: number, max: number) {
    this.pool = typeof pool === "string" ? defaultPool?.[pool] ?? pool : Object.values(defaultPool).join("");
    this.minToLength = typeof pool === "string" ? (max ? this.minToLength : min) : pool;
    this.min = min ?? this.min;
    this.max = max ?? this.max;
  }

  private getRandomChar(): string {
    return this.pool.charAt(Math.floor(Math.random() * this.pool.length));
  }

  public stringRandom(): string {
    let length = this.minToLength ? this.minToLength : Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    const result = Array.from({ length }, () => this.getRandomChar()).join("");

    return this.max === 0 ? this.pool : result;
  }
}