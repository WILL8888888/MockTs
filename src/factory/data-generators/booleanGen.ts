interface DataGenerator {
  generate(isObjectType: boolean, name: string): SafeAny;
}

class BooleanGenerator implements DataGenerator {
  generate(isObjectType: boolean, name: string): { [key: string]: boolean } | boolean {
    let result = Math.random() < 0.5;
    return isObjectType ? { [name]: result } : result;
  }
}

export default BooleanGenerator;