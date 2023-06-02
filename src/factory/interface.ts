export interface DataGenerator {
    generate(isObjectType: boolean, name: string): SafeAny;
}

export interface CustomDataGenerator {
    generate(isObjectType: boolean, name: string): SafeAny;
}

export interface TemplateDataTransformer {
    transformer(): SafeAny;
}