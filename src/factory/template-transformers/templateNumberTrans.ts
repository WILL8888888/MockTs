import { valueType } from 'src/const';
import { TemplateDataTransformer } from '../interface';

class TemplateNumberTrans implements TemplateDataTransformer {
  private templateNumber: string = '@number';

  constructor(params: string, init: valueType) {
    if (params.includes('-')) {
      const [min, max] = params.split('-').map(Number);
      this.templateNumber = `@number(${min}, ${max}, ${init})`;
      return;
    }

    if (params.includes('+')) {
      let stepNum: number = init as number + parseInt(params.slice(1));
      this.templateNumber = `@number(${stepNum}, ${stepNum})`;
      return;
    }

    //min === max即取传入的init的结果
    this.templateNumber = `@number(${init}, ${init}, ${init})`
  }

  transformer(): SafeAny {
    // 生成数字转换器
    return this.templateNumber;
  }
}

export default TemplateNumberTrans;