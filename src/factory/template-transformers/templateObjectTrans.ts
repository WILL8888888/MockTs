import { valueType } from 'src/const';
interface TemplateDataTransformer {
  transformer(): SafeAny;
}
class TemplateObjectTrans implements TemplateDataTransformer {
  private templateObject: string = "@object";

  constructor(params: string, init: valueType) {
    if (params.includes('-')) {
      const [min, max] = params.split('-').map(Number);
      this.templateObject = `@object(${min}, ${max}, ${JSON.stringify(init)})`;
      return;
    } else {
      this.templateObject = `@object(${Number(params)}, ${Number(params)}, ${JSON.stringify(init)})`;
      return;
    }
  }

  transformer(): SafeAny {
    // 生成字符串转换器
    return this.templateObject;
  }
}

export default TemplateObjectTrans;