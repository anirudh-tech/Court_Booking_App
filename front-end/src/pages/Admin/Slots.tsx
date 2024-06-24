/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils'
import { bookingsByDate } from '@/redux/actions/bookingAction'
import { listAlsports } from '@/redux/actions/sportAcion'
import { listAllCourts } from '@/redux/actions/courtAction' // Add this action to fetch all courts
import { AppDispatch, RootState } from '@/redux/store'
import { Button } from '@/shadcn/ui/button'
import { Calendar } from '@/shadcn/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/ui/tabs'
import { addMinutes, format, isBefore, isAfter, parse } from 'date-fns'
import { CalendarIcon, CircleCheck, TriangleAlert, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomModal } from '@/components/Moda'

const Slots = () => {
  const initialDate = new Date();
  initialDate.setHours(0, 0, 0, 0);
  const [date, setDate] = useState<Date>(initialDate);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const { sports } = useSelector((state: RootState) => state.sport);
  const { bookings } = useSelector((state: any) => state.booking);
  console.log("🚀 ~ file: Slots.tsx:22 ~ Slots ~ bookings:", bookings)
  const { courts } = useSelector((state: any) => state.court);
  console.log("🚀 ~ file: Slots.tsx:23 ~ Slots ~ courts:", courts)

  useEffect(() => {
    if (date) {
      dispatch(bookingsByDate(date));
    }
    dispatch(listAlsports());
    dispatch(listAllCourts());
  }, [dispatch, date]);

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

    const sportCourts = courts?.filter(court => court.sportdetail?.sportName === sportName);
    const totalCourts = sportCourts.length;

    for (let time = fromTime; time < toTime; time = addMinutes(time, 30)) {
      const endTime = addMinutes(time, 30);
      const intervalString = `${format(time, 'h:mm a')} - ${format(endTime, 'h:mm a')}`;
      const intervalBookings = bookings?.filter(booking => {
        const bookingStart = parse(booking.startTime, 'h:mm a', new Date());
        const bookingEnd = addMinutes(bookingStart, booking.duration * 60); // Convert duration to minutes

        return booking.courtId.sportId.sportName === sportName &&
          ((isBefore(bookingStart, endTime) && isAfter(bookingEnd, time)) ||
            (isBefore(bookingEnd, endTime) && isAfter(bookingEnd, time)));
      });

      const availableCourts = sportCourts.filter(court =>
        isBefore(time, parse(court.normalcost.time.to, 'h:mm a', new Date())) &&
        isAfter(endTime, parse(court.normalcost.time.from, 'h:mm a', new Date()))
      ).length;

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
            onSelect={(date) => handleDateClick(date)}
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
                        <div className='flex justify-between p-3'>
                          <CustomModal
                            TriggerComponent={
                              <button disabled={bookings?.length == 0} className={`px-5 rounded ${bookings?.length == 0 ? 'border-red-700 border-2' : 'bg-red-700 text-white cursor-pointer'}`}>
                                {bookings?.length}
                              </button>
                            }
                            className="w-[90%] sm:w-[75%] md:w-[76%] lg:w-[48%] xl:w-[40%] p-0 rounded-md"
                            closeComponent={
                              <div className="cursor-pointer z-20" >
                                <X className="w-6" />
                              </div>
                            }
                          >
                            <div className='w-full h-auto'>
                              {
                                bookings?.map((booking) => (
                                  <div className='border flex-col gap-3 flex justify-center items-center m-10 p-4'>
                                    <div className='flex justify-between w-full'>
                                      <p className='font-bold'>Sport:</p>
                                      <p> {booking?.courtId.sportId.sportName}</p>
                                    </div>
                                    <div className='flex justify-between w-full'>
                                      <p className='font-bold'>Court:</p>
                                      <p > {booking?.courtId.courtName}</p>
                                    </div>
                                    <div className='flex justify-between w-full'>
                                      <p className='font-bold'>Date: </p>
                                      <p>{booking?.date && format(booking?.date, 'yyyy-MM-dd')}</p>
                                    </div>
                                    <div className='flex justify-between w-full'>
                                      <p className='font-bold'>Time: </p>
                                      <p>{booking.startTime} - {booking.endTime}</p>
                                    </div>
                                    <div className='flex justify-between w-full'>
                                      <p className='font-bold'>Phone Number: </p>
                                      <p>{booking.userId.phoneNumber}</p>
                                    </div>
                                    <div className='flex justify-start w-full'>
                                      <div className='flex gap-2'>
                                        {
                                          booking.amountPaid == booking.totalAmount ? (
                                            <>
                                            <CircleCheck className='w-6 text-green-500' />
                                            <p>INR {booking.amountPaid}/{booking.totalAmount}</p>
                                            </>
                                          ) : (
                                            <>
                                            <TriangleAlert className={'w-6 text-yellow-500'} />
                                            <p>INR {booking.amountPaid}/{booking.totalAmount}</p>
                                            </>
                                          )
                                        }
                                      </div>
                                    </div>
                                  </div>
                                ))
                              }
                            </div>
                          </CustomModal>

                          <div className='border border-1 border-red-400 px-5 rounded w-[200px] text-center'>
                            {interval}
                          </div>
                          <div className={` px-5 rounded opacity-50 text-white ${availableCourts - bookings.length == 0 ? 'bg-blue-700 border-2' : 'bg-green-700 text-white'}`}>
                            {availableCourts - bookings.length}
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
