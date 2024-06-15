import { axiosInstance } from "@/constants/axiosInstance";
import { Sport } from "@/types/sportsReducerInita";
import { handleError } from "@/utils/handleError";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sportAddAction = createAsyncThunk(
  "sports/add-sport",
  async (sendPayload: Sport, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/add-sport", {
        sportName: sendPayload.sportName,
        image: sendPayload.image,
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const editSport = createAsyncThunk(
  "sports/edit-sport",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (sendPayload: any, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch("/edit-sport", sendPayload);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const listAlsports = createAsyncThunk(
  "sports/list-allsports",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/list-sports`);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const deleteSport = createAsyncThunk(
  "sports/delete-sports",
  async (sportId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/delete-sport/${sportId}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
