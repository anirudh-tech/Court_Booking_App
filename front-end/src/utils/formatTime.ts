export const formatTime = (date: Date) => {
  console.log("🚀 ~ file: formatTime.ts:2 ~ formatTime ~ date:", date)
  const hours = date?.getHours();
  const minutes = date?.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};
