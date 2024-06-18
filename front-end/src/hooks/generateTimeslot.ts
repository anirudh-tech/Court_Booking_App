export const useGenerateTimSlot =(date: Date) => {
  const slots = [];
  const now = new Date();
  const isToday = now.toDateString() === date.toDateString();

  // Check if it's today and the current time is after 11:00 PM
  if (isToday && now.getHours() >= 23) {
    now.setDate(now.getDate() + 1); // Move to the next day
    now.setHours(5, 0, 0, 0); // Set the time to 5:00 AM of the next day
  } else if (isToday && now.getHours() >= 0) {
    now.setMinutes(now.getMinutes() + (30 - (now.getMinutes() % 30)), 0, 0); // Start from the next half-hour mark
  } else {
    // For other days, start from 5:00 AM
    now.setHours(5, 0, 0, 0);
  }

  const startTime = isToday ? now : new Date(date.setHours(5, 0, 0, 0));
  const endTime = new Date(startTime);
  endTime.setHours(23, 0, 0, 0); // Set end time to 11:00 PM

  // Generate slots from start time to end time
  while (startTime <= endTime) {
    slots.push(new Date(startTime));
    startTime.setMinutes(startTime.getMinutes() + 30);
  }

  return slots;
};