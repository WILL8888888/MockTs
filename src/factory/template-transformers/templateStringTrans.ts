import { valueType } from 'src/const';
import { TemplateDataTransformer } from '../interface';

class TemplateStringTrans implements TemplateDataTransformer {
  private templateString: string = "@string";

  constructor(params: string, init: valueType) {
    if (params.includes('to')) {
      const [min, max] = params.split('to').map(Number);
      this.templateString = `@string(${init}, ${min}, ${max})`;
      return;
    }

    //max === 0即返回默认值
    this.templateString = `@string(${init}, 0, 0)`;
    return;
  }

  transformer(): SafeAny {
    // 生成字符串转换器
    return this.templateString;
  }
}

export default TemplateStringTrans;