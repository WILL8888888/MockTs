import Mock from "./mock";
const mock = new Mock();

// generate random data

//boolean: @boolean(odds?)

console.log(mock.gen('@boolean')); //e.g: false
console.log(mock.gen('@boolean()')); //e.g: true

//number: @number(min, max, init)

console.log(mock.gen('@number')); //e.g: -9007199259251704
console.log(mock.gen('@number()'));//e.g: -9007199513986068
console.log(mock.gen('@number(8)'));//e.g: -352010177
console.log(mock.gen('@number(8,100, 200)'));//e.g: 92
console.log(mock.gen('@number(8, 8)'));//e.g: 8

//string: @string(pool, min ,max)

/*支持以下内置字符集
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  symbol: "!@#$%^&*()[]",
*/

console.log(mock.gen('@string')); //e.g: xLH
console.log(mock.gen('@string()')); //e.g: aw$^
console.log(mock.gen('@string(5)')); //e.g: GA(VW
console.log(mock.gen('@string("lower", 5)')); //e.g: elewr
console.log(mock.gen('@string("upper", 5)')); //e.g: IDPSP
console.log(mock.gen('@string("number", 5)')); //e.g: 68598
console.log(mock.gen('@string("symbol", 5)')); //e.g: ^!]*^
console.log(mock.gen('@string("aeiou", 5)')); //e.g: uaiuu
console.log(mock.gen('@string(7, 10)')); //e.g: (##^4YU
console.log(mock.gen('@string("lower", 1, 3)')); //e.g: g
console.log(mock.gen('@string("upper", 1, 3)')); //e.g: PD
console.log(mock.gen('@string("number", 1, 3)')); //e.g: 83
console.log(mock.gen('@string("symbol", 1, 3)')); //e.g: #&#
console.log(mock.gen('@string("aeiou", 1, 3)')); //e.g: ii
console.log(mock.gen('@string("myself", 0, 0)')); //e.g: myself

//date

console.log(mock.gen('@date')); //e.g: 2023-05-30
console.log(mock.gen('@date()')); //e.g: 2023-05-30
console.log(mock.gen('@date("yyyy-MM-dd")')); //e.g: 2023-05-30
console.log(mock.gen('@date("yy-MM-dd")')); //e.g: 23-05-30
console.log(mock.gen('@date("y-MM-dd")')); //e.g: 3-05-30
console.log(mock.gen('@date("y-M-d")')); //e.g: 3-5-30
console.log(mock.gen('@date("yyyy yy y MM M dd d")')); //e.g: 2023 23 3 05 5 30 30

//time

console.log(mock.gen('@time')); //e.g: 15:53:51
console.log(mock.gen('@time()')); //e.g: 15:53:51
console.log(mock.gen('@time("A HH:mm:ss")')); //e.g: PM 15:53:51
console.log(mock.gen('@time("a HH:mm:ss")')); //e.g: pm 15:53:51
console.log(mock.gen('@time("HH:mm:ss")')); //e.g: 15:53:51
console.log(mock.gen('@time("H:m:s")')); //e.g: 15:53:51

//datetime

console.log(mock.gen('@datetime("HH H hh h mm m ss s SS S A a T")')); //e.g: 15 15 03 3 55 55 57 57 SS S PM pm 1685433357830

//object

console.log(mock.gen('@object')); //e.g: { kubtb: 'BUGPY' }
console.log(mock.gen('@object()')); //e.g: { tubb: 'NOYK' }
console.log(mock.gen('@object(1, 10)')); //e.g: { kmpjmp: 'KSZSDAA', mcty: 'ZUL', vxvbih: 'EZHETUD', lsj: 'XDU' }
console.log(mock.gen('@object(2, 10, {"310000": "@string(upper, 5)", "320000": "江苏省", "330000": "浙江省", "340000": "安徽省"})')); //e.g: { '320000': 'DCXMX', '340000': '安徽省' }

