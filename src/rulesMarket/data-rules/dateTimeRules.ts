import DateRules from './dateRules';
import TimeRules from './timeRules';
export default class dateTimeRules {
  static dateTimeRandom(format: string = 'yyyy-MM-dd HH:mm:ss'): string {
    const formatMap: { [key: string]: number | string } = {
      ...DateRules.getFormatMap(),
      ...TimeRules.getFormatMap(),
    };
    return format.replace(/yyyy|yy|y|MM|M|dd|d|HH|H|hh|h|mm|m|ss|s|A|a|T/g, match => formatMap[match].toString());
  }
}