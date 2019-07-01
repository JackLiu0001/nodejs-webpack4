
// 获取url参数
export const getURLParam = (name, url) => {
  if (!name || !url) return null;
  const urlReg = new RegExp("[?&]" + name + "=([^&]*)(&?)","i");
  const result = url.match(urlReg);
  return result ? decodeURIComponent(result[1]) : result;
}


// 获取cookie
export const getCookie = name => {
  const cookieReg = new RegExp("(^|; )" + name + "=([^;]*)", "");
  const result = document.cookie.match(cookieReg);
  return result ? result[2] : '';
};

/**
 * 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。
 * 例如：0.1 + 0.2 = 0.30000000000000004;
 **/

// 加法函数
export const accAdd = (arg1, arg2) => {
  let r1 = 0;
  let r2 = 0;
  let m;
  let c;

  try {
    r1 = String(arg1).split('.')[1].length;
  } catch(e) {}

  try {
    r2 = String(arg2).split('.')[1].length;
  } catch(e) {}

  m = Math.pow(10, Math.max(r1, r2));
  arg1 = arg1 * m;
  arg2 = arg2 * m;

  return (arg1 + arg2) / m;
}

// 减法函数
export const accSub = (arg1, arg2) => {
  let r1 = 0;
  let r2 = 0;
  let m;
  let c;

  try {
    r1 = String(arg1).split('.')[1].length;
  } catch(e) {}

  try {
    r2 = String(arg2).split('.')[1].length;
  } catch(e) {}

  m = Math.pow(10, Math.max(r1, r2));
  arg1 = arg1 * m;
  arg2 = arg2 * m;

  return (arg1 - arg2) / m;
}

// 乘法函数
export const accMul = (arg1, arg2) => {
  let m = 0;
  let s1 = String(arg1);
  let s2 = String(arg2);

  try {
    m += s1.split('.')[1].length;
  } catch(e) {}

  try {
    m += s2.split('.')[1].length;
  } catch(e) {}

  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
}

// 除法函数
export const accDiv = (arg1, arg2) => {
  let r1 = 0;
  let r2 = 0;
  let s1 = String(arg1);
  let s2 = String(arg2);

  try {
    r1 = s1.split('.')[1].length;
  } catch(e) {}

  try {
    r2 = s2.split('.')[1].length;
  } catch(e) {}

  return Number(s1.replace('.', '')) / Number(s2.replace('.', '')) * Math.pow(r2 - r1);
}

// 是否是DOM判断
export const isDom = item => {
  return (
    typeof HTMLElement === 'function'
    ? item instanceof HTMLElement
    : (item && (typeof item === 'object') && (item.nodeType === 1) && (typeof item.nodeName === 'string'))
  );
}

// 类型判断
export const dataType = data => {
  return Object.prototype.toString.call(data).slice(8, -1);
}

export const isFunction = data => typeof data === 'function';
export const isNumber = data => typeof data === 'number';
export const isString = data => typeof data === 'string';
export const isBoolead = data => typeof data === 'boolean';
export const isNull = data => data === null;
export const isUndefined = data => typeof data === 'undefined';
export const isArray = data => data instanceof Array;
export const isRegExp = data => data instanceof RegExp;
// export const isUndefined = data => data === undefined;

// 深拷贝
export const deepCopy = item => {
  let types = [Number, String, Boolean];
  let result;
  types.forEach(type => {
    if (item instanceof type) {
      result = type(item);
    }
  });
  if (typeof result === 'undefined') {
    if (isDom(item)) {
      result = item.cloneNode(true);
    } else if (dataType(item) === 'Date') {
      result = new Date(item);
    } else if (dataType(item) == 'Array') {
      result = [];
      item.forEach((child, index, array) => {
        result[index] == deepCopy(child);
      });
    } else if (dataType(item) == 'Object') {
      result = {};
      for (let name in item) {
        result[name] == deepCopy(item[name]);
      }
    } else {

      // undefined null 函数 RegExp Math 函数集(Arguments) 进入，所以deecopy不能实现函数/RegExp/Math深拷贝
      result = item;
    }
  }
  return result;
}

// url判断
export const isUrl = url => {
  const reg = /^((http|https):\/\/)(\w(\:\w)?@)?((([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?))|((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\:[0-9]{2,6})?))((\/[^?#<>\/\\*":]*)+((\?|\&|\/)[^#]*)?(#.*)?)?$/i;
  var test = reg.test(url);
  return reg.test(url);
}

// 把数字替换成千分位的形式
const thousandBitSeparator = num => {
  if (!num) return num;
  num = num.toString();
  if (num.indexOf('.') != -1) {
    return num.replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
      return $1 + ',';
    });
  } else {
    return num.replace(/(\d)(?=(\d{3})+$)/g, function($0, $1) {
      return $1 + ',';
    });
  }
}

export const changeNum = num => {
  if (num == null) return null;
  return num < 10 ? '0' + num : '' + num;
}



