const searchAndCount = (numericArray, number) => {
  if (numericArray.length === 0 || !number) return undefined;
  let count = 0;
  // eslint-disable-next-line no-return-assign
  numericArray.forEach((item) => (item === number ? (count += 1) : null));
  return count;
};

export default searchAndCount;
