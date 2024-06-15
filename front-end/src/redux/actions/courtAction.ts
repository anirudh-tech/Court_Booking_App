import { axiosInstance } from "@/constants/axiosInstance";
import { Court } from "@/types/courtReducerInitial";
import { handleError } from "@/utils/handleError";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const courtAddAction = createAsyncThunk(
  "courts/add-court",
  async (sendPayload: Court, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/add-court", sendPayload);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const listAllCourts = createAsyncThunk(
  "courts/list-all-courts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/list-court`);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const deleteCourt = createAsyncThunk(
  "court/delete-court",
  async (courtId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/delete-court/${courtId}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