//array
console.log(mock.gen('@array')); //e.g: []
console.log(mock.gen('@array()')); //e.g: []
console.log(mock.gen('@array([1,2,3,4,5], 3, 6)')); //e.g: [ 3, 4, 5, 6 ]
console.log(mock.gen('@array("number", 3, 6)')); //e.g: [ -9007200743133732, -9007200294278760, -9007197882659496 ]
console.log(mock.gen('@array("string", 3)')); //e.g: [ 'afe', 'qhjar', 'jgqgiy', 'nvu' ]
console.log(mock.gen('@array("object", 3, 6)')); //e.g: [{ '310000': '上海市', '320000': '江苏省', '340000': '安徽省' },{ '320000': '江苏省', '330000': '浙江省' }, { '310000': '上海市', '340000': '安徽省' },]
console.log(mock.gen('@array("boolean", 3, 6)'));//e.g: [ false, false, true, true, true ]
console.log(mock.gen('@array("date", 3, 6)')); //e.g: [ '2023-06-04', '2023-06-04', '2023-06-04' ]
console.log(mock.gen('@array("time", 3, 6)')); //e.g: [ '23:36:57', '23:36:57', '23:36:57', '23:36:57', '23:36:57' ]
console.log(mock.gen('@array("datetime", 3, 6)')); //e.g: ['2023-06-04 23:36:57','2023-06-04 23:36:57','2023-06-04 23:36:57']


// generate custom data

//身份证：中国、美国

console.log(mock.gen('@idCard("CN")')); //e.g: 110103198912113996
console.log(mock.gen('@idCard("US")')); //e.g: 0012984

//手机号码：中国、美国
console.log(mock.gen('@phoneNumber("CN")')); //e.g: 17638557999
console.log(mock.gen('@phoneNumber("US")')); //e.g: 7061787793

// generate data based on template

console.dir(mock.gen({
  "aaa|1 to 100": '@number(7,10)',
  "bbb|+1": 712,
  "ccc": '@number(7,10)',
  "ddd|1 to 10": '@string("upper", 5)',
  "eee|3": '★★★',
  "fff": '@string("upper", 5)',
  "ggg": '@boolean',
  "hhh|2 to 4": {
    "310000": "@string(upper, 5)",
    "320000": "江苏省",
    "330000|2 to 4": {
      "111": "@string(upper, 5)",
      "222": "江苏省",
      "333": "浙江省",
      "444": "安徽省"
    },
    "340000|1 to 3": [{
      "aa": 'xx',
      "bb": 'yy',
      "cc": 'zz',
    }]
  },
  "iii|2 to 4": {
    "310000": "@string(upper, 5)",
    "320000": "江苏省",
    "330000": "浙江省",
    "340000": "安徽省"
  },
  "lll": '@idCard("CN")',
  "mmm": '@phoneNumber("US")',
  "nnn|2 to 4": [{
    "iii|2 to 4": {
      "310000": "@string(upper, 5)",
      "320000": "江苏省",
      "330000": "浙江省",
      "340000|2-4": {
        "aaa": "@string(upper, 5)",
        "bbb": "@string(lower, 5)"
      }
    },
    "222": {
      "310000": "@string(upper, 5)",
      "320000": "江苏省",
      "330000": "浙江省",
      "340000": "安徽省"
    },
    "333": "@number(7,10)",
    "444": "@idCard(CN)"
  }, {
    "111": "@string(upper, 5)",
    "222": "@boolean",
    "333": "@number(7,10)",
    "444": "@idCard(CN)"
  }]
}), { depth: null })

// e.g: {
//   aaa: 10,
//   bbb: 713,
//   ccc: 10,
//   ddd: 'JRJR',
//   eee: '★★★',
//   fff: 'NMOFR',
//   ggg: false,
//   hhh: {
//     '330000': { '111': 'EZSTR', '333': '浙江省' },
//     '340000': [ { aa: 'xx', bb: 'yy', cc: 'zz' } ]
//   },
//   iii: { '310000': 'VQQTQ', '320000': '江苏省' },
//   jjj: { '330000': '浙江省', '340000': '安徽省' },
//   kkk: { mnjgpc: 'CUPE', ppphvus: 'HEIZ' },
//   lll: 110102197108079680,
//   mmm: 5098191763,
//   nnn: [
//     {
//       '111': 'HXUHT',
//       '222': true,
//       '333': 10,
//       '444': 110103200507201090
//     },
//     {
//       '222': {
//         '310000': 'QSOIB',
//         '320000': '江苏省',
//         '330000': '浙江省',
//         '340000': '安徽省'
//       },
//       '333': 8,
//       '444': 110103196210031540,
//       iii: {
//         '320000': '江苏省',
//         '330000': '浙江省',
//         '340000': { bbb: 'lkbff', aaa: 'IHASV' }
//       }
//     }
//   ]
// }