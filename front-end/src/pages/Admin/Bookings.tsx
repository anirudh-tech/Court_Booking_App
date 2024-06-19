import { listAllBookings } from "@/redux/actions/bookingAction";
import { AppDispatch, RootState } from "@/redux/store";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/shadcn/ui/table";
import { format } from "date-fns";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function Bookings() {
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(listAllBookings());
    }, [dispatch]);
    const { bookings } = useSelector((state: RootState) => state.booking);

    return (
        <main className="w-full h-full p-5 flex flex-col gap-2 justify-center">
            <Table className="w-[90%]  p-3 border rounded-md mx-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <TableCaption>listing all Bookings </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[190px]">Court name</TableHead>
                        <TableHead className="min-w-[150px] ">Amount</TableHead>
                        <TableHead className=" min-w-[150px] md:w-auto">
                            Date
                        </TableHead>
                        <TableHead className="text-right min-w-[150px] md:w-auto">
                            Date of Booking
                        </TableHead>
                        <TableHead className=" min-w-[150px] md:w-auto">
                            Payment Method
                        </TableHead>
                        <TableHead className=" min-w-[150px] md:w-auto">
                            Payment Status
                        </TableHead>
                        <TableHead className=" min-w-[150px] md:w-auto">
                            Booking Status
                        </TableHead>
                        <TableHead className=" min-w-[150px] md:w-auto">
                            User Information
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings?.map((booking) => {
                        return (
                            <TableRow key={booking?._id}>
                                <TableCell className="font-medium">
                                    {booking?.courtId?.courtName}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {booking?.amount}
                                </TableCell>
                                <TableCell>
                                    {booking?.date && format(String(booking?.date), "PPP")}
                                </TableCell>
                                <TableCell className="text-right">
                                    {booking?.createdAt && format(String(booking?.createdAt), "PPP")}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {booking?.paymentMethod}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {booking?.paymentStatus}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {booking?.status}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {booking?.userId?.phoneNumber}
                                </TableCell>
                                
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </main>
    )
}