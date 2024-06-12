"use client";
import { Outlet } from "react-router-dom";
import logo from "../assets/Images/lsa-logo.png";
import indFlag from "../assets/icons/Ind.png";
import loginImg from "../assets/Images/login-bg.png";
import loginTop from "../assets/Images/login-top.png";
import booking from "../assets/icons/booking.svg";
import { LoginOrSignup } from "../components/LoginSingup";
import { CustomModal } from "../components/Moda";
import { Dribbble, TwitterIcon, User, X } from "lucide-react";
import {  useRef, useState } from "react";
import { Instagram } from "lucide-react";
import toast from "react-hot-toast";
export const UserLayout = () => {
  const [numberErr, setNumberErr] = useState<boolean>(false);
  const [phonenumber, setPhoneNumber] = useState<string>("");

  const loginModalRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <header className="w-full h-20 flex items-center justify-center sticky top-0 left-0 z-10 bg-white">
        <div
          className="w-[90%] h-10 flex justify-between items-center "
          data-aos="fade-right"
        >
          <img src={logo} className="h-full" alt="" />
          <div className="flex h-full items-center gap-3 md:gap-6">
            <div
              className="flex  md:gap-2 items-center cursor-pointer"
              onClick={() => {
                toast("Please create an account", {
                  className: "px-4 h-10",
                  style: { color: "green",border:"1px solid green",outline:"1px solid green" },
                  icon:<User className="w-5" />
                });
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
              <div className="min-h-96 grid grid-cols-1 md:grid-cols-2">
                <div
                  className={`bg-[url(${loginImg})] bg-cover h-full hidden md:flex relative`}
                >
                  <img src={loginImg} className="w-full h-full" alt="" />
                  <img
                    src={loginTop}
                    className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-72"
                    alt=""
                  />
                </div>
                <div className="p-6 flex flex-col gap-5">
                  <div className="w-full h-12 text-[18px] flex gap-1 items-start border-b">
                    <span className="font-semibold">Login</span>
                    <span className="font-semibold">/</span>{" "}
                    <span className="font-semibold">Sign Up</span>
                  </div>

                  <div className="mt-8 flex flex-col gap-1">
                    <div className=" flex flex-col gap-2">
                      <label
                        htmlFor=""
                        className="capitalize text-[#6c6c6c] flex gap-1 text-[14px]"
                      >
                        Enter mobile number
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="w-full flex h-12 border rounded-md overflow-hidden">
                        <div className="w-24  flex h-full items-center px-2 gap-2  justify-center border-r">
                          <span>+91 </span>
                          <img src={indFlag} alt="" />
                        </div>
                        <div className="h-full w-full">
                          <input
                            type="text"
                            value={phonenumber}
                            onChange={(e) => {
                              if (!Number.isInteger(Number(e.target.value))) {
                                setNumberErr(true);
                              } else {
                                setNumberErr(false);
                                setPhoneNumber(e.target.value);
                              }
                              if (phonenumber.length >= 10) {
                                setNumberErr(phonenumber.length == 10);
                              } else {
                                setNumberErr(phonenumber.length == 10);
                              }
                            }}
                            className={`w-full h-full rounded-tr-md rounded-br-md outline-none px-5 ${
                              numberErr && "border border-red-600"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                    {numberErr && (
                      <>
                        <span className="text-red-600 text-[13px]">
                          Please enter a valid number
                        </span>
                      </>
                    )}
                  </div>
                  <div
                    className={`w-full rounded-md h-12 items-center justify-center flex gap-1   ${
                      phonenumber.length == 10
                        ? "bg-[#00b562] text-white font-semibold shadow-lg shadow-[#00914e]"
                        : "bg-[#f7f8f8] pointer-events-none"
                    }`}
                    role="button"
                  >
                    Send <span className="uppercase">Otp</span>
                  </div>
                </div>
              </div>
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
