/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaymentProcessing } from "@/components/custom/PaymentProcess";
import { PaymentCompleted } from "@/components/custom/Paymentcomplete";
import { axiosInstance } from "@/constants/axiosInstance";
import { RootState } from "@/redux/store";
import { Booking } from "@/types/bookingReducerInitial";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { format } from "date-fns";

export function MyBooking() {
  const { user } = useSelector((state: RootState) => state.user);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    if (user) {
      setLoading(true)
      axiosInstance.get(`/user-bookings-list/${user?._id}`).then((res) => {
        setBookings(res.data.data);
      }).finally(() => {
        setLoading(false)
      })
    }
  }, [user]);

  return (
    <motion.main className="w-full min-h-screen">
      {loading ? (
        <>
          <div className="w-[350px] flex justify-center ms-16">
            <div className="min-h-96 space-y-4 rounded-xl py-3 shadow-md sm:w-full border px-2 w-[80%] ">
              <div className="w-full px-3 py-5 border-b">
                <div className="w-full flex justify-center flex-col gap-2">
                  <Skeleton height={40} />
                  <div className="w-full flex justify-center text-[14px] font-semibold">
                    <Skeleton width={40} />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col px-2 gap-2">
                <div className="w-full flex justify-between text-[14px]">
                  <span className="text-[#474747]">Court -</span>
                  <div>
                    <Skeleton width={80} />
                  </div>
                </div>
                <div className="w-full flex justify-between text-[14px]">
                  <span className="text-[#474747]">Date</span>
                  <span className="">
                    <Skeleton width={80} />
                  </span>
                </div>
                <div className="w-full flex justify-between text-[14px]">
                  <span className="text-[#474747]">Payment method</span>
                  <span className="">
                    <Skeleton width={80} />
                  </span>
                </div>
                <div className="w-full flex justify-between text-[14px]">
                  <span className="text-[#474747]">Sport</span>
                  <span className="">
                    <Skeleton width={80} />
                  </span>
                </div>
                <div className="w-full flex justify-between text-[14px]">
                  <span className="text-[#474747]">Start time</span>
                  <span className="">
                    <Skeleton width={80} />
                  </span>
                </div>
                <div className="w-full flex justify-between text-[14px]">
                  <span className="text-[#474747]">Duration</span>
                  <span className="">
                    <Skeleton width={80} />
                  </span>
                </div>
                <div className="w-full flex justify-between text-[14px]">
                  <span className="text-[#474747]">End time</span>
                  <span className="">
                    <Skeleton width={80} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <section
          className={`w-[90%] mx-auto ${bookings.length >= 1 && "grid"
            } gap-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 `}
        >
          {bookings.length <= 0 ? (
            <div className="w-full flex-col gap-2 h-screen flex items-center justify-center bg">
              <h1 className="text-3xl font-semibold">Sorry, No Bookings yet</h1>
              <Link to={'/booking'} className="flex items-center justify-center px-4 h-10 bg-green-500 text-white rounded-md">
                Go to Booking
              </Link>
            </div>
          ) : (
            <>
              {bookings?.map((booking: any, index) => (
                <div key={index} className="w-full flex justify-center">
                  <div className="min-h-96 space-y-4 rounded-xl py-3 shadow-md sm:w-full border px-2 w-[80%] ">
                    <div className="w-full px-3 py-5 border-b">
                      <div className="w-full flex justify-center flex-col gap-2 ">
                        {booking?.paymentStatus == "Paid" ? (
                          <PaymentCompleted />
                        ) : booking?.paymentStatus == "Advance Paid" ? (
                          <PaymentProcessing />
                        ) : booking.paymentStatus == "Failed" ? (
                          <PaymentProcessing />
                        ) : (
                          ""
                        )}

                        <div className="w-full flex justify-center text-[14px] text-green-600 font-semibold">
                          AMOUNT PAID - ₹ {booking.amountPaid}
                        </div>
                        {/* <div className="w-full flex justify-center text-[14px] text-red-500 font-semibold">
                          AMOUNT DUE - ₹ {booking.totalAmount - booking.amountPaid}
                        </div> */}
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
                          {booking.date && format(booking.date,"PPP")}
                        </span>
                      </div>
                      {/* <div className="w-full flex justify-between text-[14px]">
                        <span className="text-[#474747]">Payment method</span>
                        <span className="">{booking.paymentMethod}</span>
                      </div> */}
                      <div className="w-full flex justify-between text-[14px]">
                        <span className="text-[#474747]">Sport</span>
                        <span className="">{booking.sportDetails.sportName}</span>
                      </div>
                      <div className="w-full flex justify-between text-[14px]">
                        <span className="text-[#474747]">Start time</span>
                        <span className="">{booking.startTime}</span>
                      </div>
                      <div className="w-full flex justify-between text-[14px]">
                        <span className="text-[#474747]">Duration</span>
                        <span className="">{booking.duration} Hr</span>
                      </div>
                      <div className="w-full flex justify-between text-[14px]">
                        <span className="text-[#474747]">End time</span>
                        <span className="">{booking.endTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </section>
      )
      }

    </motion.main >
  );
}
