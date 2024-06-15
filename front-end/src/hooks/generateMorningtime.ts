export const useGenerateStartTime = (date: Date) => {
  const slots = [];
  const startTime = new Date(date);
  startTime.setHours(5, 30, 0, 0); // Set start time to 5:30 AM
  const endTime = new Date(date);
  endTime.setHours(22, 30, 0, 0); // Set end time to 10:30 PM

  // Generate slots from 5:30 AM to 10:30 PM
  while (startTime <= endTime) {
    slots.push(new Date(startTime));
    startTime.setMinutes(startTime.getMinutes() + 30);
  }

  return slots;
};
