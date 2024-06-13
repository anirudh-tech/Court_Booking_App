import { Loader } from "lucide-react";
import  { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ChildProp {
  children: ReactNode;
  type: "submit" | "button";
  className?: string;
  loading: boolean;
  onClick?: () => void;
}
export function LoaderButton({
  children,
  type,
  className,
  loading,
  onClick,
}: ChildProp) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={twMerge(
        "h-12  w-full bg-custom-gradient text-white flex gap-2 items-center justify-center border rounded-md",
        className,
        loading && "pointer-events-none "
      )}
    >
      {children}
      {loading && (
        <>
          <Loader className="animate-spin" />
        </>
      )}
    </button>
  );
}
