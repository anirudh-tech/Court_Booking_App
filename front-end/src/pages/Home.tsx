import { motion } from "framer-motion";
import womenImage from "../assets/Images/womenImage.jpg";
import court1 from "../assets/Images/court1.jpg";
import court2 from "../assets/Images/court2.jpg";
import court3 from "../assets/Images/court3.jpg";
import court4 from "../assets/Images/court4.jpg";
import court5 from "../assets/Images/court5.jpg";
import court6 from "../assets/Images/court6.jpg";
import court7 from "../assets/Images/court7.jpg";
import court8 from "../assets/Images/court8.jpg";

import { Calendar, Clock, IndianRupee, MoveRight, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import toast from "react-hot-toast";
import { CustomModal } from "@/components/Moda";

import { LoginOrSignupPage } from "@/components/auth/LoginOrSignup";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { listAllCourts } from "@/redux/actions/courtAction";
export const Home = () => {
  const { isVerified, user } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (user && user?._id) {
      loginModalCloseRef.current?.click();
    }
  }, [user]);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(listAllCourts());
  }, [dispatch]);
  const loginModalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const loginModalCloseRef = useRef<HTMLDivElement>(null);

  const { courts } = useSelector((state: RootState) => state.court);
  const handleNavigateWithSport = (sport: string, sportId: string) => {
    sport;
    sportId;
    if (!isVerified) {
      toast.error("Please create an account");
      loginModalRef.current?.click();
    } else {
      navigate(`/booking?sport=${sport}&spId=${sportId}`);
    }
  };
  return (
    <main className="w-full ">
      <div className="mx-auto w-[90%] min-h-96">
        <motion.div
          initial={{ translateY: -300 }}
          transition={{ duration: 0.75, ease: "easeIn" }} // Add transition properties here
          animate={{ translateY: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 lg:w-[90%] mx-auto"
        >
          <motion.div className="relative gap-2 flex flex-col md:block ">
            <img src={womenImage} className="w-full md:w-[78%]" alt="" />
            <div className="md:absolute right-0 bottom-0 w-full md:w-80 min-h-14 md:h-40 flex items-center px-5 justify-center md:py-0   text-white bg-black shadow-md">
              <h1 className="font-bold  md:text-2xl text-center uppercase leading-8 ">
                Our courts make the world’s top 10
              </h1>
            </div>
          </motion.div>
          <motion.div className=" flex items-center justify-center">
            <div className="min-h-96 md:w-[80%] w-full ">
              <div className="w-full h-10">
                <span className="uppercase font-semibold text-sm tracking-wider">
                  hello !
                </span>
              </div>
              <div className="w-full mt-2 md:mt-5">
                <h1 className="uppercase text-center md:text-left text-5xl font-bold tracking-tighter">
                  Reserve your spot with us now
                </h1>
              </div>
              <div className="w-full mt-3 md:mt-5">
                <p className="text-justify text-[#6c6c6c] leading-8 text-[16px]">
                  Located in Chennai, LSA – Lal Sports Academy is a
                  distinguished sports club. Situated in Old Pallavaram, this
                  establishment brings years of expertise to the realm of
                  health, fitness, and sports, establishing itself as a trusted
                  destination for individuals seeking a holistic approach to
                  wellness.
                </p>
              </div>
              <div className="md:mt-10 mt-4 w-full flex justify-start">
                <>
                  <CustomModal
                    className="w-[90%] sm:w-[75%] md:w-[66%] lg:w-[80%] xl:w-[60%] p-0"
                    TriggerComponent={
                      <button
                        onClick={() => {
                          if (!isVerified) {
                            toast.error("Please create an account");
                            loginModalRef.current?.click();
                          } else {
                            navigate("/booking");
                          }
                        }}
                        className="h-12 uppercase w-full md:w-48 text-sm font-semibold flex items-center text-black
                tracking-wider justify-center bg-[#4cd681] hover:bg-[#464a49] hover:text-white transition-all duration-200"
                      >
                        book now
                      </button>
                    }
                    closeComponent={
                      <div
                        className="cursor-pointer z-20"
                        ref={loginModalCloseRef}
                      >
                        <X className="w-6" />
                      </div>
                    }
                  >
                    <LoginOrSignupPage />
                  </CustomModal>
                </>
              </div>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className="w-full lg:w-[90%] mx-auto mt-5"
          data-aos="fade-up"
        >
          <div className="w-full">
            <h1 className="uppercase font-semibold text-3xl">Preview</h1>
          </div>
          <div
            className="w-full grid sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 mt-3 gap-3"
            data-aos="fade-up"
            data-aos-delay="250"
          >
            <div className="w-full h-80 md:h-56 rounded-md p-3 bg-slate-100">
              <img
                src={court1}
                className="w-full h-full object-cover rounded-sm"
                alt=""
              />
            </div>
            <div className="w-full h-80 md:h-56 rounded-md p-3 bg-slate-100">
              <img
                src={court2}
                className="w-full h-full object-cover rounded-sm"
                alt=""
              />
            </div>
            <div className="w-full h-80 md:h-56 rounded-md p-3 bg-slate-100">
              <img
                src={court3}
                className="w-full h-full object-cover rounded-sm"
                alt=""
              />
            </div>
            <div className="w-full h-80 md:h-56 rounded-md p-3 bg-slate-100">
              <img
                src={court4}
                className="w-full h-full object-cover rounded-sm"
                alt=""
              />
            </div>
            <div className="w-full h-80 md:h-56 rounded-md p-3 bg-slate-100">
              <img
                src={court5}
                className="w-full h-full object-cover rounded-sm"
                alt=""
              />
            </div>
            <div className="w-full h-80 md:h-56 rounded-md p-3 bg-slate-100">
              <img
                src={court6}
                className="w-full h-full object-cover rounded-sm"
                alt=""
              />
            </div>
            <div className="w-full h-80 md:h-56 rounded-md p-3 bg-slate-100">
              <img
                src={court7}
                className="w-full h-full object-cover rounded-sm"
                alt=""
              />
            </div>
            <div className="w-full h-80 md:h-56 rounded-md p-3 bg-slate-100">
              <img
                src={court8}
                className="w-full h-full object-cover rounded-sm"
                alt=""
              />
            </div>
          </div>
        </motion.div>
        <motion.div className="w-full lg:w-[90%] mx-auto mt-5">
          <div className="w-full">
            <h1 className="uppercase font-semibold text-3xl">
              Available courts
            </h1>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 ">
            {courts?.map((court) => (
              <div
                className="w-full min-h-38  rounded-md p-4 border-2 shadow-md relative"
                data-aos="fade-down"
                dat-aos-delay={`100`}
              >
                <div className="w-full flex gap-2 items-center">
                  <img
                    src={court?.sportId?.split("[(*)]")[1]}
                    className="w-6"
                    alt=""
                  />
                  <span className="font-semibold">
                    {court?.sportId?.split("[(*)]")[0]}
                  </span>
                </div>
                <div className="w-full pl-8 flex flex-col text-[14px] text-[#2a2a2a] ">
                  <div className="flex flex-col mt-2">
                    <div className="flex gap-1 items-center ">
                      <Calendar className="w-5" />
                      <span>
                        {court.normalcost.day.from} - {court.normalcost.day.to}
                      </span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Clock className="w-5" />
                      <div className="flex gap-1">
                        <span>{court.normalcost.time.from}</span>
                        <span>-</span>
                        <span>{court.normalcost.time.to}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <IndianRupee className="w-5" />
                      <span>{court.normalcost.price} / Hour</span>
                    </div>
                  </div>
                  <div className="flex flex-col mt-3">
                    <div className="flex gap-1 items-center min-h-5 ">
                      {court?.specialcost?.category == "time" ? (
                        <>
                          <Clock className="w-5" />
                          <div className="flex gap-1">
                            <span>{court?.specialcost?.diff?.from} </span>
                            <span>-</span>
                            <span>{court?.specialcost?.diff?.to} </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex gap-1 items-center h-6 ">
                          {court?.specialcost?.category == "day" && (
                            <>
                              <Calendar className="w-5" />
                              <span>
                                {court?.specialcost?.diff?.from} -{" "}
                                {court?.specialcost?.diff?.to}
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1 min-h-5 ">
                      {court?.specialcost?.price && (
                        <>
                          <IndianRupee className="w-5" />
                          <span>{court?.specialcost?.price} / Hour</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="pl-8 w-full mt-3">
                  <button
                    onClick={() =>
                      handleNavigateWithSport(
                        String(String(court?.sportId)),
                        String(court?.sportdetail?._id)
                      )
                    }
                    className="h-10  w-[60%] gap-2 items-center rounded-md flex tracking-wider justify-center bg-[#4cd681] hover:bg-[#008855] hover:text-white transition-all duration-200"
                  >
                    Book now <MoveRight className="w-5 mt-[3px]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
};
