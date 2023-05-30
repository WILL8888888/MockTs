import { valueType } from 'src/const';
interface TemplateDataTransformer {
    transformer(): SafeAny;
}
class TemplateIdCardTrans implements TemplateDataTransformer {
    private templateIdCard: string = '@idCard';

    constructor(params: string, init: valueType) {
        this.templateIdCard = `@idCard(,${init})`
    }

    transformer(): SafeAny {
        // 生成布尔转换器
        return this.templateIdCard;
    }
}

export default TemplateIdCardTrans;