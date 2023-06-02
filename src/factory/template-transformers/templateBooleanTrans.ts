import { valueType } from 'src/const';
import { TemplateDataTransformer } from '../interface';

class TemplateBooleanTrans implements TemplateDataTransformer {
  private templateBoolean: string = '@boolean';

  constructor(params: string, init: valueType) {
  }

  transformer(): SafeAny {
    // 生成布尔转换器
    return this.templateBoolean;
  }
}

export default TemplateBooleanTrans;