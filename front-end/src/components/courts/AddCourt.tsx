/* eslint-disable @typescript-eslint/no-explicit-any */
import { days } from "@/constants/days";
import { listAlsports } from "@/redux/actions/sportAcion";
import { AppDispatch, RootState } from "@/redux/store";
import { Input } from "@/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoaderButton } from "../custom/LoaderButton";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { Button } from "@/shadcn/ui/button";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatTime } from "@/utils/formatTime";
import { useGenerateTimSlot } from "@/hooks/generateTimeslot";
import { useGenerateStartTime } from "@/hooks/generateMorningtime";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/shadcn/ui/switch";
import { courtAddAction } from "@/redux/actions/courtAction";

interface ChildProp {
  closeModal: () => void;
}

export const AddCourts = ({ closeModal }: ChildProp) => {
  const [spcialCostoption, setSpOption] = useState<boolean>(false);
  const addCourtSchema = spcialCostoption
    ? z.object({
        courtName: z
          .string()
          .min(3, { message: "Minimum 3 characters required" })
          .max(100, { message: "Allow only 100 characters" }),
        sportId: z.string().nonempty({ message: "Sport ID cannot be empty" }),
        normalcost: z.object({
          price: z
            .number()
            .nonnegative({ message: "Price must be non-negative" }),
          day: z.object({
            from: z.string().nonempty({ message: "Day from cannot be empty" }),
            to: z.string().nonempty({ message: "Day to cannot be empty" }),
          }),
          time: z.object({
            from: z.string().nonempty({ message: "Time from cannot be empty" }),
            to: z.string().nonempty({ message: "Time to cannot be empty" }),
          }),
        }),
        specialcost: z.object({
          category: z.string().nonempty(),
          price: z
            .number()
            .nonnegative({ message: "Price must be non-negative" })
            .refine((val) => val !== 0, { message: "Price cannot be zero" }),
          diff: z.object({
            from: z.string(),
            to: z.string(),
          }),
        }),
      })
    : z.object({
        courtName: z
          .string()
          .min(3, { message: "Minimum 3 characters required" })
          .max(100, { message: "Allow only 100 characters" }),
        sportId: z.string().nonempty({ message: "Sport ID cannot be empty" }),
        normalcost: z.object({
          price: z
            .number()
            .nonnegative({ message: "Price must be non-negative" }),
          day: z.object({
            from: z.string().nonempty({ message: "Day from cannot be empty" }),
            to: z.string().nonempty({ message: "Day to cannot be empty" }),
          }),
          time: z.object({
            from: z.string().nonempty({ message: "Time from cannot be empty" }),
            to: z.string().nonempty({ message: "Time to cannot be empty" }),
          }),
        }),
      });
  closeModal;

  const {
    trigger,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof addCourtSchema>>({
    resolver: zodResolver(addCourtSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      courtName: "",
      sportId: "",
      normalcost: {
        day: {
          from: "",
          to: "",
        },
        time: {
          from: "",
          to: "",
        },
      },
    },
  });
  console.log(errors);

  const popoverCloseRef = useRef<HTMLButtonElement>(null);
  // const [date, setDate] = useState<Date>();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(listAlsports());
  }, [dispatch]);
  const [normalStartTime, setNormalStartTime] = useState<Date>();
  const startTimeslot = useGenerateStartTime(new Date());
  const endTimeSlot = useGenerateTimSlot(
    normalStartTime ? normalStartTime : new Date()
  );
  endTimeSlot;
  const submitCourtForm = (values: z.infer<typeof addCourtSchema>) => {
    console.log("🚀 ~ submitCourtForm ~ values:", values);
    dispatch(courtAddAction(values)).then((res) => {
      if (res.type.endsWith("fulfilled")) {
        closeModal();
      }
    });
  };
  const { sports } = useSelector((state: RootState) => state.sport);
  const { loading } = useSelector((state: RootState) => state.court);
  return (
    <form
      className="w-full max-h-[690px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-6 bg-white rounded-md "
      onSubmit={handleSubmit(submitCourtForm)}
    >
      <div className="w-full">
        <span className="font-semibold">Add court</span>
      </div>
      <div className="w-full  gap-3 grid grid-cols-1 md:grid-cols-2 items-center justify-center flex-col  rounded-md mt-5">
        <div className="flex flex-col">
          <label htmlFor="" className="text-[14px]">
            Court name
          </label>
          <Input
            type="text"
            placeholder="enter court name"
            value={watch("courtName")}
            onChange={(e) => {
              setValue("courtName", e.target.value);
              trigger("courtName");
            }}
          />
          <span className="text-[12px] text-red-600 h-4">
            {errors && errors.courtName && <>{errors.courtName.message}</>}
          </span>
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-[14px]">
            Select Sport
          </label>
          <Select
            onValueChange={(value) => {
              setValue("sportId", value);
              trigger("sportId");
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sports?.map((sport) => (
                  <SelectItem
                    key={String(sport._id)}
                    value={String(sport._id)}
                    className="flex gap-2 cursor-pointer"
                  >
                    <div className="flex gap-2 py-2 cursor-pointer">
                      <img src={sport?.image} className="w-5" alt="" />
                      {sport.sportName}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <span className="text-[12px] text-red-600 h-4">
            {errors && errors.sportId && <>{errors.sportId.message}</>}
          </span>
        </div>
      </div>
      <div className="w-full px-3 py-2 border rounded-md mt-3">
        <div className="w-full py-2 border-b">
          <span className="text-[12px]">Normal price</span>
        </div>
        <div className="w-full grid grid-cols-1 gap-3 md:grid-cols-2 mt-2">
          <div className="flex flex-col">
            <Select
              onValueChange={(value) => {
                setValue("normalcost.day.from", value);
                trigger("normalcost.day.from");
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select start day" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {days.map((val) => {
                    return (
                      <SelectItem key={val} value={val}>
                        {val}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className="text-[12px] text-red-600 h-4">
              {errors && errors.normalcost?.day?.from && (
                <>{errors.normalcost?.day?.from?.message as ReactNode}</>
              )}
            </span>
          </div>
          <div className="flex flex-col">
            <Select
              disabled={watch("normalcost.day.from") ? false : true}
              onValueChange={(value) => {
                setValue("normalcost.day.to", value);
                trigger("normalcost.day.to");
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select end day" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {days.map((val) => {
                    return (
                      <SelectItem key={val} value={val}>
                        {val}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className="text-[12px] text-red-600 h-4">
              {errors && errors.normalcost?.day?.to && (
                <>{errors.normalcost?.day.to.message as ReactNode}</>
              )}
            </span>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="w-full flex flex-col mt-3">
            <label htmlFor="" className="text-[13px]">
              Select start time
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  ref={popoverCloseRef}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !watch("normalcost.time.from") && "text-muted-foreground "
                  )}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {watch("normalcost.time.from") ? (
                    watch("normalcost.time.from")
                  ) : (
                    <span>Pick a time</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 max-h-64 overflow-x-hidden overflow-y-auto">
                <div className="w-64 h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-1">
                  <div className="grid grid-cols-2 gap-2">
                    {startTimeslot.map((time, Idx) => (
                      <div
                        key={Idx}
                        role="button"
                        onClick={() => {
                          setValue("normalcost.time.from", formatTime(time));
                          setNormalStartTime(time);
                          trigger("normalcost.time.from");
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
            <span className="text-[12px] text-red-600 h-4">
              {errors && errors.normalcost?.time?.from && (
                <>{errors.normalcost?.time.from.message as ReactNode}</>
              )}
            </span>
          </div>
          <div className="w-full flex flex-col mt-3">
            <label htmlFor="" className="text-[13px]">
              Select end time
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={watch("normalcost.time.from") ? false : true}
                  variant={"outline"}
                  ref={popoverCloseRef}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !watch("normalcost.time.to") && "text-muted-foreground "
                  )}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {watch("normalcost.time.to") ? (
                    watch("normalcost.time.to")
                  ) : (
                    <span>Pick a time</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 max-h-64 overflow-x-hidden overflow-y-auto">
                <div className="w-64 h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-1">
                  <div className="grid grid-cols-2 gap-2">
                    {startTimeslot.map((time, Idx) => (
                      <div
                        key={Idx}
                        role="button"
                        onClick={() => {
                          setValue("normalcost.time.to", formatTime(time));
                          trigger("normalcost.time.to");
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
            <span className="text-[12px] text-red-600 h-4">
              {errors && errors.normalcost?.time?.to && (
                <>{errors.normalcost?.time?.to?.message as ReactNode}</>
              )}
            </span>
          </div>
        </div>
        <div className="w-full mt-3 flex flex-col">
          <label htmlFor="" className="text-[13px]">
            Enter price for one hour
          </label>
          <Input
            type="text"
            placeholder="Enter price"
            onChange={(e) => {
              if (Number.isInteger(Number(e.target.value))) {
                setValue("normalcost.price", Number(e.target.value));

                trigger("normalcost.price");
              }
            }}
          />
          <span className="text-[12px] text-red-600 h-4">
            {errors && errors.normalcost?.price && (
              <>{errors.normalcost?.price?.message as ReactNode}</>
            )}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2 w-full mt-3">
        <Switch
          id="airplane-mode"
          onCheckedChange={(val) => setSpOption(val)}
        />
        <label htmlFor="airplane-mode">Special cost option</label>
      </div>
      {/* Start */}

      {spcialCostoption && (
        <>
          <div className="w-full px-3 py-2 border rounded-md mt-3">
            <div className="w-full py-2 border-b">
              <span className="text-[12px]">Special price (Optional)</span>
            </div>
            <div className="w-full mt-3 flex flex-col">
              <Select
                onValueChange={(value) => {
                  setValue(
                    "specialcost.category" as
                      | "courtName"
                      | "sportId"
                      | "normalcost"
                      | "normalcost.price"
                      | "normalcost.day"
                      | "normalcost.time"
                      | "normalcost.day.from",
                    value
                  );
                  trigger(
                    "specialcost.category" as
                      | "courtName"
                      | "sportId"
                      | "normalcost"
                      | "normalcost.price"
                      | "normalcost.day"
                      | "normalcost.time"
                      | "normalcost.day.from"
                  );
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type of category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      key={1}
                      value={"day"}
                      className="flex gap-2 cursor-pointer"
                    >
                      Day
                    </SelectItem>
                    <SelectItem
                      value={"time"}
                      key={2}
                      className="flex gap-2 cursor-pointer"
                    >
                      Time
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <span className="text-[12px] text-red-600 h-4">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {errors && (errors as any)?.specialcost?.category && (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  <>
                    {
                      (errors as any)?.specialcost?.category
                        ?.message as ReactNode
                    }
                  </>
                )}
              </span>
            </div>
            {watch(
              "specialcost.category" as
                | "courtName"
                | "sportId"
                | "normalcost"
                | "normalcost.price"
                | "normalcost.day"
                | "normalcost.time"
                | "normalcost.day.from"
            ) &&
              watch(
                "specialcost.category" as
                  | "courtName"
                  | "sportId"
                  | "normalcost"
                  | "normalcost.price"
                  | "normalcost.day"
                  | "normalcost.time"
                  | "normalcost.day.from"
              ) !== "" && (
                <>
                  <div className="w-full grid grid-cols-1 gap-3 md:grid-cols-2 mt-2">
                    <div className="flex flex-col">
                      <Select
                        onValueChange={(value) => {
                          setValue(
                            "specialcost.diff.from" as
                              | "courtName"
                              | "sportId"
                              | "normalcost"
                              | "normalcost.price"
                              | "normalcost.day"
                              | "normalcost.time"
                              | "normalcost.day.from",
                            value
                          );
                          trigger(
                            "specialcost.diff.from" as
                              | "courtName"
                              | "sportId"
                              | "normalcost"
                              | "normalcost.price"
                              | "normalcost.day"
                              | "normalcost.time"
                              | "normalcost.day.from"
                          );
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={`Select start ${watch(
                              "specialcost.category" as
                                | "courtName"
                                | "sportId"
                                | "normalcost"
                                | "normalcost.price"
                                | "normalcost.day"
                                | "normalcost.time"
                                | "normalcost.day.from"
                            )}`}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {watch(
                              "specialcost.category" as
                                | "courtName"
                                | "sportId"
                                | "normalcost"
                                | "normalcost.price"
                                | "normalcost.day"
                                | "normalcost.time"
                                | "normalcost.day.from"
                            ) == "day" ? (
                              <>
                                <>
                                  {days.map((val) => {
                                    return (
                                      <SelectItem key={val} value={val}>
                                        {val}
                                      </SelectItem>
                                    );
                                  })}
                                </>
                              </>
                            ) : (
                              <>
                                {startTimeslot.map((val, id) => {
                                  return (
                                    <SelectItem
                                      key={id}
                                      value={formatTime(val)}
                                    >
                                      {formatTime(val)}
                                    </SelectItem>
                                  );
                                })}
                              </>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <span className="text-[12px] text-red-600 h-4">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {errors && (errors as any).specialcost?.diff?.from && (
                          <>
                            {
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              (errors as any).specialcost?.diff?.from
                                ?.message as ReactNode
                            }
                          </>
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <Select
                        disabled={
                          watch(
                            "specialcost.diff.from" as
                              | "courtName"
                              | "sportId"
                              | "normalcost"
                              | "normalcost.price"
                              | "normalcost.day"
                              | "normalcost.time"
                              | "normalcost.day.from"
                          ) == ""
                            ? true
                            : false
                        }
                        onValueChange={(value) => {
                          setValue(
                            "specialcost.diff.to" as
                              | "courtName"
                              | "sportId"
                              | "normalcost"
                              | "normalcost.price"
                              | "normalcost.day"
                              | "normalcost.time"
                              | "normalcost.day.from",
                            value
                          );
                          trigger(
                            "specialcost.diff.to" as
                              | "courtName"
                              | "sportId"
                              | "normalcost"
                              | "normalcost.price"
                              | "normalcost.day"
                              | "normalcost.time"
                              | "normalcost.day.from"
                          );
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={`Select end ${watch(
                              "specialcost.category" as
                                | "courtName"
                                | "sportId"
                                | "normalcost"
                                | "normalcost.price"
                                | "normalcost.day"
                                | "normalcost.time"
                                | "normalcost.day.from"
                            )}`}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {watch(
                              "specialcost.category" as
                                | "courtName"
                                | "sportId"
                                | "normalcost"
                                | "normalcost.price"
                                | "normalcost.day"
                                | "normalcost.time"
                                | "normalcost.day.from"
                            ) == "day" ? (
                              <>
                                <>
                                  {days.map((val) => {
                                    return (
                                      <SelectItem value={val} key={val}>
                                        {val}
                                      </SelectItem>
                                    );
                                  })}
                                </>
                              </>
                            ) : (
                              <>
                                {startTimeslot.map((val, id) => {
                                  return (
                                    <SelectItem
                                      value={formatTime(val)}
                                      key={id}
                                    >
                                      {formatTime(val)}
                                    </SelectItem>
                                  );
                                })}
                              </>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <span className="text-[12px] text-red-600 h-4">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {errors && (errors as any).specialcost?.diff?.to && (
                          <>
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {
                              (errors as any).specialcost?.diff?.to
                                ?.message as ReactNode
                            }
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </>
              )}
            <div className="w-full mt-3 flex flex-col">
              <label htmlFor="" className="text-[13px]">
                Enter price for one hour
              </label>
              <Input
                type="text"
                placeholder="Enter price"
                onChange={(e) => {
                  if (!Number.isNaN(e.target.value)) {
                    setValue(
                      "specialcost.price" as
                        | "courtName"
                        | "sportId"
                        | "normalcost"
                        | "normalcost.price"
                        | "normalcost.day"
                        | "normalcost.time"
                        | "normalcost.day.from",
                      Number(e.target.value)
                    );
                    trigger(
                      "specialcost.price" as
                        | "courtName"
                        | "sportId"
                        | "normalcost"
                        | "normalcost.price"
                        | "normalcost.day"
                        | "normalcost.time"
                        | "normalcost.day.from"
                    );
                  }
                }}
              />
              <span className="text-[12px] text-red-600 h-4">
                {errors && (errors as any).specialcost?.price && (
                  <>
                    {(errors as any).specialcost?.price?.message as ReactNode}
                  </>
                )}
              </span>
            </div>
          </div>
        </>
      )}
      {/* end */}
      <div className="w-full mt-4">
        <LoaderButton loading={loading} type="submit" className="bg-green-500">
          Submit
        </LoaderButton>
      </div>
    </form>
  );
};
