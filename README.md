# MOCK

## 基础数据类型

### 数字类型

语法：`@number(min, max, init)`

示例：

```
mock.gen('@number()'); e.g: 223413;

mock.gen('@number'); e.g: 223413;

mock.gen('@number(4, 10)') ;e.g: 8 

mock.gen('@number(10)'); e.g: -12211

mock.gen('@number(6, 6)'); e.g: 6
```

### 字符串类型

语法：@string(pool, min ,max)

示例：

```
/*支持以下内置字符集

  lower: "abcdefghijklmnopqrstuvwxyz",

  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

  number: "0123456789",

  symbol: "!@#$%^&*()[]",

*/

mock.gen('@string'); //e.g: xLH
mock.gen('@string()'); //e.g: aw$^
mock.gen('@string(5)'); //e.g: GA(VW
mock.gen('@string("lower", 5)'); //e.g: elewr
mock.gen('@string("upper", 5)'); //e.g: IDPSP
mock.gen('@string("number", 5)'); //e.g: 68598
mock.gen('@string("symbol", 5)'); //e.g: ^!]*^
mock.gen('@string("aeiou", 5)'); //e.g: uaiuu
mock.gen('@string(7, 10)'); //e.g: (##^4YU
mock.gen('@string("lower", 1, 3)'); //e.g: g
mock.gen('@string("upper", 1, 3)'); //e.g: PD
mock.gen('@string("number", 1, 3)'); //e.g: 83
mock.gen('@string("symbol", 1, 3)'); //e.g: #&#
mock.gen('@string("aeiou", 1, 3)'); //e.g: ii
mock.gen('@string("myself", 0, 0)'); //e.g: myself
```

### 布尔值类型

语法：@boolean(odds?)

示例：

```
mock.gen('@boolean()'); e.g: true

mock.gen('@boolean'); e.g: true

mock.gen('@boolean(0.7)'); e.g: true
```

### 数组类型
语法：@array(start ,step, stop)

示例：

```
mock.gen('@array'); //e.g: []
mock.gen('@array()'); //e.g: []
mock.gen('@array([1,2,3,4,5], 3, 6)'); //e.g: [ 3, 4, 5, 6 ]
mock.gen('@array("number", 3, 6)')); //e.g: [ -9007200743133732, -9007200294278760, -9007197882659496 ]

mock.gen('@array("string", 3)'); 
//e.g: [ 'afe', 'qhjar', 'jgqgiy', 'nvu' ]

mock.gen('@array("object", 3, 6)'); 
//e.g: [{ '310000': '上海市', '320000': '江苏省', '340000': '安徽省' },{ '320000': '江苏省', '330000': '浙江省' }, { '310000': '上海市', '340000': '安徽省' },]

mock.gen('@array("boolean", 3, 6)');
//e.g: [ false, false, true, true, true ]

mock.gen('@array("date", 3, 6)'); 
//e.g: [ '2023-06-04', '2023-06-04', '2023-06-04' ]

mock.gen('@array("time", 3, 6)'); 
//e.g: [ '23:36:57', '23:36:57', '23:36:57', '23:36:57', '23:36:57' ]

mock.gen('@array("datetime", 3, 6)'); 
//e.g: ['2023-06-04 23:36:57','2023-06-04 23:36:57','2023-06-04 23:36:57']
```

### 对象类型

语法：@object(min, max, pool)

示例：

```
mock.gen('@object'); 
//e.g: { kubtb: 'BUGPY' }

mock.gen('@object()'); 
//e.g: { tubb: 'NOYK' }

mock.gen('@object(1, 10)'); 
//e.g: { kmpjmp: 'KSZSDAA', mcty: 'ZUL', vxvbih: 'EZHETUD', lsj: 'XDU' }

mock.gen('@object(2, 10, {"310000": "上海市", "320000": "江苏省", "330000": "浙江省", "340000": "安徽省"})'); 

//e.g: { '320000': '江苏省', '340000': '安徽省' }
```

### 时间类型

语法：@time(format?)

示例：


```
mock.gen('@time'); //e.g: 15:53:51

mock.gen('@time()'); //e.g: 15:53:51

mock.gen('@time("A HH:mm:ss")'); //e.g: PM 15:53:51

mock.gen('@time("a HH:mm:ss")'); //e.g: pm 15:53:51

mock.gen('@time("HH:mm:ss")'); //e.g: 15:53:51

mock.gen('@time("H:m:s")'); //e.g: 15:53:51
```

### 日期类型

语法：@date(format?)

示例：


```
mock.gen('@date'); //e.g: 2023-05-30

mock.gen('@date()'); //e.g: 2023-05-30

mock.gen('@date("yyyy-MM-dd")'); //e.g: 2023-05-30

mock.gen('@date("yy-MM-dd")'); //e.g: 23-05-30

mock.gen('@date("y-MM-dd")'); //e.g: 3-05-30

mock.gen('@date("y-M-d")'); //e.g: 3-5-30

mock.gen('@date("yyyy yy y MM M dd d")'); //e.g: 2023 23 3 05 5 30 30

```

### 时间日期类型

语法：@dateTime(format?)

示例：


```
mock.gen('@datetime("HH H hh h mm m ss s SS S A a T")'); 

//e.g: 15 15 03 3 55 55 57 57 SS S PM pm 1685433357830

```

@regex(reg?)
```
mock.gen('@regex("/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/")')

//e.g: 13902211321
```

@function(func)
```
const func = ()=>{
  let a = 1;
  return a++;
}
mock.gen('@function(func)');
```


## 模板格式

支持：
1. key值配置规则  如：aaa|1 to 10
2. value配置规则  如：@number(7,10)
3. 支持深层对象嵌套
4. 支持深层数组嵌套
```
mock.gen({
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
  "jjj": {
    "330000": "浙江省",
    "340000": "安徽省"
  },
  "kkk": '@object(1, 10)',
  "lll": '@idCard("CN")',
  "mmm": '@phoneNumber("US")',
  "nnn|2 to 4": [{
    "iii|2 to 4": {
      "310000": "@string(upper, 5)",
      "320000": "江苏省",
      "330000": "浙江省",
      "340000|2 to 4": {
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
});

e.g: {
  aaa: 21,
  bbb: 713,
  ccc: 7,
  ddd: 'MMIJJ',
  eee: '★★★',
  fff: 'OTFAY',
  ggg: true,
  hhh: {
    '310000': 'XCVWU',
    '320000': '江苏省',
    '330000': { '111': 'ZXPFW', '222': '江苏省', '333': '浙江省', '444': '安徽省' },
    '340000': [ { aa: 'xx', bb: 'yy', cc: 'zz' } ]
  },
  iii: {
    '310000': 'VGLVF',
    '320000': '江苏省',
    '330000': '浙江省',
    '340000': '安徽省'
  },
  lll: 110103200108160350,
  mmm: 7195592932,
  nnn: [
    {
      '111': 'QMXZH',
      '222': true,
      '333': 10,
      '444': 110101199712195760
    },
    {
      '111': 'QMXZH',
      '222': true,
      '333': 10,
      '444': 110101199712195760
    }
  ]
}
```

# ADD
mock.add(name, rule)

```
e.g: mock.add(email,emailRules= (type)=>)
base:
@email(type)

template:
{name: init,or @email}
```

