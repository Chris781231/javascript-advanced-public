const getSecondsOfThisYearUntilNow = () => {
  const actualYear = new Date().getFullYear();
  return (new Date() - new Date(actualYear, 0, 1, 0, 0, 0)) / 1000;
};

export default getSecondsOfThisYearUntilNow;
