/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/constants/axiosInstance";
import { handleError } from "@/utils/handleError";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const listAllBookings = createAsyncThunk(
  "bookings/list-all-bookings",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/list-bookings`);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);




