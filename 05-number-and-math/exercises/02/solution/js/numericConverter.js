const numericConverter = (num) => ({
  binary: num.toString(2),
  octal: num.toString(8),
  hexa: num.toString(16),
});

export default numericConverter;
