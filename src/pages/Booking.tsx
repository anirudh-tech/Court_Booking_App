import { useGenerateTimSlot } from "@/hooks/generateTimeslot";
import { cn } from "@/lib/utils";
import { Button } from "@/shadcn/ui/button";
import { Calendar } from "@/shadcn/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { formatDuration } from "@/utils/formatDuration";
import { formatTime } from "@/utils/formatTime";
import { formatEndTimeWithDuration } from "@/utils/getEndTime";
import { addDays, format, isBefore } from "date-fns";
import { CalendarIcon, Clock, Minus, Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export function Booking() {
  const [date, setDate] = React.useState<Date>();
  const isDateDisabled = (day: Date): boolean => {
    return isBefore(day, addDays(new Date(), -1));
  };
  useEffect(() => {
    setDate(new Date());
  }, []);
  const timeSlots = useGenerateTimSlot(date ? date : new Date());
  const [time, SetSelectedTime] = useState<Date>();
  useEffect(() => {
    SetSelectedTime(timeSlots[0]);
  }, []);

  const popoverCloseRef = useRef<HTMLButtonElement>(null);
  const [hours, setHours] = useState(1); // Initial duration is 1 hour
  const incrementDuration = () => {
    if (hours < 20) {
      // Maximum duration limit
      setHours(hours + 0.5); // Increment by half an hour
    }
  };

  const decrementDuration = () => {
    if (hours > 1) {
      // Minimum duration limit
      setHours(hours - 0.5); // Decrement by half an hour
    }
  };

  return (
    <main className="w-full h-screen flex  justify-center items-start">
      <div className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-[38%]  mt-3 border rounded-md shadow-sm ">
        <div className="w-full flex flex-col p-3 ">
          <div className="w-full">
            <h1 className="font-semibold text-[#6c6c6c] text-[18px]">
              Lal Sports academy
            </h1>
          </div>
          <div>
            <span className="text-[13px] text-[#6c6c6c]">Chennai</span>
          </div>
        </div>
        <div className="h-10 w-full flex items-center justify-center bg-custom-gradient text-white text-[13px]">
          Book a court
        </div>
        <div className="w-full flex flex-col px-3 py-5 gap-8">
          <div className="w-full flex justify-between h-10 items-center">
            <label htmlFor="">Select Sports</label>
            <Select>
              <SelectTrigger className="sm:w-64 w-52 outline-none ring-0">
                <SelectValue placeholder="🍳 Select sports" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full flex justify-between h-10 items-center">
            <label htmlFor="">Select Courts</label>
            <Select>
              <SelectTrigger className="sm:w-64 w-52 outline-none ring-0">
                <SelectValue placeholder="🥅 Select a court" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full flex justify-between h-10 items-center">
            <label htmlFor="" className="capitalize">
              Select date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "sm:w-64 w-52 justify-start text-left font-normal",
                    !date && "text-muted-foreground "
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={isDateDisabled}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-full flex justify-between h-10 items-center">
            <label htmlFor="">Start Time</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  ref={popoverCloseRef}
                  className={cn(
                    "sm:w-64 w-52 justify-start text-left font-normal",
                    !date && "text-muted-foreground "
                  )}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {time ? formatTime(time) : <span>Pick a time</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 max-h-64 overflow-x-hidden overflow-y-auto">
                <div className="w-64 h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-1">
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time, Idx) => (
                      <div
                        key={Idx}
                        role="button"
                        onClick={() => {
                          SetSelectedTime(time);
                          popoverCloseRef.current?.click();
                        }}
                        className="h-10 rounded-md cursor-pointer hover:bg-[#4cd681] transition-all duration-200 w-full flex items-center justify-center text-[13px] border"
                      >
                        {formatTime(time)}
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-full flex justify-between h-10 items-center">
            <label htmlFor="">Duration</label>
            <div className="sm:w-64 w-52 h-10  rounded-md flex justify-between items-center">
              <div
                onClick={decrementDuration}
                className={`size-9 flex justify-center items-center rounded-full cursor-pointer ${
                  hours <= 1
                    ? "pointer-events-none bg-slate-300 border"
                    : "bg-custom-gradient"
                }  text-white transition-all duration-200`}
              >
                <Minus className="w-5" />
              </div>
              <span className="text-[13px] font-semibold">
                {formatDuration(hours)}
              </span>
              <div
                onClick={incrementDuration}
                className={`size-9 flex justify-center items-center rounded-full cursor-pointer ${
                  hours >= 20
                    ? "pointer-events-none bg-slate-300 border"
                    : "bg-custom-gradient"
                }  text-white transition-all duration-200`}
              >
                <Plus className="w-5" />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between h-10 items-center">
            <label htmlFor="">End time</label>
            <div className="sm:w-64 w-52 h-10  rounded-md flex justify-start gap-2 items-center border px-4 pointer-events-none">
              <Clock className="w-4" />{" "}
              <span className="text-[13px]">
                {formatEndTimeWithDuration(time ? time : new Date(), hours)}
              </span>
            </div>
          </div>
          <div className="w-full h-12 flex items-center justify-center bg-custom-gradient rounded-md text-white" role="button">
            Proceed to payment
          </div>
        </div>
      </div>
    </main>
  );
}
