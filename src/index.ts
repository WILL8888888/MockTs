import Mock from "./mock";
const mock = new Mock();

// generate random data

//boolean

// console.log(mock.generate('@boolean')); //e.g: false
// console.log(mock.generate('@boolean()')); //e.g: true

//number

// console.log(mock.generate('@number')); //e.g: -9007199259251704
// console.log(mock.generate('@number()'));//e.g: -9007199513986068
// console.log(mock.generate('@number(8)'));//e.g: -352010177
// console.log(mock.generate('@number(8,100)'));//e.g: 92
// console.log(mock.generate('@number(8, 8)'));//e.g: 8

//string

// console.log(mock.generate('@string')); //e.g: xLH
// console.log(mock.generate('@string()')); //e.g: aw$^
// console.log(mock.generate('@string(5)')); //e.g: GA(VW
// console.log(mock.generate('@string("lower", 5)')); //e.g: elewr
// console.log(mock.generate('@string("upper", 5)')); //e.g: IDPSP
// console.log(mock.generate('@string("number", 5)')); //e.g: 68598
// console.log(mock.generate('@string("symbol", 5)')); //e.g: ^!]*^
// console.log(mock.generate('@string("aeiou", 5)')); //e.g: uaiuu
// console.log(mock.generate('@string(7, 10)')); //e.g: (##^4YU
// console.log(mock.generate('@string("lower", 1, 3)')); //e.g: g
// console.log(mock.generate('@string("upper", 1, 3)')); //e.g: PD
// console.log(mock.generate('@string("number", 1, 3)')); //e.g: 83
// console.log(mock.generate('@string("symbol", 1, 3)')); //e.g: #&#
// console.log(mock.generate('@string("aeiou", 1, 3)')); //e.g: ii
// console.log(mock.generate('@string("myself", 0, 0)')); //e.g: myself

//date

// console.log(mock.generate('@date')); //e.g: 2023-05-30
// console.log(mock.generate('@date()')); //e.g: 2023-05-30
// console.log(mock.generate('@date("yyyy-MM-dd")')); //e.g: 2023-05-30
// console.log(mock.generate('@date("yy-MM-dd")')); //e.g: 23-05-30
// console.log(mock.generate('@date("y-MM-dd")')); //e.g: 3-05-30
// console.log(mock.generate('@date("y-M-d")')); //e.g: 3-5-30
// console.log(mock.generate('@date("yyyy yy y MM M dd d")')); //e.g: 2023 23 3 05 5 30 30

//time

// console.log(mock.generate('@time')); //e.g: 15:53:51
// console.log(mock.generate('@time()')); //e.g: 15:53:51
// console.log(mock.generate('@time("A HH:mm:ss")')); //e.g: PM 15:53:51
// console.log(mock.generate('@time("a HH:mm:ss")')); //e.g: pm 15:53:51
// console.log(mock.generate('@time("HH:mm:ss")')); //e.g: 15:53:51
// console.log(mock.generate('@time("H:m:s")')); //e.g: 15:53:51

//datetime

// console.log(mock.generate('@datetime("HH H hh h mm m ss s SS S A a T")')); //e.g: 15 15 03 3 55 55 57 57 SS S PM pm 1685433357830

//object

// console.log(mock.generate('@object')); //e.g: { kubtb: 'BUGPY' }
// console.log(mock.generate('@object()')); //e.g: { tubb: 'NOYK' }
// console.log(mock.generate('@object(1, 10)')); //e.g: { kmpjmp: 'KSZSDAA', mcty: 'ZUL', vxvbih: 'EZHETUD', lsj: 'XDU' }
// console.log(mock.generate('@object(2, 10, {"310000": "上海市", "320000": "江苏省", "330000": "浙江省", "340000": "安徽省"})')); //e.g: { '320000': '江苏省', '340000': '安徽省' }

//array

// console.log(mock.generate('@array')); //e.g: []
// console.log(mock.generate('@array()')); //e.g: []
// console.log(mock.generate('@array(3, 7)')); //e.g: [ 3, 4, 5, 6 ]
// console.log(mock.generate('@array(1, 10, 2)')); //e.g: [ 1, 3, 5, 7, 9 ]

// generate custom data

//身份证：中国、美国

// console.log(mock.generate('@idCard("CN")')); //e.g: 110103198912113996
// console.log(mock.generate('@idCard("US")')); //e.g: 0012984

//手机号码：中国、美国
// console.log(mock.generate('@phoneNumber("CN")')); //e.g: 17638557999
// console.log(mock.generate('@phoneNumber("US")')); //e.g: 7061787793

// generate data based on template

console.log(mock.generate({
  "aaa|1-100": '@number(7,10)',
  "bbb|+1": 712,
  "ccc": '@number(7,10)',
  "ddd|1-10": '@string("upper", 5)',
  "eee|3": '★★★',
  "fff": '@string("upper", 5)',
  "ggg": '@boolean',
  "hhh|2-4": {
    "310000": "上海市",
    "320000": "江苏省",
    "330000": "浙江省",
    "340000": "安徽省"
  },
  "iii|2": {
    "310000": "上海市",
    "320000": "江苏省",
    "330000": "浙江省",
    "340000": "安徽省"
  },
  "jjj": {
    "330000": "浙江省",
    "340000": "安徽省"
  },
  "kkk": '@object(1, 10)',
  "lll": '@idCard("CN")',
  "mmm": '@phoneNumber("US")'
}))

//e.g: {
//   aaa: 22,
//   bbb: 713,
//   ccc: 10,
//   ddd: 'BBAATBTBT',
//   eee: '★★★',
//   fff: 'KEGRZ',
//   ggg: true,
//   hhh: { '320000': '江苏省', '330000': '浙江省', '340000': '安徽省' },
//   iii: { '330000': '浙江省', '340000': '安徽省' },
//   jjj: { '330000': '浙江省', '340000': '安徽省' },
//   kkk: {
//     pwqmgql: 'WXM',
//     jxp: 'GCE',
//     fsktx: 'DLNNNP',
//     rlaufhj: 'MCOG',
//     lxib: 'PXNMDZI',
//     sjfrha: 'UFY',
//     zmstw: 'NJR'
//   },
//   lll: 110102198411279870,
//   mmm: 5043268942
// }