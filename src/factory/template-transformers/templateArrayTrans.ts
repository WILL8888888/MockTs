import { valueType } from 'src/const';
import { TemplateDataTransformer } from '../interface';

class TemplateArrayTrans implements TemplateDataTransformer {
  private templateString: string = "@array(string, 3)";

  constructor(params: string, init: valueType) {
    if (params.includes('to')) {
      const [min, max] = params.split('to').map(Number);
      this.templateString = `@array(${JSON.stringify(init)}, ${min}, ${max})`;
      return;
    }

    if (params.includes('+')) {
      let pickNum: number = Number(params.slice(1));
      this.templateString = `@array(${JSON.stringify(init)}, ${pickNum})`;
      return;
    }
  }

  transformer(): SafeAny {
    // 生成字符串转换器
    return this.templateString;
  }
}

export default TemplateArrayTrans;