const cutTime = (date) => {
  date.setMinutes(0);
  date.setSeconds(0);
  date.setHours(0);
  date.setMilliseconds(0);
  return date;
};

const countOfWorkingDays = (startDate, endDate) => {
  if (startDate > endDate) throw new Error('The first parameter is earlier date, than second!');

  const currentDate = cutTime(startDate);
  const cuttedEndDate = cutTime(endDate);
  let workdaysCount = 0;

  while (currentDate <= cuttedEndDate) {
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 1) workdaysCount += 1;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return workdaysCount;
};

export default countOfWorkingDays;
