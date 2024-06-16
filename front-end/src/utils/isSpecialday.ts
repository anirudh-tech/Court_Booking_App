import { Court } from "@/types/courtReducerInitial";
import { getDay } from "date-fns";

export const isSpecialDay = (selectedDate: Date, court: Court): boolean => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const fromDayIndex = daysOfWeek.indexOf(String(court?.specialcost?.diff?.from));
  const toDayIndex = daysOfWeek.indexOf(String(court?.specialcost?.diff?.to));
  const selectedDayIndex = getDay(selectedDate); // Get the day index from the Date object

  // Handle case when the range spans across the end of the week
  if (fromDayIndex <= toDayIndex) {
    return selectedDayIndex >= fromDayIndex && selectedDayIndex <= toDayIndex;
  } else {
    return selectedDayIndex >= fromDayIndex || selectedDayIndex <= toDayIndex;
  }
};
