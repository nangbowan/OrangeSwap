import BigNumber from 'bignumber.js';


export const $BigNumber = (val: string | number = 1) => {
  return new BigNumber(val);
};

export const $shiftedBy = (data: number | string, decimals: number, acc = 0):number => {
  if (!data) return 0;
  // eslint-disable-next-line no-param-reassign
  decimals = Number(decimals);
  return Number($BigNumber(data).shiftedBy(decimals).toFixed(acc, 1));
};

export const $shiftedByFixed = (data: number, decimals: number) => {
  if (!data) return 0;
  // eslint-disable-next-line no-param-reassign
  decimals = Number(decimals);
  return $BigNumber(data).shiftedBy(decimals).toFixed();
};

export const $toFixed = (data: any, acc: number) => {
  if ((!data && Number(data) !== 0) || String(data).indexOf('--') !== -1) return '--';
  return Number($BigNumber(data).toFixed(acc, 1));
};

export const $clearNoNum = (val: any): any => {
  // eslint-disable-next-line no-param-reassign
  val = val.replace(/[^\d.]/g, '');

  // 保证只有出现一个.而没有多个.
  // eslint-disable-next-line no-param-reassign
  val = val.replace(/\.{2,}/g, '.');

  // 必须保证第一个为数字而不是.
  // eslint-disable-next-line no-param-reassign
  val = val.replace(/^\./g, '');

  // 保证.只出现一次，而不能出现两次以上
  // eslint-disable-next-line no-param-reassign
  val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');

  return val;
};

// input val filter   e: React.FormEvent<HTMLInputElement>
// eslint-disable-next-line @typescript-eslint/ban-types
export const $filterNumber = (e: any, setval: Function) => {
  function clearNoNum(val: any) {
    // 先把非数字的都替换掉，除了数字和.
    // eslint-disable-next-line no-param-reassign
    val = val.replace(/[^\d.]/g, '');

    // 保证只有出现一个.而没有多个.
    // eslint-disable-next-line no-param-reassign
    val = val.replace(/\.{2,}/g, '.');

    // 必须保证第一个为数字而不是.
    // eslint-disable-next-line no-param-reassign
    val = val.replace(/^\./g, '');

    // 保证.只出现一次，而不能出现两次以上
    // eslint-disable-next-line no-param-reassign
    val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');

    return val;
  }
  
  // eslint-disable-next-line no-unused-expressions
  setval && setval(clearNoNum(e.currentTarget.value));
};

export const $numFormat = (val: number | string, acc = 4, flag = true) => {
  if (!val || val.toString().indexOf('-') !== -1) {
    return val;
  } if (!flag) {
    return $BigNumber(val).toFixed(acc, 1);
  }

  const reg = /(\d)(?=(?:\d{3})+$)/g;
  // eslint-disable-next-line no-param-reassign
  val = $BigNumber(val).toFixed(acc, 1);
  const strAry = val.toString().split('.');
  return `${strAry[0].replace(reg, '$1,')}${strAry.length > 1 ? `.${  strAry[1]}` : ''}`;
};

export const $dateFormat = (date: string | undefined | Date, format = 'MM-dd hh:mm') => {
  if (!date) return '';
  return (new Date(date) as any).format(format);
};

export const $gt = (val: string | number, next: string | number) => {
  return new BigNumber(val).gt(next);
};

export const $lt = (val: string | number, next: string | number) => {
  return new BigNumber(val).lt(next);
};

export const $plus = (aryNumber: Array<string | number>, decimal = 2): number => {
  const sum: any = aryNumber.reduce((acc: any, cur: any) => {
    // eslint-disable-next-line no-restricted-globals
    return (new BigNumber(isNaN(acc) ? 0 : acc) as any).plus(isNaN(cur) ? 0 : cur);
  });
  return Number(sum.toFixed(decimal, 1));
};

export const $minus = (m1: string | number, m2: string | number, decimal = 2): number => {
  const diff: any = new BigNumber(m1).minus(m2);
  return Number(diff.toFixed(decimal, 1));
};

export const $inputNumber = (): string => {
  return window.innerWidth < 960 ? 'number' : 'text';
};

export const $moreLessThan = (value: string | number, acc = 4) => {
  const val = $BigNumber(value);
  return !val.isZero() && val.isLessThan(0.0001)
    ? '< 0.0001'
    : val.isNaN()
    ? value
    : Number(val.toFormat(acc));
};

export const $hash = (txHash: any, length = 4, lastLength?: number) => {
  if (!txHash) {
    return '--';
  }
  // eslint-disable-next-line no-param-reassign
  if (!lastLength) lastLength = length;
  return (
    `${txHash.substring(0, length) 
    }...${ 
    txHash.substring(txHash.length - lastLength, txHash.length)}`
  );
};

export const $enumKey = (
  list: { [key: string]: string | number }[],
  value: string | number,
  target = 'name',
  key = 'key'
): string | number => {
  if (!value && ![0, '0'].includes(value)) return '';
  const _tar = list.find((item) => item[key] === value);
  return _tar[target] || '';
};


export const $trim = (event): string | number => {
  return event.target.value.trim();
};

export const $trimNumber = (event): string | number => {
  // eslint-disable-next-line no-useless-escape
  return event.target.value.replace(/[^\d^\.]+/g, '').trim();
};
