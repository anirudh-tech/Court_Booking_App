import { formatTime } from "@/utils/formatTime";

export const useGenerateTimSlot = (date: Date, existArray: string[]) => {
  const slots: Date[] = [];
  const now = new Date();
  const isToday = now.toDateString() === date.toDateString();

  // Adjust the start time based on the current time and date
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
    // Check if the slot is not in the existArray before adding
    if (!existArray.includes(formatTime(startTime))) {
      slots.push(new Date(startTime));
    }

    startTime.setMinutes(startTime.getMinutes() + 30);
  }

  return slots;
};
// import { formatTime } from "@/utils/formatTime";

// export const useGenerateTimSlot = (date: Date, existArray: string[]) => {
//   const slots: Date[] = [];
//   const now = new Date();
//   const isToday = now.toDateString() === date.toDateString();

//   // Generate slots for the current day from 5:00 AM to 11:00 PM
//   const startTime = new Date(date);
//   startTime.setHours(5, 0, 0, 0);

//   const endTime = new Date(startTime);
//   endTime.setHours(23, 0, 0, 0);

//   const currentSlotTime = startTime;

//   // Generate slots from start time to end time
//   while (currentSlotTime <= endTime) {
//     if (!existArray.includes(formatTime(currentSlotTime))) {
//       slots.push(new Date(currentSlotTime));
//     }
//     currentSlotTime.setMinutes(currentSlotTime.getMinutes() + 30);
//   }

//   // If current time is after 11:00 PM, generate next day's slots
//   if (isToday && now.getHours() >= 23) {
//     const nextDayStartTime = new Date(date);
//     nextDayStartTime.setDate(nextDayStartTime.getDate() + 1); // Move to the next day
//     nextDayStartTime.setHours(0, 0, 0, 0);

//     const nextDayEndTime = new Date(nextDayStartTime);
//     nextDayEndTime.setHours(23, 0, 0, 0);

//     const nextSlotTime = nextDayStartTime;

//     // Generate next day's slots
//     while (nextSlotTime <= nextDayEndTime) {
//       if (!existArray.includes(formatTime(nextSlotTime))) {
//         slots.push(new Date(nextSlotTime));
//       }
//       nextSlotTime.setMinutes(nextSlotTime.getMinutes() + 30);
//     }
//   }

//   return slots;
// };
