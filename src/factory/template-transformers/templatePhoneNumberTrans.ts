import { valueType } from 'src/const';
import { TemplateDataTransformer } from '../interface';

class TemplatePhoneNumberTrans implements TemplateDataTransformer {
    private templatePhoneNumber: string = '@phoneNumber';

    constructor(params: string, init: valueType) {
        this.templatePhoneNumber = `@phoneNumber(,${init})`
    }

    transformer(): SafeAny {
        // 生成布尔转换器
        return this.templatePhoneNumber;
    }
}

export default TemplatePhoneNumberTrans;