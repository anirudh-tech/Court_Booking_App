import {  CircleDot } from "lucide-react";

export function PaymentProcessing() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      <div className="size-16 rounded-full  flex items-center justify-center bg-yellow-100">
        <div className="size-10  rounded-full flex items-center justify-center bg-yellow-500 text-white">
          <CircleDot className="w-5" />
        </div>
      </div>
      <span className="tracking-wide text-[#474747]">Partially Paid !</span>
    </div>
  );
}
