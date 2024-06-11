import { motion } from "framer-motion";
import womenImage from "../assets/Images/womenImage.jpg";
export const Home = () => {
  return (
    <main className="w-full ">
      <div className="mx-auto w-[90%] min-h-96">
        <motion.div
          initial={{ translateY: -300 }}
          transition={{ duration: 0.75, ease: "easeIn" }} // Add transition properties here
          animate={{ translateY: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 lg:w-[90%] mx-auto"
        >
          <motion.div
            transition={{ duration: 1, ease: "easeIn" }} // Add transition properties here
            initial={{ translateX: -240, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            className="relative gap-2 flex flex-col md:block "
          >
            <img src={womenImage} className="w-full md:w-[78%]" alt="" />
            <div className="md:absolute right-0 bottom-0 w-full md:w-80 h-14 md:h-40 flex items-center px-5 justify-center   text-white bg-black shadow-md">
              <h1 className="font-bold  md:text-2xl text-center uppercase leading-8">
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
                  We welcome you to our club
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
                <button
                  className="h-12 uppercase w-48 text-sm font-semibold flex items-center text-black
                tracking-wider justify-center bg-[#4cd681] hover:bg-[#008855] hover:text-white transition-all duration-200"
                >
                  join now
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
        {/* #4cd681 */}
      </div>
    </main>
  );
};
