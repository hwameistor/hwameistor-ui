export type ByteUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB';

/**
 * 将单位为 byte 的数据，转换成 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB'
 * @param bytes {number|string} 将要转换的单位为 byte 的数据
 * @param targetUnit {string} 想要转换后的单位
 */
const bytesToUnit = (bytes?: number | string, targetUnit?: ByteUnit) => {
  let oldNum = Number(bytes);

  if (Number.isNaN(oldNum)) {
    oldNum = 0;
  }
  // 1024
  const unitsArr: ByteUnit[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

  const result = {
    value: 0,
    unit: unitsArr[0],
  };

  // 有特定的 单位
  if (targetUnit) {
    const idx = unitsArr.findIndex((u) => u === targetUnit);

    if (idx !== -1) {
      result.value = Number((oldNum / (1024 ** idx)).toFixed(2));
      result.unit = targetUnit;
    } else {
      result.value = Number((oldNum / 1024).toFixed(2));
      [, result.unit] = unitsArr;
    }

    return result;
  }

  for (let i = 0; i < unitsArr.length; i += 1) {
    if (oldNum < (1024 ** (i + 1))) {
      result.value = Number((oldNum / (1024 ** i)).toFixed(2));
      result.unit = unitsArr[i];

      return result;
    }
  }

  // 太大的，就转化为 最大的单位
  result.value = Number((oldNum / (1024 ** unitsArr.length)).toFixed(2));
  result.unit = unitsArr[unitsArr.length - 1];

  return result;
};

export const bytesToUnitDisplay = (bytes?: number | string, targetUnit?: ByteUnit) => {
  const res = bytesToUnit(bytes, targetUnit);

  return `${res.value} ${res.unit}`;
};

export default bytesToUnit;
