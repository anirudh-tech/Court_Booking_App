import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";

export function Booking() {
  return (
    <main className="w-full h-screen flex  justify-center items-start">
      <div className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-[38%]  mt-3 border rounded-md shadow-sm ">
        <div className="w-full flex flex-col p-3 ">
          <div className="w-full">
            <h1 className="font-semibold text-[#6c6c6c] text-[18px]">
              Lal Sports academy
            </h1>
          </div>
          <div>
            <span className="text-[13px] text-[#6c6c6c]">Chennai</span>
          </div>
        </div>
        <div className="h-10 w-full flex items-center justify-center bg-custom-gradient text-white text-[13px]">
          Book court
        </div>
        <div className="w-full flex flex-col px-3 py-5 gap-8">
          <div className="w-full flex justify-between h-10 items-center">
            <label htmlFor="">Select Sports</label>
            <Select>
              <SelectTrigger className="w-64 outline-none ring-0">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full flex justify-between h-10 items-center">
            <label htmlFor="">Select date</label>
            <Select>
              <SelectTrigger className="w-64 outline-none ring-0">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
        </div>
      </div>
    </main>
  );
}
