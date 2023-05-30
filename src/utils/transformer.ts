import { generatorType } from '../const'
export function extractMockType(mockType: string): { type: generatorType, params: SafeAny[] } | null {
  const regex = /@(\w+)(\((.*?)\))?/;
  const match = mockType?.match(regex);
  if (match) {
    const type = match[1] as generatorType;
    const result = match[3];
    const normal = result ? result.split(',').map(param => {
      const trimmedParam = param.trim().replace(/"/g, '');
      const numParam = Number(trimmedParam);
      return !isNaN(numParam) ? numParam : trimmedParam;
    }) : [];
    const regex = /{.*}/; // 匹配字符串中的对象部分
    //针对字符串中存在{}，认定为对象的处理
    const params = regex.test(result) ? hasObjDeal(result?.match(regex) ?? [], result) : normal;

    return { type, params };
  }
  return null;
}

function hasObjDeal(match: string[], result: string) {
  const regex = /{.*}/; // 匹配字符串中的对象部分
  const obj = JSON.parse(match[0]); // 将匹配到的对象部分转换为对象
  const res = result.replace(regex, JSON.stringify(obj)); // 将对象部分替换为转换后的对象
  return JSON.parse(`[${res}]`);
}