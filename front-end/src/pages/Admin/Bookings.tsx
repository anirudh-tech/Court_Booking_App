/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { bookingsByDate, listAllBookings } from "@/redux/actions/bookingAction";
import { AppDispatch, RootState } from "@/redux/store";
import { Button } from "@/shadcn/ui/button";
import { Calendar } from "@/shadcn/ui/calendar";
import { Input } from "@/shadcn/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shadcn/ui/table";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/ui/select";
import { PopoverClose } from "@radix-ui/react-popover";

export function Bookings() {
    const dispatch: AppDispatch = useDispatch();
    const [localBookings, setLocalBookings] = useState([]);
    const [search, setSearch] = useState<string>('');
    const [date, setDate] = useState<Date | null>(null);
    const popoverClose = useRef<HTMLButtonElement>(null)
    const { bookings } = useSelector((state: RootState) => state.booking);


    useEffect(() => {
        dispatch(listAllBookings(search));
    }, [dispatch]);

    useEffect(() => {
        if (date) {
            dispatch(bookingsByDate(date));
        } else {
            dispatch(listAllBookings(search));
        }
    }, [dispatch, date, search]);

    useEffect(() => {
        filterBookings();
    }, [bookings, search]);

    const filterBookings = () => {
        let filteredBookings = bookings;

        if (search) {
            filteredBookings = bookings.filter((booking: any) => {
                return booking?.courtId?.courtName.toLowerCase().includes(search.toLowerCase())
                    || booking?.userId?.phoneNumber.includes(search);
            });
        }

        setLocalBookings(filteredBookings);
    };

    const handleDateClick = (date: Date) => {
        popoverClose.current.click()
        setDate(date);
        setSearch('');  // Clear the search input when a new date is picked
    };

    // const handlePaymentStatusChange = async(bookingId: string, value: string) => {
    //     await dispatch(updateBookingPaymentStatus({ bookingId, value }));
    //     if(date){
    //         dispatch(bookingsByDate(date));
    //     }
    // };


    return (
        <main className="w-full h-full p-5 flex flex-col gap-2 justify-center">
            <h1 className="text-center text-3xl font-semibold underline">ALL BOOKINGS</h1>
            <div className="flex w-[100%]  mb-5 justify-between">
                <div className="flex gap-8 justify-start ">
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
                            <PopoverClose ref={popoverClose} className='hidden'>HEL</PopoverClose>
                        </PopoverContent>
                    </Popover>
                    <div className="h-10">
                        <button onClick={() => setDate(null)} className="h-full md:px-4 px-10 text-sm me-3 items-center justify-center flex bg-blue-500 rounded-lg text-white">Clear FIlter</button>
                    </div>
                </div>
                <div>
                    <Input
                        placeholder="Search here"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {localBookings?.length === 0 ? (
                <p className="text-center">No bookings found</p>
            ) : (
                <Table className="w-[90%] p-3 border rounded-md mx-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-[150px] md:w-auto">USER INFORMATION</TableHead>
                            <TableHead className="w-[190px]">COURT NAME</TableHead>
                            <TableHead className="min-w-[150px] md:w-auto">DATE AND TIME</TableHead>
                            <TableHead className="min-w-[150px] md:w-auto">DURATION</TableHead>
                            <TableHead className="min-w-[150px]">TOTAL AMOUNT</TableHead>
                            {/* <TableHead className="min-w-[150px] md:w-auto">PAYMENT METHOD</TableHead> */}
                            {/* <TableHead className="min-w-[150px] md:w-auto">AMOUNT PAID</TableHead>
                            <TableHead className="min-w-[150px] md:w-auto">BALANCE</TableHead> */}
                            {/* <TableHead className="min-w-[150px] md:w-auto">PAYMENT STATUS</TableHead> */}
                            {/* <TableHead className="min-w-[150px] md:w-auto">BOOKING STATUS</TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {localBookings?.map((booking: any) => (
                            <TableRow key={booking?._id}>
                                {
                                    booking?.userId?.role === "Admin" ? (
                                        <TableCell className="font-medium">
                                            Booked By Admin
                                        </TableCell>
                                    ) : (
                                        <TableCell className="font-medium">
                                            {booking?.userId?.phoneNumber}
                                        </TableCell>

                                    )
                                }
                                <TableCell className="font-medium">
                                    {booking?.courtId?.courtName}
                                </TableCell>
                                <TableCell>
                                    {format(booking?.date, "PPP")} - {booking?.startTime} to {booking?.endTime}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {booking?.duration}Hr
                                </TableCell>
                                {
                                    booking?.userId?.role === "Admin" ? (
                                        <TableCell className="font-medium">
                                            ---
                                        </TableCell>
                                    ) : (
                                        <TableCell className="font-medium">
                                            ₹{booking?.totalAmount}
                                        </TableCell>
                                    )
                                }

                                {/* <TableCell className="font-medium">
                                    {booking?.paymentMethod}
                                </TableCell> */}
                                {/* <TableCell className="font-medium">
                                    ₹{booking?.amountPaid}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {booking?.totalAmount - booking?.amountPaid === 0 ? (
                                        <span>Nil</span>
                                    ) : (
                                        <span>₹{booking?.totalAmount - booking?.amountPaid}</span>
                                    )}
                                </TableCell> */}
                                {/* <TableCell className="font-medium">
                                    <Select
                                        onValueChange={(value) => handlePaymentStatusChange(booking._id, value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder={<div className={`${booking?.paymentStatus === 'Advance Paid' ? 'text-orange-500' : 'text-green-500'}`}>{booking?.paymentStatus}</div>} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Paid">Paid</SelectItem>
                                            <SelectItem value="Advance Paid">Advance Paid</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell> */}
                                {/* <TableCell className="font-medium">
                                    {booking?.status}
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </main>
    );
}
