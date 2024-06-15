import logo from "@/assets/Images/lsa-logo.png";
import { CreditCard, KeyboardMusic } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
export function AdminLayout() {
  return (
    <main className="w-full min-h-screen">
      <div className="w-full flex h-full">
        <aside className="hidden md:flex flex-col h-screen w-56 border p-2 sticky top-0 left-0">
          <div className="border-b py-3">
            <img src={logo} className="h-10" alt="" />
          </div>
          <div className="w-full flex flex-col gap-2 pl-2 mt-5">
            <NavLink
              className="w-full flex gap-2 h-10 items-center hover:bg-slate-200 pl-3 transition-all duration-200 rounded-md cursor-pointer"
              to={"courts"}
            >
              <KeyboardMusic className="w-5" />
              <span>Courts</span>
            </NavLink>
            <NavLink
              to={"bookings"}
              className="w-full flex gap-2 h-10 items-center relative  pl-3 hover:bg-slate-200 hover:px-3 transition-all duration-200 rounded-md cursor-pointer"
            >
              <CreditCard className="w-5" />
              <span>Bookings</span>
              <div className="absolute right-0 size-7 rounded-full flex items-center justify-center bg-green-500 text-white">
                5
              </div>
            </NavLink>
          </div>
        </aside>
        <div className="w-full h-full">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
