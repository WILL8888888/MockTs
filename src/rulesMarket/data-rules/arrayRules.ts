export default class ArrayRules {

  static arrayRandom(start: number, stop?: number, step: number = 1): number[] {
    let result: number[] = [];
    if (stop === undefined) {
      stop = start;
      start = 0;
    }
    for (let i = start; i < stop; i += step) {
      result.push(i);
    }
    return result;
  }
}