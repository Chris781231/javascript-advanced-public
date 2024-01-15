const getSumOfTheElements = (arr) =>
  arr.reduce((prevValue, currentValue) => prevValue + currentValue);

const getAverageOfTheElements = (arr) => getSumOfTheElements(arr) / arr.length;

export { getSumOfTheElements, getAverageOfTheElements };
