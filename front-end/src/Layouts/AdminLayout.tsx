import logo from "@/assets/Images/lsa-logo.png";
import { listAllBookings } from "@/redux/actions/bookingAction";
import { logoutUser } from "@/redux/actions/userActions";
import { AppDispatch } from "@/redux/store";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "@/shadcn/ui/sheet";
import { CreditCard, KeyboardMusic, LogOut, SwatchBook, Ticket, Trophy } from "lucide-react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
export function AdminLayout() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const closeRef = useRef(null);
  const handleClose = () => {
    dispatch(listAllBookings(""))
    if (closeRef.current) {
      closeRef.current.click();
    }
  };
  const handleAdminLogout = () => {
    dispatch(logoutUser()).then((res) => {
      if (res.type.endsWith("fulfilled")) {
        navigate("/");
      }
    });
  };
  return (
    <main className="w-full min-h-screen">
      <div className="w-full flex h-full">
        <aside className="hidden md:flex flex-col h-screen w-64 border p-2 sticky top-0 left-0 ">
          <div className="border-b py-3">
            <img src={logo} className="h-10" alt="" />
          </div>
          <div className="w-full flex flex-col gap-2 pl-2 mt-5">
            <NavLink
              className="w-full flex gap-2 h-10 items-center hover:bg-slate-200 pl-3 transition-all duration-200 rounded-md cursor-pointer"
              to={"sports"}
            >
              <Trophy className="w-5" />
              <span>Sports</span>
            </NavLink>
            <NavLink
              className="w-full flex gap-2 h-10 items-center hover:bg-slate-200 pl-3 transition-all duration-200 rounded-md cursor-pointer"
              to={"courts"}
            >
              <KeyboardMusic className="w-5" />
              <span>Courts</span>
            </NavLink>
            <NavLink
              to={"bookings"}
              onClick={() => dispatch(listAllBookings(""))}
              className="w-full flex gap-2 h-10 items-center relative  pl-3 hover:bg-slate-200 hover:px-3 transition-all duration-200 rounded-md cursor-pointer"
            >
              <CreditCard className="w-5" />
              <span>Bookings</span>
            </NavLink>
            <NavLink
              to={"slots"}
              className="w-full flex gap-2 h-10 items-center relative  pl-3 hover:bg-slate-200 hover:px-3 transition-all duration-200 rounded-md cursor-pointer"
            >
              <SwatchBook className="w-5" />
              <span>Slots</span>
            </NavLink>
            <NavLink
              to={"book-court"}
              className="w-full flex gap-2 h-10 items-center relative  pl-3 hover:bg-slate-200 hover:px-3 transition-all duration-200 rounded-md cursor-pointer"
            >
              <Ticket className="w-5" />
              <span>Book A Court</span>
            </NavLink>
          </div>
          <div className="absolute left-0 bottom-0 h-28 w-full bg-white px-2">
            <div
              className="w-full h-10 gap-2 border flex items-center px-4 rounded-md bg-slate-50 shadow-md cursor-pointer"
              onClick={handleAdminLogout}
            >
              <LogOut className="w-5" /> <span>logout</span>
            </div>
          </div>
        </aside>

        <div className="w-full h-full">
          <div className="w-full md:hidden">
            <Sheet>
              <SheetTrigger className="bg-green-500 p-3 mt-2 ms-2 rounded">Menu</SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <div className="w-full flex flex-col gap-2 pl-2 mt-5">
                    <SheetClose className="hidden" ref={closeRef}>

                      ASFD
                    </SheetClose>
                    <NavLink
                      className="w-full flex gap-2 h-10 items-center hover:bg-slate-200 pl-3 transition-all duration-200 rounded-md cursor-pointer"
                      to={"sports"}
                      onClick={handleClose}
                    >
                      <Trophy className="w-5" />
                      <span>Sports</span>
                    </NavLink>
                    <NavLink
                      className="w-full flex gap-2 h-10 items-center hover:bg-slate-200 pl-3 transition-all duration-200 rounded-md cursor-pointer"
                      to={"courts"}
                      onClick={handleClose}

                    >
                      <KeyboardMusic className="w-5" />
                      <span>Courts</span>
                    </NavLink>
                    <NavLink
                      to={"bookings"}
                      onClick={handleClose}
                      className="w-full flex gap-2 h-10 items-center relative  pl-3 hover:bg-slate-200 hover:px-3 transition-all duration-200 rounded-md cursor-pointer"
                    >
                      <CreditCard className="w-5" />
                      <span>Bookings</span>
                    </NavLink>
                    <NavLink
                      to={"slots"}
                      onClick={handleClose}
                      className="w-full flex gap-2 h-10 items-center relative  pl-3 hover:bg-slate-200 hover:px-3 transition-all duration-200 rounded-md cursor-pointer"
                    >
                      <SwatchBook className="w-5" />
                      <span>Slots</span>
                    </NavLink>
                    <NavLink
                      to={"book-court"}
                      onClick={handleClose}
                      className="w-full flex gap-2 h-10 items-center relative  pl-3 hover:bg-slate-200 hover:px-3 transition-all duration-200 rounded-md cursor-pointer"
                    >
                      <Ticket className="w-5" />
                      <span>Book A Court</span>
                    </NavLink>
                  </div>
                  <div className="absolute left-0 bottom-0 h-28 w-full bg-white px-2">
                    <div
                      className="w-full h-10 gap-2 border flex items-center px-4 rounded-md bg-slate-50 shadow-md cursor-pointer"
                      onClick={handleAdminLogout}
                    >
                      <LogOut className="w-5" /> <span>logout</span>
                    </div>
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
          <Outlet />
        </div>
      </div>
    </main>
  );
}
