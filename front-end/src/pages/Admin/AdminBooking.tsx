/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoaderButton } from "@/components/custom/LoaderButton";
import { axiosInstance } from "@/constants/axiosInstance";
import { useGenerateTimSlot } from "@/hooks/generateTimeslot";
import { cn } from "@/lib/utils";
import { listAlsports } from "@/redux/actions/sportAcion";
import { AppDispatch, RootState } from "@/redux/store";
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
import { Court } from "@/types/courtReducerInitial";
import { formatDuration } from "@/utils/formatDuration";
import { formatTime } from "@/utils/formatTime";
import { formatEndTimeWithDuration } from "@/utils/getEndTime";
import { parseTime } from "@/utils/stringToTIme";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format, isBefore, startOfDay } from "date-fns";
import { CalendarIcon, Clock, Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export function AdminBooking() {
  const isDateDisabled = (day: Date): boolean => {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 23) {
      // After 11:00 PM, start disabling from the next day
      const nextDay = addDays(startOfDay(now), 1);
      return isBefore(day, nextDay);
    } else {
      // Otherwise, disable all dates before today
      const today = startOfDay(now);
      return isBefore(day, today);
    }
  };

  

  const [defaultSport, setDefaultSport] = useState<string | undefined>();
  useEffect(() => {
    const searchParam = new URLSearchParams(window.location.search);
    const sportId = searchParam.get("spId");
    const sport = searchParam.get("sport");
    if (sportId) {
      setValue("sport", sportId);
    }
    if (sportId && sport) {
      setDefaultSport(`${sport}`);
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
    setValue("startTime", formatTime(timeSlots[0]));
  }, []);

  const popoverCloseRef = useRef<HTMLButtonElement>(null);

  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [submitionLoad, setSubmitionLoad] = useState<boolean>(false);
  const handleBooking = async (values: z.infer<typeof bookingSchema>) => {
    try {
      if (
        bookedSlots.includes(
          formatEndTimeWithDuration(
            values.startTime
              ? parseTime(values.startTime as string)
              : new Date(),
            values.duration
          )
        )
      ) {
        return toast.error(
          "This time duration already booked Please select other time"
        );
      }
      values;
      setSubmitionLoad(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const valueCopy = { ...values } as any;
      valueCopy.endTime = formatEndTimeWithDuration(
        parseTime(values.startTime as string),
        values.duration
      );
      valueCopy.courtId = values.court;
      valueCopy.userId = String(user?._id);
      const { data: bookingData } = await axiosInstance.post(
        `/book-court`,
        valueCopy
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log(bookingData, "booking data ------------->")
      if(bookingData.status === true){
        // reset({
        //     sport: "",
        //     court: "",
        //     // startTime: formatTime(timeSlots[0]),
        //     duration: 1,
        //     date: new Date(),
        //   });
      
          toast.success("Booking added successfully!");
          window.location.reload()
      } else {
        toast.error("Failed to book the court")
      }

      setSubmitionLoad(false);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSubmitionLoad(false);
    }
  };

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(listAlsports());
  }, [dispatch]);
  const { sports } = useSelector((state: RootState) => state.sport);
  const bookingSchema = z.object({
    sport: z.string().nonempty(),
    court: z.string().nonempty(),
    startTime: z.string(),
    duration: z.number(),
    date: z.date(),
  });
  const {
    handleSubmit,
    trigger,
    watch,
    setValue,
    getValues,
    formState: { errors },
    reset
  } = useForm<z.infer<typeof bookingSchema>>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      sport: "",
      court: "",
      duration: 1,
    },
  });

  const incrementDuration = () => {
    const currentDuration = getValues("duration");
    if (currentDuration < 20) {
      const newDuration = currentDuration + 0.5;
      setValue("duration", newDuration); 
      trigger("duration");
    }
  };

  const decrementDuration = () => {
    const currentDuration = getValues("duration");
    if (currentDuration > 1) {
      // Minimum duration limit
      const newDuration = currentDuration - 0.5;
      setValue("duration", newDuration); // Decrement by half an hour
      trigger("duration");
    }
  };

  const [courts, setCourts] = useState<Court[]>([]);
  const [localLoad, setLocalLoad] = useState<boolean>(false);
  useEffect(() => {
    if (watch("sport")) {
      setLocalLoad(true);

      axiosInstance
        .post(`/getcourt-withsport`, { sportId: watch("sport") })
        .then((res) => {
          setCourts(res.data.courts);
        })
        .finally(() => setLocalLoad(false));
    }
  }, [watch("sport")]);


  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 23) {
      // If it's after 11:00 PM, set the date to the next day
      const nextDay = new Date(now);
      nextDay.setDate(now.getDate() + 1);
      setValue("date", nextDay);
    } else {
      // Otherwise, set it to the current date
      setValue("date", now);
    }
  }, [setValue]);

  const [bookedSlots, setBookedSlot] = useState<string[]>([]);

  const adjustDateIfNeeded = (date) => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    // If the current time is after 11:00 PM, adjust the date to the next day
    if (currentHour >= 23) {
      const adjustedDate = new Date(date);
      adjustedDate.setDate(adjustedDate.getDate() + 1);
      return adjustedDate;
    }

    return date;
  };
  const timeSlots = useGenerateTimSlot(
    watch("date") ? watch("date") : adjustDateIfNeeded(new Date()),
    bookedSlots ? bookedSlots : []
  );
  useEffect(() => {
    if (watch("date") && watch("court")) {
      axiosInstance
        .post("/booked-slots", {
          date: watch("date"),
          courtId: watch("court"),
        })
        .then((res) => {
          setBookedSlot(res.data.data);
        })
        .catch((err: any) => {
          toast.error(err.message);
        })
        .finally(() => {
          setValue("startTime", formatTime(timeSlots[0]));
        });
    }
  }, [watch("court"), watch("date")]);

  useEffect(() => {
    setValue("startTime", formatTime(timeSlots[0]));
  }, [bookedSlots]);



  const handleReset = () => {
    reset({
      duration: 1,
      startTime: formatTime(timeSlots[0]),
      date: new Date(),
    });
  };

  const handleCourtReset = () => {
    const sportValue = getValues("sport");
    handleReset(); // This resets the entire form
    setValue("sport", sportValue); // Restore the sport field value
  };

  return (
    <main className="w-full min-h-screen flex  justify-center items-center text-[15px] ">
      <form
        className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-[38%]  border rounded-md shadow-sm "
        onSubmit={handleSubmit(handleBooking)}
      >
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
        <div className="w-full flex flex-col px-3 py-5 gap-4">
          <div className="w-full flex justify-between min-h-10 sm:items-center flex-col sm:flex-row items-start">
            <label htmlFor="">Select Sports</label>
            <div className="flex flex-col w-full sm:w-auto ">
              <Select
                onValueChange={(value) => {
                  handleReset();
                  setDefaultSport(undefined);
                  setValue("sport", value);
                  setValue("court", "");
                  trigger("sport");
                  trigger("court");
                }}
              >
                <SelectTrigger className="sm:w-64 w-full outline-none ring-0">
                  <SelectValue
                    placeholder={
                      !defaultSport ? (
                        <>
                          <div>🍳 Select sports</div>
                        </>
                      ) : (
                        <>
                          <div className="flex gap-4 py-1 ">
                            <img
                              src={defaultSport?.split("[(*)]")[1]}
                              className="w-5"
                              alt=""
                            />
                            <span>{defaultSport?.split("[(*)]")[0]}</span>
                          </div>
                        </>
                      )
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {sports?.map((sport) => (
                    <SelectItem
                      key={String(sport?._id)}
                      value={String(sport._id)}
                      onSelect={handleReset}
                    >
                      <div className="flex gap-4 py-1 ">
                        <img src={sport.image} className="w-5" alt="" />
                        <span>{sport.sportName}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div>
                {errors && errors.sport && errors.sport.message && (
                  <>
                    <span className="text-[12px] text-red-600">
                      {errors.sport.message}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between min-h-10  sm:items-center flex-col sm:flex-row">
            <label htmlFor="">Select Courts</label>
            <div className="flex flex-col sm:w-auto w-full ">
              <Select
                disabled={!courts || courts.length <= 0}
                onValueChange={(value) => {
                  handleCourtReset()
                  setValue("court", value);
                  trigger("court");
                }}
              >
                <SelectTrigger
                  className={`sm:w-64 w-full outline-none ring-0 ${!courts || (courts.length <= 0 && "pointer-events-none")
                    } `}
                >
                  <SelectValue
                    placeholder={
                      <div>
                        {localLoad ? (
                          <>
                            <span>
                              Loading <span className="animate-pulse">...</span>
                            </span>
                          </>
                        ) : (
                          "🥅 Select a court"
                        )}
                      </div>
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {courts.map((court) => (
                    <SelectItem value={String(court?._id)} key={court?._id}>
                      {court.courtName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div>
                {errors && errors.court && errors.court.message && (
                  <>
                    <span className="text-[12px] text-red-600">
                      {errors.court.message}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between min-h-10 sm:items-center sm:flex-row flex-col">
            <label htmlFor="" className="capitalize">
              Select date
            </label>
            <div className="flex flex-col sm:w-auto w-full">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    disabled={!watch("court") || watch("court") == ""}
                    variant={"outline"}
                    className={cn(
                      "sm:w-64 w-full justify-start text-left font-normal",
                      !watch("date") && "text-muted-foreground "
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {watch("date") ? (
                      format(watch("date"), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={watch("date")}
                    onSelect={(date) => {
                      date && setValue("date", date);
                    }}
                    disabled={isDateDisabled}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors && errors.date && errors.date.message && (
                <>
                  <span className="text-[12px] text-red-600">
                    {errors.date.message}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="w-full flex justify-between min-h-10 sm:items-center sm:flex-row flex-col">
            <label htmlFor="">Start Time</label>
            <div className="flex flex-col w-full sm:w-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    disabled={!watch("court")}
                    variant={"outline"}
                    ref={popoverCloseRef}
                    className={cn(
                      "sm:w-64 w-full justify-start text-left font-normal",
                      !watch("date") && "text-muted-foreground "
                    )}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {watch("startTime") ? (
                      watch("startTime")
                    ) : (
                      <span>Pick a time</span>
                    )}
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
                            setValue("startTime", formatTime(time));
                            popoverCloseRef.current?.click();
                          }}
                          className={`h-10 rounded-md cursor-pointer hover:bg-[#4cd681] transition-all duration-200 w-full flex items-center justify-center text-[13px] border ${bookedSlots.includes(formatTime(time)) &&
                            "pointer-events-none bg-green-700 text-white relative"
                            }`}
                        >
                          {formatTime(time)}
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              {errors && errors.startTime && errors.startTime.message && (
                <>
                  <span className="text-[12px] text-red-600">
                    {errors.startTime.message}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="w-full flex justify-between min-h-10 sm:items-center sm:flex-row flex-col">
            <label htmlFor="">Duration</label>
            <div
              className="sm:w-64 w-full h-10  rounded-md flex justify-between items-center"
              onClick={() => {
                if (!watch("court")) {
                  return toast.error("Please selecte court and sports");
                }
              }}
            >
              <button
                type="button"
                onClick={decrementDuration}
                className={`size-9 flex justify-center items-center rounded-full cursor-pointer ${!watch("court") && "pointer-events-none"
                  } ${watch("duration") <= 1
                    ? "pointer-events-none bg-slate-300 border"
                    : "bg-custom-gradient"
                  }  text-white transition-all duration-200`}
              >
                <Minus className="w-5" />
              </button>

              <span className="sm:text-[13px] font-semibold">
                {formatDuration(watch("duration"))}
              </span>
              <button
                type="button"
                onClick={incrementDuration}
                className={`size-9 flex justify-center items-center rounded-full cursor-pointer ${!watch("court") && "pointer-events-none"
                  } ${watch("duration") >= 20
                    ? "pointer-events-none bg-slate-300 border"
                    : "bg-custom-gradient"
                  }  text-white transition-all duration-200`}
              >
                <Plus className="w-5" />
              </button>
            </div>
          </div>
          <div className="w-full flex justify-between min-h-10 sm:items-center sm:flex-row flex-col">
            <label htmlFor="">End time</label>
            <div className="sm:w-64 w-full h-10  rounded-md flex justify-start gap-2 items-center border px-4 pointer-events-none">
              <Clock className="w-4" />{" "}
              <span className="text-[13px]">
                {formatEndTimeWithDuration(
                  watch("startTime")
                    ? parseTime(watch("startTime") as string)
                    : new Date(),
                  watch("duration")
                )}
              </span>
            </div>
          </div>
          <LoaderButton
            type="submit"
            loading={submitionLoad}
            // onClick={handleBooking}
            className="w-full h-12 flex items-center justify-center bg-custom-gradient rounded-md text-white"
          >
            Book The Slot
          </LoaderButton>
        </div>
      </form>
    </main>
  );
}
