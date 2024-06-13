import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { UserLayout } from "./Layouts/UserLayout";
import AOS from "aos";
// import "aos/dist/aos.css";
import { useEffect } from "react";
import { Booking } from "./pages/Booking";
function App() {
  useEffect(() => {
    AOS.init({
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);
  return (
    <main className="w-full">
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/booking" element={<Booking />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
