/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/constants/axiosInstance";
import { handleError } from "@/utils/handleError";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const listAllBookings = createAsyncThunk(
  "bookings/list-all-bookings",
  async (search : string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/list-bookings`, {
        params: { search }
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const fetchBookedSlots = createAsyncThunk(
  "bookings/fetch-booked-slots",
  async ({ courtId, date }: { courtId: string; date: any }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/booked-slots", {date,courtId});
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const updateBookingPaymentStatus = createAsyncThunk(
  "bookings/update-payment-status",
  async ({ bookingId, value }: { bookingId: string; value: any }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/update-payment-status", {bookingId,value});
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
export const bookingsByDate = createAsyncThunk(
  "bookings/bookings-by-date",
  async (date: any, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/bookings-by-date", {date});
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "bookings/delete-booking",
  async(bookingId: string, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.delete(`/delete-booking/${bookingId}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error))
    }
  }
)
