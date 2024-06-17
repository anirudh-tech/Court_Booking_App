interface Booking {
  _id?:string;
  courtId: string;
  date: Date;
  startTime: string;
  userId: string;
  duration: number;
  endTime: string;
  status: "Booked" | "RequestingCancel" | "Cancelled" | "Played" | "Pending";
  amount: number;
  paymentStatus: "Pending" | "Failed" | "Success";
  paymentMethod: "Online" | "Offline";
}



export interface BookingInitial {
  loading: boolean;
  err: boolean | string;
  bookings: Booking[] | null;
}