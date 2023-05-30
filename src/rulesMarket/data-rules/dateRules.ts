export default class DateRules {
  static getFormatMap(format: string = 'yyyy-MM-dd'): { [key: string]: number | string } {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const yearShort = year.toString().slice(2);
    const monthPadded = month.toString().padStart(2, '0');
    const dayPadded = day.toString().padStart(2, '0');
    const yearSingle = year.toString().charAt(3);
    const monthSingle = month.toString();
    const daySingle = day.toString();
    return {
      'yyyy': year,
      'yy': yearShort,
      'y': yearSingle,
      'MM': monthPadded,
      'M': monthSingle,
      'dd': dayPadded,
      'd': daySingle,
    };
  }
  static dateRandom(format: string = 'yyyy-MM-dd'): string {
    const formatMap = this.getFormatMap(format);
    return format.replace(/yyyy|yy|y|MM|M|dd|d/g, match => formatMap[match].toString());
  }
}