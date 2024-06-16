
import { LoaderCircle } from "lucide-react";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ChildProp {
  children: ReactNode;
  type: "submit" | "button";
  className?: string;
  loading: boolean;
  onClick?: () => void;
  from?: "logout" | "others";
}
export function LoaderButton({
  children,
  type,
  className,
  loading,
  onClick,
  from = "others",
}: ChildProp) {
  return (
    <>
      {from == "others" ? (
        <>
          <button
            onClick={onClick}
            type={type}
            className={twMerge(
              "h-12  w-full bg-custom-gradient text-white flex gap-2 items-center justify-center  rounded-md",
              className,
              loading && "pointer-events-none bg-green-500"
            )}
          >
            {children}
            {loading && (
              <>
                <LoaderCircle className="animate-spin" />
              </>
            )}
          </button>
        </>
      ) : (
        <>
          <button
            onClick={onClick}
            type={type}
            className={twMerge(
              "h-12   bg-custom-gradient text-white flex gap-2 items-center justify-center  rounded-md",
              className,
              loading && "pointer-events-none "
            )}
          >
            {children}
            {loading && (
              <>
                <LoaderCircle className="animate-spin" />
              </>
            )}
          </button>
        </>
      )}
    </>
  );
}
