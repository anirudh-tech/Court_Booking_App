import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useRef, useState } from "react";

interface ChildProp {
  TriggerComponent: ReactNode;
  closeComponent: ReactNode;
  title?: string;
  children: ReactNode;
  className?: string;
  typeOfBtn?: "mainButton" | "other";
}

const modalVariants = {
  open: { opacity: 1, translateX: 0 },
  closed: { opacity: 0, translateX: -4 },
};
export const CustomModal = ({
  TriggerComponent,
  closeComponent,
  children,
  className,
  typeOfBtn,
}: ChildProp) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const closeRef = useRef<HTMLDivElement>(null);
  return (
    <main className={typeOfBtn == "mainButton" && "w-full md:w-auto"}>
      <div onClick={openModal} className="cursor-pointer ">
        {TriggerComponent}
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial="closed"
              animate="open"
              exit={"closed"}
              variants={modalVariants}
              transition={{ duration: 0.2, ease: "easeOut", delay: 0 }}
              onClick={() => closeRef.current?.click()}
              className="fixed z-30 inset-0 flex items-center justify-center bg-slate-950  bg-opacity-45"
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                exit={{ width: 0, height: 0, rotateX: "45deg" }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0 }}
                className={`bg-[white]  rounded-md  relative ${className}`}
              >
                <div
                  className="absolute right-5 top-5 z-20"
                  onClick={closeModal}
                  ref={closeRef}
                >
                  {closeComponent}
                </div>
                <div>{children}</div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
};
