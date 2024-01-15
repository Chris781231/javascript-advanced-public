const objectsMerge = (...objects) => {
  const result = [];
  objects.forEach((obj) => {
    result.push(obj);
  });
  return { ...result };
};

export default objectsMerge;
