export const formatDuration = (hours: number) => {
  const wholeHours = Math.floor(hours);
  const remainder = hours - wholeHours;
  const minutes = remainder * 60;

  if (minutes === 0) {
    return `${wholeHours} Hr`;
  } else if (minutes === 30) {
    return `${wholeHours} Hr 30 mins`;
  } else {
    return `${wholeHours} Hr ${minutes} mins`;
  }
};
