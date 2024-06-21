import { BookingInitial } from "@/types/bookingReducerInitial";
import { createSlice } from "@reduxjs/toolkit";
import { fetchBookedSlots, listAllBookings, updateBookingPaymentStatus } from "../actions/bookingAction";

const initialState: BookingInitial = {
  loading: false,
  bookings: null,
  err: false,
};
const bookingReducer = createSlice({
  name: "booking reducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listAllBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(listAllBookings.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ payload:", payload);
        state.loading = false;
        state.bookings = payload.data;
        state.err = false;
      })
      .addCase(listAllBookings.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload as string;
        state.bookings = null;
      })
      .addCase(updateBookingPaymentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBookingPaymentStatus.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ payload:", payload);
        state.loading = false;
        state.bookings = payload.data;
        state.err = false;
      })
      .addCase(updateBookingPaymentStatus.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload as string;
        state.bookings = null;
      })
      .addCase(fetchBookedSlots.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookedSlots.fulfilled, (state) => {
        state.loading = false;
      });
  },
});
export default bookingReducer.reducer;
