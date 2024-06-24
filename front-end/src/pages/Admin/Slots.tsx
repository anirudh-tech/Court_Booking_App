/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils'
import { listAllBookings } from '@/redux/actions/bookingAction'
import { listAlsports } from '@/redux/actions/sportAcion'
import { listAllCourts } from '@/redux/actions/courtAction' // Add this action to fetch all courts
import { AppDispatch, RootState } from '@/redux/store'
import { Button } from '@/shadcn/ui/button'
import { Calendar } from '@/shadcn/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/ui/tabs'
import { addMinutes, format, isBefore, isAfter, parse } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Slots = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const { sports } = useSelector((state: RootState) => state.sport);
  const { bookings } = useSelector((state: any) => state.booking);
  const { courts } = useSelector((state: any) => state.court);
  console.log("🚀 ~ file: Slots.tsx:23 ~ Slots ~ courts:", courts)
  
  useEffect(() => {
    dispatch(listAlsports());
    dispatch(listAllBookings(""));
    dispatch(listAllCourts());
  }, [dispatch]);

  useEffect(() => {
    if (sports?.length > 0) {
      setSelectedSport(sports[0]?.sportName);
    }
  }, [sports]);

  const handleDateClick = (date: Date) => {
    setDate(date);
  };

  const generateIntervals = (from: string, to: string, sportName: string) => {
    const fromTime = parse(from, 'h:mm a', new Date());
    const toTime = parse(to, 'h:mm a', new Date());
    const intervals = [];

    const sportCourts = courts.filter(court => court.sportdetail?.sportName === sportName);
    console.log("🚀 ~ file: Slots.tsx:40 ~ generateIntervals ~ sportCourts:", sportCourts)
    const totalCourts = sportCourts.length;

    for (let time = fromTime; time < toTime; time = addMinutes(time, 30)) {
      const endTime = addMinutes(time, 30);
      const intervalString = `${format(time, 'h:mm a')} - ${format(endTime, 'h:mm a')}`;
      const intervalBookings = bookings?.filter(booking => {
        const bookingStart = parse(booking.startTime, 'h:mm a', new Date());
        console.log("🚀 ~ file: Slots.tsx:49 ~ intervalBookings ~ bookingStart:", bookingStart)
        const bookingEnd = addMinutes(bookingStart, booking.duration * 60); // Convert duration to minutes
        console.log("🚀 ~ file: Slots.tsx:51 ~ intervalBookings ~ bookingEnd:", bookingEnd)

        return booking.courtId.sportId.sportName === sportName &&
          ((isBefore(bookingStart, endTime) && isAfter(bookingEnd, time)) ||
           (isBefore(bookingEnd, endTime) && isAfter(bookingEnd, time)));
      });

      const availableCourts = sportCourts.filter(court =>
        isBefore(time, parse(court.normalcost.time.to, 'h:mm a', new Date())) &&
        isAfter(endTime, parse(court.normalcost.time.from, 'h:mm a', new Date()))
      ).length;
      console.log("🚀 ~ file: Slots.tsx:54 ~ generateIntervals ~ availableCourts:", availableCourts)

      intervals.push({
        interval: intervalString,
        bookings: intervalBookings,
        availableCourts: availableCourts,
        totalCourts: totalCourts
      });
    }

    return intervals;
  };

  const intervals = selectedSport ? generateIntervals('5:00 AM', '11:00 PM', selectedSport) : [];

  return (
    <main className="w-full h-full p-5 flex flex-col gap-2 justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "sm:w-64 w-full justify-start text-left font-normal ",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 " />
            {date ? (
              format(date, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            onSelect={(date) => handleDateClick(new Date(date))}
            mode="single"
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <div className='w-full flex justify-center'>
        {
          sports && (
            <Tabs value={selectedSport} className="w-[100%] flex flex-col" onValueChange={(value) => setSelectedSport(value)}>
              <TabsList>
                {sports?.map((sport) => (
                  <TabsTrigger key={sport?._id} value={sport?.sportName}>{sport?.sportName}</TabsTrigger>
                ))}
              </TabsList>
              {sports?.map((sport) => (
                <TabsContent key={sport._id} value={sport.sportName}>
                  <div className="w-full space-y-4">
                    {intervals?.map(({ interval, bookings, availableCourts }, index) => (
                      <div className='flex flex-col gap-4' key={index}>
                        <div className='flex justify-between '>
                          <div className='bg-red-700 px-4 rounded text-white'>
                            {bookings?.length}
                          </div>
                          <div className='border border-1 border-red-400 px-5 rounded w-[200px] text-center'>
                            {interval}
                          </div>
                          <div className='bg-green-700 px-4 rounded text-white'>
                            {availableCourts}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )
        }
      </div>
    </main>
  )
}

export default Slots
