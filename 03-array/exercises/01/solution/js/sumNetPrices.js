const sumNetPrices = (numArray) => numArray.map((item) => item * 1.27)
  .reduce((prev, curr) => prev + curr);
export default sumNetPrices;
