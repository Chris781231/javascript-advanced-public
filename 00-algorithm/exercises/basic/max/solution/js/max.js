const getTheLargestElement = (arr) => {
  if (arr.length === 0) return undefined;
  let max = arr[0];
  // eslint-disable-next-line no-return-assign
  arr.forEach((item) => (item > max ? (max = item) : null));
  return max;
};

export default getTheLargestElement;
