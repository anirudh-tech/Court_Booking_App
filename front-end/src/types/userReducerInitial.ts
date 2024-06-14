import { ConfirmationResult } from "firebase/auth";

export interface UserReducerInitial {
  loading: boolean;
  err: boolean | string;
  verification: ConfirmationResult | null;
  user: User | null;
  isVerified: boolean;
}

export interface User {
  phonenumber: number;
}
