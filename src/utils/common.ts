export function isObject(value: SafeAny) {
    return Object.prototype.toString.call(value) === '[object Object]';
}