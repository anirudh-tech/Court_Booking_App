import { Outlet } from "react-router-dom";
import logo from "../assets/Images/lsa-logo.png";
import user from "../assets/icons/user.svg";
import booking from "../assets/icons/booking.svg";
export const UserLayout = () => {
  return (
    <div>
      <header className="w-full h-20 flex items-center justify-center sticky top-0 left-0 z-10 bg-white">
        <div
          className="w-[90%] h-10 flex justify-between items-center "
          data-aos="fade-right"
        >
          <img src={logo} className="h-full" alt="" />
          <div className="flex h-full items-center gap-6">
            <div className="flex gap-2 items-center cursor-pointer">
              <img src={booking} alt="" />
              <span>Booking</span>
            </div>
            <div className="flex gap-2 items-center h-full cursor-pointer">
              <img src={user} alt="" />
              <div className="h-full flex gap-1  items-center">
                <span>Login</span> <span>/</span> <span>Signup</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
      <footer></footer>
    </div>
  );
};
