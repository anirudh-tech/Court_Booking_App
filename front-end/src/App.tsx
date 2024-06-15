import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { UserLayout } from "./Layouts/UserLayout";

import { useEffect } from "react";
import { Booking } from "./pages/Booking";
import { MyBooking } from "./pages/MyBookings";
import { AdminLogin } from "./pages/AdminLogin";
import { AppDispatch } from "./redux/store";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/actions/userActions";
import { AdminLayout } from "./Layouts/AdminLayout";
import { AdminCourts } from "./pages/Admin/AdminCourts";
import { Bookings } from "./pages/Admin/Bookings";
function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <main className="w-full">
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/mybooking" element={<MyBooking />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
        </Route>

        <Route path="/admin/" element={<AdminLayout />}>
          <Route path="courts" element={<AdminCourts />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
