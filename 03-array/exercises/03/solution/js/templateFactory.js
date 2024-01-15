const templateFactory = (strArray) => {
  let result = '<ul>';
  strArray.forEach((text) => {
    result += `<li>${text}</li>`;
  });
  result += '</ul>';
  return result;
};

export default templateFactory;
