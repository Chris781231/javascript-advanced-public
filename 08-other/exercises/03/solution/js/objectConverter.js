const objectConverter = {
  arrayToMap(arr) {
    const result = new Map();
    arr.forEach((value, index) => {
      result.set(index, value);
    });
    return result;
  },
  arrayToSet(arr) {
    return new Set(arr);
  },
  setToMap(set) {
    return this.arrayToMap(this.setToArray(set));
  },
  setToArray(set) { return [...set]; },
  mapToArray(map) {
    const result = [];
    map.forEach((value) => result.push(value));
    return result;
  },
  mapToSet(map) {
    const result = new Set();
    map.forEach((value) => result.add(value));
    return result;
  },
};

export default objectConverter;
