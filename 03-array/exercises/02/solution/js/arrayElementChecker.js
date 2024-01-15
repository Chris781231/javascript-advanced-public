const isEqual = (val1, val2) => val1 === val2;
const isNumber = (element) => typeof element === 'number';

const arrayElementChecker = (arr, searchedItem) => ({
  exists: arr.includes(searchedItem),
  index: arr.findIndex((item) => isEqual(item, searchedItem)),
  allElementsAreNumbers: arr.every((item) => isNumber(item)),
  someElementsAreNumbers: arr.some((item) => isNumber(item)),
});

export default arrayElementChecker;
