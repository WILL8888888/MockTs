# MOCK

# Base
number: @number(min, max, init)
```
mock.gen('@number()'); e.g: 223413;

mock.gen('@number'); e.g: 223413;

mock.gen('@number(4, 10)') ;e.g: 8 

mock.gen('@number(10)'); e.g: -12211

mock.gen('@number(6, 6)'); e.g: 6
```

string: @string(pool, min ,max)

```
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

boolean: @boolean(odds?)
```
mock.gen('@boolean()'); e.g: true

mock.gen('@boolean'); e.g: true

mock.gen('@boolean(0.7)'); e.g: true
```
range: @range(start ,step, stop)
```
mock.gen('@range'); //e.g: []
mock.gen('@range()'); //e.g: []
mock.gen('@range(3, 7)'); //e.g: [ 3, 4, 5, 6 ]
mock.gen('@range(1, 10, 2)'); //e.g: [ 1, 3, 5, 7, 9 ]
```

object: @object(min, max, pool)

```
mock.gen('@object'); //e.g: { kubtb: 'BUGPY' }
mock.gen('@object()'); //e.g: { tubb: 'NOYK' }
mock.gen('@object(1, 10)'); //e.g: { kmpjmp: 'KSZSDAA', mcty: 'ZUL', vxvbih: 'EZHETUD', lsj: 'XDU' }
mock.gen('@object(2, 10, {"310000": "上海市", "320000": "江苏省", "330000": "浙江省", "340000": "安徽省"})'); //e.g: { '320000': '江苏省', '340000': '安徽省' }
```

time: @time(format?)

```
mock.gen('@time'); //e.g: 15:53:51

mock.gen('@time()'); //e.g: 15:53:51

mock.gen('@time("A HH:mm:ss")'); //e.g: PM 15:53:51

mock.gen('@time("a HH:mm:ss")'); //e.g: pm 15:53:51

mock.gen('@time("HH:mm:ss")'); //e.g: 15:53:51

mock.gen('@time("H:m:s")'); //e.g: 15:53:51
```

@date: @date(format?)

```
mock.gen('@date'); //e.g: 2023-05-30

mock.gen('@date()'); //e.g: 2023-05-30

mock.gen('@date("yyyy-MM-dd")'); //e.g: 2023-05-30

mock.gen('@date("yy-MM-dd")'); //e.g: 23-05-30

mock.gen('@date("y-MM-dd")'); //e.g: 3-05-30

mock.gen('@date("y-M-d")'); //e.g: 3-5-30

mock.gen('@date("yyyy yy y MM M dd d")'); //e.g: 2023 23 3 05 5 30 30

```

@dateTime: @dateTime(format?)

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


# Template

```
mock.gen({
  "aaa|1-10": '@number(7,10)',
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
  "nnn|2": {
    "iii|2": {
    "310000": "上海市",
    "320000": "江苏省",
    "330000": "浙江省",
    "340000": "安徽省"
    },
    "xxx|1": {
    "310000": "上海市",
    "320000": "江苏省",
    "330000": "浙江省",
    "340000": "安徽省"
    },
  }
  "kkk": '@object(1, 10)',
  "lll": '@idCard("CN")',
  "mmm": '@phoneNumber("US")',
  zzz|1-10: [
    {
      "list|+1": [
        "aaa",
        "bbb",
        "ccc"
      ]
    }
  ]
});

e.g: {
  aaa: 22,
  bbb: 713,
  ccc: 10,
  ddd: 'BBAATBTBT',
  eee: '★★★',
  fff: 'KEGRZ',
  ggg: true,
  hhh: { '320000': '江苏省', '330000': '浙江省', '340000': '安徽省' },
  iii: { '330000': '浙江省', '340000': '安徽省' },
  jjj: { '330000': '浙江省', '340000': '安徽省' },
  nnn: {
    iii: {
      "310000": "上海市",
        "320000": "江苏省"
      },
    xxx: {
      "310000": "上海市"
    },
  }
  kkk: {
    pwqmgql: 'WXM',
    jxp: 'GCE',
    fsktx: 'DLNNNP',
    rlaufhj: 'MCOG',
    lxib: 'PXNMDZI',
    sjfrha: 'UFY',
    zmstw: 'NJR'
  },
  lll: 110102198411279870,
  mmm: 5043268942,
  zzz: [{
        "list": "aaa"
        }, {
          "list": "bbb"
      }]
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

