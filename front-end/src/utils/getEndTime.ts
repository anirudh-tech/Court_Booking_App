export function getEndTimeWithDuration(
  startTime: Date,
  durationHours: number
): Date {
  const endTime = new Date(startTime);
  endTime.setHours(startTime.getHours() + Math.floor(durationHours));
  endTime.setMinutes(
    startTime.getMinutes() + Math.round((durationHours % 1) * 60)
  );
  return endTime;
}

export function formatTime(date: Date): string {
  const hours = date?.getHours();
  const minutes = date?.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

export function formatEndTimeWithDuration(
  startTime: Date,
  durationHours: number
): string {
  const endTime = getEndTimeWithDuration(startTime, durationHours);
  console.log("🚀 ~ endTime:", endTime)
  return formatTime(endTime);
}
