import { PaymentProcessing } from "@/components/custom/PaymentProcess";
import { PaymentCompleted } from "@/components/custom/Paymentcomplete";
import { motion } from "framer-motion";

export function MyBooking() {
  return (
    <motion.main className="w-full min-h-screen">
      <section className="w-[90%] mx-auto grid gap-4 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 ">
        <div className="w-full flex justify-center">
          <div className="min-h-96 space-y-4 rounded-xl py-3 shadow-md sm:w-full border px-2 w-[80%] ">
            <div className="w-full px-3 py-5 border-b">
              <div className="w-full flex justify-center flex-col gap-2 ">
                <PaymentCompleted />
                <div className="w-full flex justify-center text-[14px] font-semibold">
                  ₹ 300.00
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col px-2 gap-2">
              <div className="w-full flex justify-between text-[14px]">
                <span className="text-[#474747]">Court name</span>
                <span className="">Test court</span>
              </div>
              <div className="w-full flex justify-between text-[14px]">
                <span className="text-[#474747]">Date</span>
                <span className="">12/05/2002</span>
              </div>
              <div className="w-full flex justify-between text-[14px]">
                <span className="text-[#474747]">Payment method</span>
                <span className="">Online</span>
              </div>
              <div className="w-full flex justify-between text-[14px]">
                <span className="text-[#474747]">Sports</span>
                <span className="">Badminton</span>
              </div>
              <div className="w-full flex justify-between text-[14px]">
                <span className="text-[#474747]">Start time</span>
                <span className="">10:00 AM</span>
              </div>
              <div className="w-full flex justify-between text-[14px]">
                <span className="text-[#474747]">Duration</span>
                <span className="">2 Hr</span>
              </div>
              <div className="w-full flex justify-between text-[14px]">
                <span className="text-[#474747]">End time</span>
                <span className="">12:00 PM</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="min-h-96 space-y-4 rounded-xl py-3 shadow-md sm:w-full border px-2 w-[80%] ">
            <div className="w-full px-3 py-5 border-b">
              <div className="w-full flex justify-center flex-col gap-2 ">
                <PaymentProcessing />
                <div className="w-full flex justify-center text-[14px] font-semibold">
                  ₹ 300.00
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col px-2 gap-2">
              <div className="w-full flex justify-between text-[14px]">
                <span className="text-[#474747]">Court name</span>
                <span className="">Test court</span>
              </div>
              <div className="w-full flex justify-between text-[14px]">
                <span className="text-[#474747]">Date</span>
                <span className="">12/05/2002</span>
              </div>
              <div className="w-full flex justify-between text-[14px]">
                <span className="text-[#474747]">Payment method</span>
                <span className="">Online</span>
              </div>
              <div className="w-full flex justify-between text-[14px]">
                <span className="text-[#474747]">Sports</span>
                <span className="">Badminton</span>
              </div>
              <div className="w-full flex justify-between text-[14px]">
                <span className="text-[#474747]">Start time</span>
                <span className="">10:00 AM</span>
              </div>
              <div className="w-full flex justify-between text-[14px]">
                <span className="text-[#474747]">Duration</span>
                <span className="">2 Hr</span>
              </div>
              <div className="w-full flex justify-between text-[14px]">
                <span className="text-[#474747]">End time</span>
                <span className="">12:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
