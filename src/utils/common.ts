export function isObject(value: SafeAny) {
    return Object.prototype.toString.call(value) === '[object Object]';
}

export function generateRangeRandom(max: number, min: number) {
    return ~~(Math.random() * (max - min + 1)) + min
}