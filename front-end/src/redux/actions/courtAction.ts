import { axiosInstance } from "@/constants/axiosInstance";
import { Court } from "@/types/courtReducerInitial";
import { handleError } from "@/utils/handleError";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const courtAddAction = createAsyncThunk(
  "courts/add-court",
  async (sendPayload: Court, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/add-court", {
        courtName: sendPayload.courtName,
        sportId: sendPayload.sportId,
        normalcost: sendPayload.normalcost
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);


