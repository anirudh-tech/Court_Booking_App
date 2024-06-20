import { PaymentProcessing } from "@/components/custom/PaymentProcess";
import { PaymentCompleted } from "@/components/custom/Paymentcomplete";
import { axiosInstance } from "@/constants/axiosInstance";
import { RootState } from "@/redux/store";
import { Booking } from "@/types/bookingReducerInitial";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function MyBooking() {
  const { user } = useSelector((state: RootState) => state.user);
  const [bookings, setBookings] = useState<Booking[]>([]);
  useEffect(() => {
    if (user) {
      axiosInstance.get(`/user-bookings-list/${user?._id}`).then((res) => {
        console.log(res);
        setBookings(res.data.data);
      });
    }
  }, [user]);
  return (
    <motion.main className="w-full min-h-screen">
      <section className="w-[90%] mx-auto grid gap-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 ">
        {bookings?.map((booking, index) => (
          <div key={index} className="w-full flex justify-center">
            <div className="min-h-96 space-y-4 rounded-xl py-3 shadow-md sm:w-full border px-2 w-[80%] ">
              <div className="w-full px-3 py-5 border-b">
                <div className="w-full flex justify-center flex-col gap-2 ">
                  {booking?.paymentStatus == "Success" ? (
                    <PaymentCompleted />
                  ) : booking?.paymentStatus == "Pending" ? (
                    <PaymentProcessing />
                  ) : booking.paymentStatus == "Failed" ? (
                    <PaymentProcessing />
                  ) : (
                    ""
                  )}

                  <div className="w-full flex justify-center text-[14px] font-semibold">
                    ₹ {booking.amount}
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col px-2 gap-2">
                <div className="w-full flex justify-between text-[14px]">
                  <span className="text-[#474747]">Court -</span>
                  <div>
                    <span className="">{booking.courtId.courtName}</span>
                  </div>
                </div>
                <div className="w-full flex justify-between text-[14px]">
                  <span className="text-[#474747]">Date</span>
                  <span className="">
                    {booking.date && format(String(booking?.date), "PPP")}
                  </span>
                </div>
                <div className="w-full flex justify-between text-[14px]">
                  <span className="text-[#474747]">Payment method</span>
                  <span className="">{booking.paymentMethod}</span>
                </div>
                <div className="w-full flex justify-between text-[14px]">
                  <span className="text-[#474747]">Sports</span>
                  <span className="">{booking.courtId.sport}</span>
                </div>
                <div className="w-full flex justify-between text-[14px]">
                  <span className="text-[#474747]">Start time</span>
                  <span className="">{booking.startTime}</span>
                </div>
                <div className="w-full flex justify-between text-[14px]">
                  <span className="text-[#474747]">Duration</span>
                  <span className="">{booking.duration}</span>
                </div>
                <div className="w-full flex justify-between text-[14px]">
                  <span className="text-[#474747]">End time</span>
                  <span className="">{booking.endTime}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </motion.main>
  );
}
