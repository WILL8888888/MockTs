import { generatorType } from '../const';
interface Matcher {
  regex: RegExp;
  handler: (match: RegExpMatchArray) => { type: generatorType, params: SafeAny[] };
}

const matchers: Matcher[] = [
  { regex: /^@object\((\d+), (\d+), ({.*})\)$/, handler: handleObject },
  { regex: /^@array\((\[.*\]), (\d+)(?:, (\d+))?\)$/, handler: handleArray },
  { regex: /@(\w+)(\((.*?)\))?/, handler: handleRegex }
];

function handleObject(match: RegExpMatchArray) {
  const [_, rows, cols, fields] = match;
  return { type: 'object' as generatorType, params: [rows, cols, JSON.parse(fields)] }
}

function handleArray(match: RegExpMatchArray) {
  const [_, items, count] = match;
  return { type: 'array' as generatorType, params: [JSON.parse(items), parseInt(count)] };
}

function handleRegex(match: RegExpMatchArray) {
  //@array([1,2,3,4,5], 3, 6)') type: array; matchParams: [1,2,3,4,5], 3, 6

  const type = match[1]; //e.g: array
  let matchParams = match[3]; //e.g: [1,2,3,4,5], 3, 6
  let params = [];
  const normalParams = matchParams ? matchParams.split(',').map(param => {
    const trimmedParam = param.trim().replace(/"/g, '');
    const numParam = Number(trimmedParam);
    return !isNaN(numParam) ? numParam : trimmedParam;
  }) : [];
  const objRegex = /{.*}/; // 匹配字符串中的对象部分
  const arrayRegex = /\[.*?\]/; // 匹配字符串中的数组部分
  params = objRegex.test(matchParams) ? hasObjDeal(matchParams?.match(objRegex) ?? [], matchParams) :
    arrayRegex.test(matchParams) ? JSON.parse(`[${matchParams}]`) : normalParams;

  return { type: type as generatorType, params };
}

export function hasObjDeal(match: string[], result: string) {
  const paramHasObj = JSON.parse(match[0]); // 将匹配到的对象部分转换为对象
  const afterTransObj = result.replace(/{.*}/, JSON.stringify(paramHasObj)); // 将对象部分替换为转换后的对象
  return JSON.parse(`[${afterTransObj}]`);
}

export function extractMockType(mockType: string): { type: generatorType, params: SafeAny[] } | null {
  for (const matcher of matchers) {
    const match = mockType.match(matcher.regex);
    if (match) {
      return matcher.handler(match);
    }
  }
  return null;
}