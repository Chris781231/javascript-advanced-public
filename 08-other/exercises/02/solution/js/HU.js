const HU = {
  date(dateParam) {
    return new Intl.DateTimeFormat('hu-HU').format(dateParam);
  },
  currency(value) {
    return new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF' }).format(value);
  },
  list(strArr) {
    return strArr.reduce((previousValue, currentValue, currentIndex) =>
      (currentIndex === strArr.length - 1 ? `${previousValue} és ${currentValue}` : `${previousValue}, ${currentValue}`));
  },
};

export default HU;
