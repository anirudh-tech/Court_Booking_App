import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { UserLayout } from "./Layouts/UserLayout";

import { useEffect } from "react";
import { Booking } from "./pages/Booking";
import { MyBooking } from "./pages/MyBookings";
import { AdminLogin } from "./pages/AdminLogin";
import { AppDispatch, RootState } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/actions/userActions";
import { AdminLayout } from "./Layouts/AdminLayout";
import { AdminSports } from "./pages/Admin/AdminSports";
import { Bookings } from "./pages/Admin/Bookings";
import { AdminCourts } from "./pages/Admin/AdminCourts";

function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <main className="w-full">
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/booking"
            element={!user?._id ? <Navigate to={"/"} /> : <Booking />}
          />
          <Route path="/mybooking" element={
            // user?._id?
          <MyBooking />
          // :<Navigate to={"/"}/>
          } />
          <Route
            path="/adminlogin"
            element={
              user && user.role == "User" ? (
                <Navigate to={"/"} />
              ) : user && user.role == "Admin" ? (
                <Navigate to={"/admin/sports"} />
              ) : (
                <AdminLogin />
              )
            }
          />
        </Route>

        {user && user?.role == "Admin" && (
          <>
            <Route path="/admin/" element={<AdminLayout />}>
              <Route path="sports" element={<AdminSports />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="courts" element={<AdminCourts />} />
            </Route>
          </>
        )}
      </Routes>
    </main>
  );
}

export default App;
