import { Court } from "./courtReducerInitial";
import { User } from "./userReducerInitial";

interface Booking {
  _id?:string;
  courtId: Court;
  date: Date;
  startTime: string;
  userId: User;
  duration: number;
  endTime: string;
  status: "Booked" | "RequestingCancel" | "Cancelled" | "Played" | "Pending";
  amount: number;
  paymentStatus: "Pending" | "Failed" | "Success";
  paymentMethod: "Online" | "Offline";
  createdAt?: Date;
}



export interface BookingInitial {
  loading: boolean;
  err: boolean | string;
  bookings: Booking[] | null;
}