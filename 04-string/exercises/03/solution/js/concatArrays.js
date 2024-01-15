const mergeArrays = (arrays) => {
  const result = [];
  arrays.map((array) => result.push(...array));
  return result;
};

const removeDuplicates = (array) => {
  const result = [];
  array.map((item) =>
    (!result.some((resultItem) => resultItem === item) ? result.push(item) : null));
  return result;
};

const removeCharFrom = (array, char) => {
  const result = [];
  array.map((item) => (!item.includes(char) ? result.push(item) : null));
  return result;
};

const trimArrayItems = (array) => array.map((item) => item.trim());

const concatArrays = (char, ...strArrays) =>
  trimArrayItems(removeCharFrom(removeDuplicates(mergeArrays(strArrays)), char));

export default concatArrays;
