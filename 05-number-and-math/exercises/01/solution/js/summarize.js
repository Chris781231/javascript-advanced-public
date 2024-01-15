const summarize = (...nums) => {
  let sum = 0;

  nums.forEach((value) => {
    if (value % 1 === 0) {
      let temp;
      if (typeof sum === 'bigint') {
        temp = BigInt(value);
      } else if (value > Number.MAX_SAFE_INTEGER || sum + value > Number.MAX_SAFE_INTEGER) {
        temp = BigInt(value);
        sum = BigInt(sum);
      } else {
        temp = value;
      }
      sum += temp;
    }
  });

  return sum;
};

export default summarize;
