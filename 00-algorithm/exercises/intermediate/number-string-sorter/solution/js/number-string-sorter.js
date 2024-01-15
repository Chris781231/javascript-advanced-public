const numberAndStringSorter = (arr) => {
  if (arr.length === 0) return;
  const numArray = [];
  const strArray = [];
  const result = [];
  arr.forEach((item) => {
    if (typeof item === 'number') numArray.push(item);
    if (typeof item === 'string') strArray.push(item);
  });
  numArray.forEach((item, index) => {
    result.push(...[item, strArray[index]]);
  });
  // eslint-disable-next-line consistent-return
  return result;
};

export default numberAndStringSorter;
