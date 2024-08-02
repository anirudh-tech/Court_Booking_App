import { Court } from "@/types/courtReducerInitial";
import { isWithinInterval } from "date-fns";

const parseTimeTo24HourFormat = (
  time: string
): { hours: number; minutes: number } => {
  const [timePart, modifier] = time?.split(" ");
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = timePart?.split(":").map(Number);

  if (modifier?.toUpperCase() === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier?.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
};

export const isSpecialTime = (selectedTime: string, court: Court): boolean => {
  const { hours: selectedHours, minutes: selectedMinutes } =
    parseTimeTo24HourFormat(selectedTime);
  const { hours: fromHours, minutes: fromMinutes } = parseTimeTo24HourFormat(
    String(court?.specialcost?.diff?.from)
  );
  const { hours: toHours, minutes: toMinutes } = parseTimeTo24HourFormat(
    String(court?.specialcost?.diff?.to)
  );

  const selectedDate = new Date(1970, 0, 1, selectedHours, selectedMinutes);
  const fromDate = new Date(1970, 0, 1, fromHours, fromMinutes);
  const toDate = new Date(1970, 0, 1, toHours, toMinutes);

  return isWithinInterval(selectedDate, { start: fromDate, end: toDate });
};
