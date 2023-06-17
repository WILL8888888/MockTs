import { valueType } from 'src/const';
import { TemplateDataTransformer } from '../interface';

class TemplateObjectTrans implements TemplateDataTransformer {
  private templateObject: string = "@object";

  constructor(params: string, init: valueType) {
    if (params.includes('to')) {
      const [min, max] = params.split('to').map(Number);
      this.templateObject = `@object(${min}, ${max}, ${JSON.stringify(init)})`;
      return;
    }

    this.templateObject = `@object(${Number(params)}, ${Number(params)}, ${JSON.stringify(init)})`;
    return;
  }

  transformer(): SafeAny {
    // 生成字符串转换器
    return this.templateObject;
  }
}

export default TemplateObjectTrans;