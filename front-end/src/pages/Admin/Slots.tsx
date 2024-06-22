import { cn } from '@/lib/utils'
import { listAlsports } from '@/redux/actions/sportAcion'
import { AppDispatch, RootState } from '@/redux/store'
import { Button } from '@/shadcn/ui/button'
import { Calendar } from '@/shadcn/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/ui/tabs'
import { addMinutes, format, parse } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Slots = () => {
  const [date, setDate] = useState<Date | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const { sports } = useSelector((state: RootState) => state.sport);

  useEffect(() => {
    dispatch(listAlsports());
  }, [dispatch]);

  const handleDateClick = (date: Date) => {
    setDate(date);
  };
  const generateIntervals = (from, to) => {
    const fromTime = parse(from, 'h:mm a', new Date());
    const toTime = parse(to, 'h:mm a', new Date());
    const intervals = [];

    for (let time = fromTime; time < toTime; time = addMinutes(time, 30)) {
      intervals.push(`${format(time, 'h:mm a')} - ${format(addMinutes(time, 30), 'h:mm a')}`);
    }

    return intervals;
  };
  const intervals = generateIntervals('5:00 AM', '11:00 PM');

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
        <Tabs defaultValue={sports[0].sportName} className="w-[100%] flex flex-col">
          <TabsList>
            {sports?.map((sport) => (
              <TabsTrigger key={sport._id} value={sport.sportName}>{sport.sportName}</TabsTrigger>
            ))}
          </TabsList>
          {sports?.map((sport) => (
            <TabsContent key={sport._id} value={sport.sportName}>
              <div className="w-full space-y-4">
                {intervals.map((interval, index) => (
                  <div className='flex flex-col gap-4'>
                    <div className='flex justify-between '>

                      <div className='bg-red-700 px-4 rounded text-white'>
                        0
                      </div>
                      <div key={index} className="border border-1 border-red-400 px-5 rounded w-[200px] text-center">
                        {interval}
                      </div>
                      <div className='bg-green-700 px-4 rounded text-white'>
                        1
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  )
}

export default Slots