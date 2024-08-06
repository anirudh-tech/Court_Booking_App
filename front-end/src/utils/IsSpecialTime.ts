import { Court } from "@/types/courtReducerInitial";
import { isWithinInterval } from "date-fns";

const parseTimeTo24HourFormat = (
  time: string
): { hours: number; minutes: number } => {
  console.log(time,"selected time in parsetime function")
  const [timePart, modifier] = time?.split(" ");
  console.log(timePart,modifier,"timepart modifier")
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = timePart?.split(":")?.map(Number);

  if (modifier?.toUpperCase() === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier?.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
};

export const isSpecialTime = (selectedTime: string, court: Court): boolean => {
  console.log(court,selectedTime,"coutr in special");
  
  const { hours: selectedHours, minutes: selectedMinutes } =
  parseTimeTo24HourFormat(selectedTime);
  console.log(selectedHours,selectedMinutes,"coutr in special sel min hou");
  const { hours: fromHours, minutes: fromMinutes } = parseTimeTo24HourFormat(
    String(court?.specialcost?.diff?.from)
  );
  console.log(fromHours,fromMinutes,"coutr in special sel from hm");
  const { hours: toHours, minutes: toMinutes } = parseTimeTo24HourFormat(
    String(court?.specialcost?.diff?.to)
  );
  console.log(toHours,toMinutes,"coutr in special sel to hm");

  const selectedDate = new Date(1970, 0, 1, selectedHours, selectedMinutes);
  const fromDate = new Date(1970, 0, 1, fromHours, fromMinutes);
  const toDate = new Date(1970, 0, 1, toHours, toMinutes);

  return isWithinInterval(selectedDate, { start: fromDate, end: toDate });
};
