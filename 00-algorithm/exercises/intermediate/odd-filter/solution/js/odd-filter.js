const getOddEvenElements = (numericArray) => {
  const resultArray = [];
  numericArray.forEach((item) =>
    (item % 2 !== 0 ? resultArray.push(item) : null));
  return resultArray;
};

export default getOddEvenElements;
