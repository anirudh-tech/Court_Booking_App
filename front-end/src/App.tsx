import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { UserLayout } from "./Layouts/UserLayout";
import AOS from "aos";
// import "aos/dist/aos.css";
import { useEffect } from "react";
import { Booking } from "./pages/Booking";
import { MyBooking } from "./pages/MyBookings";
import { AdminLogin } from "./pages/AdminLogin";
function App() {
  useEffect(() => {
    AOS.init({
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);
  // app file
  return (
    <main className="w-full">
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/mybooking" element={<MyBooking />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
