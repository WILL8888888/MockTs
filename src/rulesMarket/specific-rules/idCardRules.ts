export default class IdCardRules {
  private country: string;
  private initData: SafeAny;
  constructor(country: string = 'CN', initData: number = 0) {
    this.country = country;
    this.initData = initData;
  }

  IdCardRandom() {
    //有initData直接返回默认值
    if (this.initData) return this.initData;
    if (!['CN', 'US'].includes(this.country)) throw new Error('Unsupported country');
    return [{
      rules: this.country === 'CN',
      action: () => {
        return this.generateChineseID()
      }
    }, {
      rules: this.country === 'US',
      action: () => {
        return this.generateUSID()
      }
    }].filter(item => item.rules)[0].action()
  }

  generateChineseID() {
    // 生成地址码
    const addressCode = this.generateAddressCode();

    // 生成出生日期码
    const birthdayCode = this.generateBirthdayCode();

    // 生成顺序码
    const sequenceCode = this.generateSequenceCode();

    // 计算校验码
    const checkCode = this.calculateChCheckCode(`${addressCode}${birthdayCode}${sequenceCode}`);

    // 拼接身份证号码
    return `${addressCode}${birthdayCode}${sequenceCode}${checkCode}`;
  }

  generateAddressCode() {
    // 假设有一个地址码列表，包含所有可能的地址码
    const addressCodes = ['110101', '110102', '110103', /* ... */];

    // 随机选择一个地址码
    const index = Math.floor(Math.random() * addressCodes.length);
    return addressCodes[index];
  }

  generateBirthdayCode() {
    // 生成一个18岁到70岁之间的随机日期
    const now = new Date();
    const minYear = now.getFullYear() - 70;
    const maxYear = now.getFullYear() - 18;
    const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1; // 假设所有月份都是28天

    // 格式化日期码
    const yearCode = year.toString().padStart(4, '0');
    const monthCode = month.toString().padStart(2, '0');
    const dayCode = day.toString().padStart(2, '0');

    return `${yearCode}${monthCode}${dayCode}`;
  }

  generateSequenceCode() {
    // 生成一个随机的顺序码，范围是000到999
    const sequence = Math.floor(Math.random() * 1000);
    return sequence.toString().padStart(3, '0');
  }

  calculateChCheckCode(id17: string) {
    // 计算校验码
    const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const codes = id17.split('');
    let sum = 0;
    for (let i = 0; i < codes.length; i++) {
      sum += parseInt(codes[i]) * weights[i];
    }
    const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    const checkCode = checkCodes[sum % 11];
    return checkCode;
  }

  generateUSID() {
    // 生成地区码
    const areaCode = this.generateAreaCode();

    // 生成组织机构码
    const orgCode = this.generateOrgCode();

    // 计算校验码
    const checkCode = this.calculateUSCheckCode(`${areaCode}${orgCode}`);

    // 拼接身份证号码
    return `${areaCode}${orgCode}${checkCode}`;
  }

  generateAreaCode() {
    // 假设有一个地区码列表，包含所有可能的地区码
    const areaCodes = ['001', '002', '003', /* ... */];

    // 随机选择一个地区码
    const index = Math.floor(Math.random() * areaCodes.length);
    return areaCodes[index];
  }

  generateOrgCode() {
    // 生成一个随机的组织机构码，范围是000到999
    const orgCode = Math.floor(Math.random() * 1000);
    return orgCode.toString().padStart(3, '0');
  }

  calculateUSCheckCode(id9: string) {
    // 计算校验码
    const weights = [7, 3, 1, 9, 7, 3, 1, 7, 3];
    const codes = id9.split('');
    let sum = 0;
    for (let i = 0; i < codes.length; i++) {
      sum += parseInt(codes[i]) * weights[i];
    }
    const checkCode = (10 - sum % 10) % 10;
    return checkCode.toString();
  }
}