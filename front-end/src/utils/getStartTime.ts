export function getStartTime(date: Date): Date {
  const startTime = new Date(date);
  startTime.setHours(5, 30, 0, 0); // Set the time to 5:30 AM
  return startTime;
}
