export default class TimeRules {
  static getFormatMap(): { [key: string]: number | string } {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return {
      'HH': hours.toString().padStart(2, '0'),
      'H': hours.toString(),
      'hh': (hours % 12 || 12).toString().padStart(2, '0'),
      'h': (hours % 12 || 12).toString(),
      'mm': minutes.toString().padStart(2, '0'),
      'm': minutes.toString(),
      'ss': seconds.toString().padStart(2, '0'),
      's': seconds.toString(),
      'A': hours < 12 ? 'AM' : 'PM',
      'a': hours < 12 ? 'am' : 'pm',
      'T': date.getTime().toString(),
    };
  }

  static timeRandom(format: string = 'HH:mm:ss'): string {
    const formatMap = this.getFormatMap();
    return format.replace(/HH|H|hh|h|mm|m|ss|s|A|a|T/g, match => formatMap[match].toString());
  }
}