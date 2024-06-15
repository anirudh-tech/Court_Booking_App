import { RootState } from "@/redux/store";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ChildProp {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any;
  navigate: string;
}
export const UserProtected = ({ Component, navigate }: ChildProp) => {
  const { isVerified, user } = useSelector((state: RootState) => state.user);
  return (
    <>
      {!isVerified || !user?._id ? <Navigate to={navigate} /> : <Component />}
    </>
  );
};
