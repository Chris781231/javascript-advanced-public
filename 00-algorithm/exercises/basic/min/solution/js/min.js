const getTheSmallestElement = (arr) => {
  if (arr.length === 0) return undefined;

  let min = arr[0];
  // eslint-disable-next-line no-return-assign
  arr.forEach((item) => (item < min ? (min = item) : null));
  return min;
};

export default getTheSmallestElement;
