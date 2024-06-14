export const useGenerateTimSlot = (date: Date) => {
  const slots = [];
  const now = new Date();
  const isToday = now.toDateString() === date.toDateString();

  if (isToday) {
    // Start from the next half-hour mark
    now.setMinutes(now.getMinutes() + (30 - (now.getMinutes() % 30)), 0, 0);
  } else {
    // Start from 5:00 AM on other days
    now.setHours(5, 0, 0, 0);
  }

  const startTime = isToday ? now : new Date(date.setHours(5, 0, 0, 0));
  const endTime = new Date(startTime);
  endTime.setHours(22, 30, 0, 0); // Set end time to 10:30 PM

  // Generate slots until 10:30 PM or the next 12 hours from start time
  while (startTime <= endTime) {
    slots.push(new Date(startTime));
    startTime.setMinutes(startTime.getMinutes() + 30);
  }

  return slots;
};
