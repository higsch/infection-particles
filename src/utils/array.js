export const uniqueDate = (datesArray) => {
  return datesArray.filter((date, i, arr) => {
    return arr.findIndex(d => d.getTime() === date.getTime()) === i;
  });
};