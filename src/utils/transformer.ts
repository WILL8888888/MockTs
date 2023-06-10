import { generatorType } from '../const'
export function extractMockType(mockType: string): { type: generatorType, params: SafeAny[] } | null {

  const objectRegex = /^@object\((\d+), (\d+), ({.*})\)$/;
  const objectMatch = mockType.match(objectRegex);
  if (objectMatch) {
    const rows = parseInt(objectMatch[1]);
    const cols = parseInt(objectMatch[2]);
    const fields = JSON.parse(objectMatch[3]);
    return { type: 'object', params: [rows, cols, fields] }
  }

  const arrayRegex = /^@array\((\[.*\]), (\d+)(?:, (\d+))?\)$/;
  const arrayMatch = mockType.match(arrayRegex);
  if (arrayMatch) {
    const items = JSON.parse(arrayMatch[1]);
    const count = parseInt(arrayMatch[2]);
    return { type: 'array', params: [items, count] }
  }

  const regex = /@(\w+)(\((.*?)\))?/;
  const match = mockType?.match(regex);
  let params = [];
  if (match) {
    const type = match[1] as generatorType;
    const result = match[3];
    const normal = result ? result.split(',').map(param => {
      const trimmedParam = param.trim().replace(/"/g, '');
      const numParam = Number(trimmedParam);
      return !isNaN(numParam) ? numParam : trimmedParam;
    }) : [];
    const objRegex = /{.*}/; // 匹配字符串中的对象部分
    const arrayRegex = /\[.*?\]/; // 匹配字符串中的数组部分

    if (objRegex.test(result)) {
      params = hasObjDeal(result?.match(objRegex) ?? [], result)
    } else if (arrayRegex.test(result)) {
      params = JSON.parse(`[${result}]`);
    } else {
      params = normal;
    }
    return { type, params };
  }
  return null;
}

export function hasObjDeal(match: string[], result: string) {
  const objRegex = /{.*}/; // 匹配字符串中的对象部分
  const obj = JSON.parse(match[0]); // 将匹配到的对象部分转换为对象
  const res = result.replace(objRegex, JSON.stringify(obj)); // 将对象部分替换为转换后的对象
  return JSON.parse(`[${res}]`);
}