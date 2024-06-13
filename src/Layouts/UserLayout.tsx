"use client";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/Images/lsa-logo.png";
import booking from "../assets/icons/booking.svg";
import { LoginOrSignup } from "../components/LoginSingup";
import { CustomModal } from "../components/Moda";
import { Dribbble, TwitterIcon, X } from "lucide-react";
import { useRef } from "react";
import { Instagram } from "lucide-react";
import toast from "react-hot-toast";
import { LoginOrSignupPage } from "@/components/auth/LoginOrSignup";
export const UserLayout = () => {


  const loginModalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <div>
      <header className="w-full h-20 flex items-center justify-center sticky top-0 left-0 z-10 bg-white">
        <div
          className="w-[90%] h-10 flex justify-between items-center "
          data-aos="fade-right"
        >
          <img
            src={logo}
            className="h-full cursor-pointer"
            onClick={() => navigate("/")}
            alt=""
          />
          <div className="flex h-full items-center gap-3 md:gap-6">
            <div
              className="flex  md:gap-2 items-center cursor-pointer"
              onClick={() => {
                // toast("Please create an account", {
                //   className: "px-4 h-10",
                //   style: {
                //     color: "green",
                //     border: "1px solid green",
                //     outline: "1px solid green",
                //     outlineOffset: 3,
                //   },
                //   icon: <User className="w-5" />,
                // });
                toast.error("Please create an account");
                loginModalRef.current?.click();
              }}
            >
              <img src={booking} className="w-7" alt="" />
              <span>Book now</span>
            </div>
            <CustomModal
              className="w-[90%] sm:w-[75%] md:w-[66%] lg:w-[43%] xl:w-[60%] p-0"
              TriggerComponent={
                <div ref={loginModalRef}>
                  <LoginOrSignup />
                </div>
              }
              closeComponent={
                <div className="cursor-pointer">
                  <X className="w-6" />
                </div>
              }
            >
              <LoginOrSignupPage />
            </CustomModal>
          </div>
        </div>
      </header>
      <Outlet />
      <footer className="w-full min-h-96 pt-16 border-t mt-5 bg-[#0d0d0d] text-white pb-4">
        <main className="mx-auto w-[90%] h-full">
          <div className="mx-auto lg:w-[90%] flex-col flex md:flex-row gap-16 h-full border-b pb-10 border-[#393939]">
            <div className="h-full flex flex-col gap-5 w-96 leading-7">
              <div className="w-full">
                <h1 className="uppercase font-semibold">LAL Sports Academy</h1>
              </div>
              <div className="w-full ">
                <p className="break-words md:text-justify ">
                  Located in Chennai, Lsa – Lal Sports Academy is a
                  distinguished sports club. Situated in Old Pallavaram, this
                  establishment brings years of expertise to the realm of
                  health, fitness, and sports, establishing itself as a trusted
                  destination for individuals seeking a holistic approach to
                  wellness.
                </p>
              </div>
            </div>
            <div className="h-full flex flex-col gap-5 w-96 leading-7 justify-between ">
              <div className="w-full">
                <h1 className="uppercase font-semibold">office</h1>
              </div>
              <div className="w-full h-full flex flex-col gap-4">
                <div>
                  <p className="break-words flex gap-2">
                    {/* <MapPin className="w-" /> */}
                    No.1, Subbamal Road, Part 3, Zamin Pallavaram, Subham Nagar,
                    Tirusulam, Chennai, Tamil Nadu – 600117
                  </p>
                </div>
                <div className="">
                  <a
                    href="mailto:info@las.com"
                    className="py-2 border-b-2 border-white"
                  >
                    info@las.com
                  </a>
                </div>
                <div className="">
                  <a href="" className="py-2  ">
                    +91 90940 66501
                  </a>
                </div>
              </div>
            </div>
            <div className="h-full flex flex-col gap-5 w-96 leading-7 justify-between ">
              <div className="w-full">
                <h1 className="uppercase font-semibold">get in touch</h1>
              </div>
              <div className="w-full h-full flex gap-4">
                <div>
                  <Instagram />
                </div>
                <div>
                  <TwitterIcon />
                </div>
                <div>
                  <Dribbble />
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto lg:w-[90%] pt-7">
            <p>LAS © 2024. All Rights Reserved.</p>
          </div>
        </main>
      </footer>
    </div>
  );
};
