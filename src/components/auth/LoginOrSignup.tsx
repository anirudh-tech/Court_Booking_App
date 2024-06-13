/* eslint-disable @typescript-eslint/no-unused-vars */
import loginTop from "@/assets/Images/login-top.png";
import { useState } from "react";

import { PhoneInput } from "../custom/phone-input";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/config/firebase/firebaseconfig";
import { useDispatch } from "react-redux";
import { setVerfication } from "@/redux/reducers/userReducer";
export function LoginOrSignupPage() {
  const [numberErr, setNumberErr] = useState<string>("");
  const [phonenumber, setPhoneNumber] = useState<string>("");

  const dispatch = useDispatch();
  const sendOTp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmationresult = await signInWithPhoneNumber(
        auth,
        phonenumber,
        recaptcha
      );

      dispatch(setVerfication(confirmationresult));

      console.log("🚀 ~ sendOTp ~ confirmation:", confirmationresult);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setNumberErr(error.message);
      console.log(error);
    }
  };
  sendOTp;
  return (
    <div className="min-h-96 grid grid-cols-1 md:grid-cols-2">
      <div className={`h-full hidden md:flex relative`}>
        <img src={"./images/login-bg.png"} className="w-full h-full" alt="" />
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
            {/* <div className="w-full flex h-12 border rounded-md overflow-hidden">
              <div className="w-24  flex h-full items-center px-2 gap-2  justify-center border-r">
                <span>+91 </span>
                <img src={indFlag} alt="" />
              </div>
              <div className="h-full w-full">
                <input
                  type="text"
                  placeholder="Enter mobile number"
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
            </div> */}
            <PhoneInput
              placeholder="Enter your phone number"
              defaultCountry="IN"
              onChange={(e) => {
                //   setNumberErr(false);

                // if (phonenumber.length >= 10) {
                //   setNumberErr(phonenumber.length == 10);
                // } else {
                //   setNumberErr(phonenumber.length == 10);
                // }
                setPhoneNumber(e);
              }}
            />
            {phonenumber}
          </div>
          <div id="recaptcha" className="w-full mt-2"></div>
          {numberErr && numberErr !== "" && (
            <>
              <span className="text-red-600 text-[13px]">{numberErr}</span>
            </>
          )}
        </div>
        <div
          className={`w-full rounded-md h-12 items-center justify-center flex gap-1   ${
            // eslint-disable-next-line no-constant-condition
            true
              ? "bg-[#00b562] text-white font-semibold shadow-lg shadow-[#00914e]"
              : "bg-[#f7f8f8] pointer-events-none"
          }`}
          role="button"
          onClick={sendOTp}
        >
          Send <span className="uppercase">Otp</span>
        </div>
      </div>
    </div>
  );
}
