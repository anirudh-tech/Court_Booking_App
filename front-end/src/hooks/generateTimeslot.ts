export const useGenerateTimSlot =(date: Date) => {
  const slots = [];
  const now = new Date();
  const isToday = now.toDateString() === date.toDateString();

  if (isToday) {
    if (now.getHours() >= 23) {
      // If it's today and after 11:00 PM, use the next day
      now.setDate(now.getDate() + 1);
      now.setHours(5, 0, 0, 0);
    } else if (now.getHours() >= 0 && now.getHours() < 5) {
      // If it's today and before 5:00 AM, start from 5:00 AM today
      now.setHours(5, 0, 0, 0);
    } else {
      // Start from the next half-hour mark
      now.setMinutes(now.getMinutes() + (30 - (now.getMinutes() % 30)), 0, 0);
    }
  } else {
    // Start from 5:00 AM on other days
    now.setHours(5, 0, 0, 0);
  }

  const startTime = isToday ? now : new Date(date.setHours(5, 0, 0, 0));
  const endTime = new Date(date);
  endTime.setHours(23, 0, 0, 0); // Set end time to 11:00 PM

  // Generate slots until 11:00 PM
  while (startTime <= endTime) {
    slots.push(new Date(startTime));
    startTime.setMinutes(startTime.getMinutes() + 30);
  }

  return slots;
};
