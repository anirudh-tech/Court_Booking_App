/* eslint-disable @typescript-eslint/no-unused-vars */
import loginTop from "@/assets/Images/login-top.png";
import { useEffect, useRef, useState } from "react";

import { PhoneInput } from "../custom/phone-input";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/config/firebase/firebaseconfig";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setUserLocally,
  setVerfication,
} from "@/redux/reducers/userReducer";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shadcn/ui/input-otp";
import { LoaderButton } from "../custom/LoaderButton";
import { AppDispatch, RootState } from "@/redux/store";
import toast from "react-hot-toast";
import { formatOtpTime } from "@/utils/formatOtpTIme";
import { LoaderPinwheel } from "lucide-react";
import { userAuthAction } from "@/redux/actions/userActions";
export function LoginOrSignupPage() {
  const [numberErr, setNumberErr] = useState<string>("");
  const [phonenumber, setPhoneNumber] = useState<string>("");

  const [otp, setOtp] = useState<string>();

  const dispatch: AppDispatch = useDispatch();
  const { verification, loading } = useSelector(
    (state: RootState) => state.user
  );

  const OTP_VALIDITY_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
  const [otpSentTime, setOtpSentTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(OTP_VALIDITY_DURATION);

  useEffect(() => {
    if (otpSentTime) {
      const interval = setInterval(() => {
        const timeElapsed = Date.now() - otpSentTime;
        const remainingTime = OTP_VALIDITY_DURATION - timeElapsed;
        setTimeLeft(remainingTime > 0 ? remainingTime : 0);

        if (remainingTime <= 0) {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [OTP_VALIDITY_DURATION, otpSentTime]);
  const sendOTp = async () => {
    dispatch(setLoading(true));
    try {
      if (!phonenumber || phonenumber.trim() == "") {
        setNumberErr("Please fill phone number");
        return;
      }
      console.log(import.meta.env);

      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});

      const confirmationresult = await signInWithPhoneNumber(
        auth,
        phonenumber,
        recaptcha
      );

      dispatch(
        setUserLocally({
          user: {
            phonenumber: phonenumber,
          },
          isVerified: false,
        })
      );
      dispatch(setVerfication(confirmationresult));
      setOtpSentTime(Date.now());
      console.log("🚀 ~ sendOTp ~ confirmation:", confirmationresult);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setNumberErr(error.message.split(":")[1].trim());
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const verifyOtp = async () => {
    dispatch(setLoading(true));
    try {
      await verification?.confirm(otp ? otp : "");

      dispatch(userAuthAction({ phoneNumber: phonenumber })).then(() => {});
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("🚀 ~ verifyOtp ~ error:", error);
      toast.error(error?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const captchaRef = useRef<HTMLDivElement>(null);
  return (
    <div className="md:min-h-[540px] min-h-[400px] grid grid-cols-1 lg:grid-cols-2">
      <div
        className={`h-full hidden lg:flex relative`}
        style={{
          background: "url('./images/login-bg.png')",
          backgroundSize: "cover",
        }}
      >
        {/* <img src={"./images/login-bg.png"} className="w-full h-full" alt="" /> */}
        <img
          src={loginTop}
          className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-72"
          alt=""
        />
      </div>
      {!verification ? (
        <>
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
              </div>
              {!verification && (
                <>
                  <div
                    id="recaptcha"
                    className="w-full mt-2"
                    ref={captchaRef}
                  ></div>
                </>
              )}
              {numberErr && numberErr !== "" && (
                <>
                  <span className="text-red-600 text-[13px]">{numberErr}</span>
                </>
              )}
            </div>
            <div
              className={`w-full rounded-md h-12 items-center justify-center flex gap-1 ${
                loading && "pointer-events-none"
              }   ${"bg-[#00b562] text-white font-semibold shadow-lg shadow-[#00914e]"}`}
              role="button"
              onClick={sendOTp}
            >
              {loading ? (
                <>
                  <span className="flex gap-2">
                    Processing <LoaderPinwheel className="w-5 animate-spin" />
                  </span>
                </>
              ) : (
                <>
                  Send <span className="uppercase">Otp</span>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="h-full p-6 overflow-hidden">
            <div className=" h-12 text-[18px] flex gap-1 items-start  relative">
              <span className="font-semibold">Verify your otp</span>
              <div className="absolute left-0 bottom-0 h-[1px] w-full bg-black rounded-sm">
                <div className="h-full w-full bg-gray-200"></div>
              </div>
            </div>
            <div className="h-full   flex flex-col gap-4">
              <div className="h-16 flex items-center justify-center mt-8">
                <InputOTP maxLength={6} onChange={(value) => setOtp(value)}>
                  <InputOTPGroup className="flex gap-2">
                    <InputOTPSlot
                      className="border dark:border-border border-textPrimary rounded-xl font-semibold text-3xl h-14 w-14"
                      index={0}
                    />
                    <InputOTPSlot
                      className="border dark:border-border border-textPrimary rounded-xl font-semibold text-3xl h-14 w-14"
                      index={1}
                    />
                    <InputOTPSlot
                      className="border dark:border-border border-textPrimary rounded-xl font-semibold text-3xl h-14 w-14"
                      index={2}
                    />
                    <InputOTPSlot
                      className="border dark:border-border border-textPrimary rounded-xl font-semibold text-3xl h-14 w-14"
                      index={3}
                    />
                    <InputOTPSlot
                      className="border dark:border-border border-textPrimary rounded-xl font-semibold text-3xl h-14 w-14"
                      index={4}
                    />
                    <InputOTPSlot
                      className="border dark:border-border border-textPrimary rounded-xl font-semibold text-3xl h-14 w-14"
                      index={5}
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="w-full flex justify-between md:w-96 mx-auto ">
                <span>{formatOtpTime(timeLeft)}</span>
                <span className="text-[13.5px] underline">Resend otp</span>
              </div>
              <div className=" flex items-center h-16 flex-col w-full">
                <LoaderButton
                  className="md:w-96 "
                  onClick={verifyOtp}
                  loading={loading}
                  type="submit"
                >
                  Verify otp
                </LoaderButton>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
