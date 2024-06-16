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
import { isSpecialTime } from "@/utils/IsSpecialTime";
import { formatDuration } from "@/utils/formatDuration";
import { formatTime } from "@/utils/formatTime";
import { formatEndTimeWithDuration } from "@/utils/getEndTime";
import { isSpecialDay } from "@/utils/isSpecialday";
import { parseTime } from "@/utils/stringToTIme";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format, isBefore, startOfDay } from "date-fns";
import { CalendarIcon, Clock, IndianRupee, Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

export function Booking() {
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

  useEffect(() => {
    console.log(formatTime(timeSlots[0])," FORM");
    
    setValue("startTime", formatTime(timeSlots[0]));
  }, []);

  const popoverCloseRef = useRef<HTMLButtonElement>(null);

  const demoAmount = {
    amount: 500,
    currency: "INR",
    // receiptId: "testid",
  };

  const handleBooking = async (values: z.infer<typeof bookingSchema>) => {
    values;
    alert("()")
    return
    const { data } = await axiosInstance.post(`/book-court`, demoAmount);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const order: any = data.order;
    console.log("🚀 ~ handleBooking ~ order:", order);
    //     VITE_RAZORPAY_KEY_ID
    // VITE_RAZORPAY_SECRET

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: order.amount.toString(),
      currency: order.currency,
      name: "tester.",
      description: "Test Transaction",
      order_id: order.id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handler: async function (response: any) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data = {
          orderCreationId: order.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        await axiosInstance.post(`/validate-payment`, data);
        data
        toast.error("HEo")
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
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
    bookedDate: z.date(),
    amount: z.number(),
  });
  const {
    handleSubmit,
    trigger,
    watch,
    setValue,
    getValues,
    formState: { errors },
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
    const currentAmount = getValues("amount");

    if (currentDuration < 20) {
      // Maximum duration limit
      const newDuration = currentDuration + 0.5;
      const newAmount = (currentAmount / currentDuration) * newDuration;

      setValue("duration", newDuration); // Increment by half an hour
      trigger("duration");
      setValue("amount", newAmount); // Update amount with new duration
      trigger("amount");
    }
  };

  const decrementDuration = () => {
    const currentDuration = getValues("duration");
    const currentAmount = getValues("amount");

    if (currentDuration > 1) {
      // Minimum duration limit
      const newDuration = currentDuration - 0.5;
      const newAmount = (currentAmount / currentDuration) * newDuration;

      setValue("duration", newDuration); // Decrement by half an hour
      trigger("duration");
      setValue("amount", newAmount); // Update amount with new duration
      trigger("amount");
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
          console.log(res.data.courts);

          setCourts(res.data.courts);
        })
        .finally(() => setLocalLoad(false));
    }
  }, [watch("sport")]);

  useEffect(() => {
    const value = getValues("court");
    const selecteCourt = courts?.find((court) => court._id == value);
    if (
      selecteCourt?.specialcost?.category == "day" &&
      watch("bookedDate") &&
      isSpecialDay(watch("bookedDate"), selecteCourt)
    ) {
      setValue("amount", Number(selecteCourt?.specialcost?.price));
      trigger("amount");
    } else {
      setValue("amount", Number(selecteCourt?.normalcost.price));
      trigger("amount");
    }
  }, [watch("bookedDate")]);

  useEffect(() => {
    const value = getValues("court");
    const selecteCourt = courts?.find((court) => court._id == value);
    if (
      selecteCourt?.specialcost?.category === "time" &&
      watch("startTime") &&
      isSpecialTime(watch("startTime"), selecteCourt)
    ) {
      setValue("amount", Number(selecteCourt.specialcost.price));
      trigger("amount");
    } else {
      setValue("amount", Number(selecteCourt?.normalcost?.price));
      trigger("amount");
    }
  }, [watch("startTime")]);
  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 23) {
      // If it's after 11:00 PM, set the date to the next day
      const nextDay = new Date(now);
      nextDay.setDate(now.getDate() + 1);
      setValue("bookedDate", nextDay);
    } else {
      // Otherwise, set it to the current date
      setValue("bookedDate", now);
    }
  }, [setValue]);
  const timeSlots = useGenerateTimSlot(
    watch("bookedDate") ? watch("bookedDate") : new Date()
  );
  // useEffect(() => {
  //   console.log("()");
  //   if (!timeSlots.includes(parseTime(getValues("startTime")))) {
  //     setValue("startTime", formatTime(timeSlots[0]));
  //   }
  // }, [watch("bookingdate")]);
  console.log(errors);
  return (
    <main className="w-full h-screen flex  justify-center items-start">
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
        <div className="w-full flex flex-col px-3 py-5 gap-6">
          <div className="w-full flex justify-between h-10 items-center">
            <label htmlFor="">Select Sports</label>
            <div className="flex flex-col">
              <Select
                onValueChange={(value) => {
                  setValue("sport", value);
                  setValue("court", "");
                  trigger("sport");
                  trigger("court")
                }}
              >
                <SelectTrigger className="sm:w-64 w-52 outline-none ring-0">
                  <SelectValue placeholder="🍳 Select sports" />
                </SelectTrigger>
                <SelectContent>
                  {sports?.map((sport) => (
                    <SelectItem
                      key={String(sport?._id)}
                      value={String(sport._id)}
                    >
                      <div className="flex gap-4 py-1 ">
                        <img src={sport.image} className="w-5" alt="" />
                        <span>{sport.sportName}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors && errors.sport && errors.sport.message && (
                <>
                  <span className="text-[12px] text-red-600">
                    {errors.sport.message}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="w-full flex justify-between h-10 items-center">
            <label htmlFor="">Select Courts</label>
            <div className="flex flex-col">
              <Select
                disabled={!courts || courts.length <= 0}
                onValueChange={(value) => {
                  setValue("court", value);
                  trigger("court")
                  const selecteCourt = courts.find(
                    (court) => court._id == value
                  );
                  console.log(
                    "🚀 ~ Booking ~ selecteCourt:",
                    isSpecialDay(new Date(), selecteCourt as Court)
                  );
                  console.log("IS sp time ", watch("startTime"));
                  console.log("IS sp time ", selecteCourt?.specialcost);
                  console.log(
                    "IS sp time ",
                    isSpecialTime(watch("startTime"), selecteCourt as Court)
                  );

                  if (
                    selecteCourt?.specialcost?.category == "day" &&
                    format(new Date(), "PPP") ==
                      format(watch("bookedDate"), "PPP")
                  ) {
                    if (isSpecialDay(new Date(), selecteCourt)) {
                      setValue("amount", selecteCourt.specialcost.price);
                      trigger("amount");
                    }
                  } else if (selecteCourt?.specialcost?.category == "time") {
                    if (isSpecialTime(watch("startTime"), selecteCourt)) {
                      setValue("amount", selecteCourt.specialcost.price);
                      trigger("amount");
                    }
                  } else {
                    console.log("Reach");
                    setValue("amount", Number(selecteCourt?.normalcost.price));
                    trigger("amount");
                  }
                }}
              >
                <SelectTrigger
                  className={`sm:w-64 w-52 outline-none ring-0 ${
                    !courts || (courts.length <= 0 && "pointer-events-none")
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
              {errors && errors.court && errors.court.message && (
                <>
                  <span className="text-[12px] text-red-600">
                    {errors.court.message}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="w-full flex justify-between h-10 items-center">
            <label htmlFor="" className="capitalize">
              Select date
            </label>
            <div className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    disabled={!watch("court") || watch("court") == ""}
                    variant={"outline"}
                    className={cn(
                      "sm:w-64 w-52 justify-start text-left font-normal",
                      !watch("bookedDate") && "text-muted-foreground "
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {watch("bookedDate") ? (
                      format(watch("bookedDate"), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={watch("bookedDate")}
                    onSelect={(date) => {
                      date && setValue("bookedDate", new Date(date));
                    }}
                    disabled={isDateDisabled}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors && errors.bookedDate && errors.bookedDate.message && (
                <>
                  <span className="text-[12px] text-red-600">
                    {errors.bookedDate.message}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="w-full flex justify-between h-10 items-center">
            <label htmlFor="">Start Time</label>
            <div className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    ref={popoverCloseRef}
                    className={cn(
                      "sm:w-64 w-52 justify-start text-left font-normal",
                      !watch("bookedDate") && "text-muted-foreground "
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
                          className="h-10 rounded-md cursor-pointer hover:bg-[#4cd681] transition-all duration-200 w-full flex items-center justify-center text-[13px] border"
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
          <div className="w-full flex justify-between h-10 items-center">
            <label htmlFor="">Duration</label>
            <div className="sm:w-64 w-52 h-10  rounded-md flex justify-between items-center">
              <div
                onClick={decrementDuration}
                className={`size-9 flex justify-center items-center rounded-full cursor-pointer ${
                  watch("duration") <= 1
                    ? "pointer-events-none bg-slate-300 border"
                    : "bg-custom-gradient"
                }  text-white transition-all duration-200`}
              >
                <Minus className="w-5" />
              </div>
              <span className="text-[13px] font-semibold">
                {formatDuration(watch("duration"))}
              </span>
              <div
                onClick={incrementDuration}
                className={`size-9 flex justify-center items-center rounded-full cursor-pointer ${
                  watch("duration") >= 20
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
                {formatEndTimeWithDuration(
                  watch("startTime")
                    ? parseTime(watch("startTime") as string)
                    : new Date(),
                  watch("duration")
                )}
              </span>
            </div>
          </div>
          <div className="w-full flex justify-between  items-center border border-r-0 border-l-0 p-2">
            <label htmlFor="">Total amount </label>
            <div className="flex flex-col">
              <div className="sm:w-64 w-52 h-10  rounded-md flex justify-end gap-1  items-center  px-4 pointer-events-none">
                <IndianRupee className="w-4 font-bold" />{" "}
                <span className="text-[15px] font-semibold">
                  {watch("amount") ? watch("amount") : "---"}
                </span>
              </div>
            </div>
          </div>
          <button
            type="submit"
            // onClick={handleBooking}
            className="w-full h-12 flex items-center justify-center bg-custom-gradient rounded-md text-white"
          >
            Proceed to payment
          </button>
        </div>
      </form>
    </main>
  );
}
