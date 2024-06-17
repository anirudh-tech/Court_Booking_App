import { BookingInitial } from "@/types/bookingReducerInitial";
import { createSlice } from "@reduxjs/toolkit";
import { listAllBookings } from "../actions/bookingAction";

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
      
  },
});
export default bookingReducer.reducer;
