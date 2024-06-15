import { CourtInitial } from "@/types/courtReducerInitial";
import { createSlice } from "@reduxjs/toolkit";
import { courtAddAction, listAllCourts } from "../actions/courtAction";
import toast from "react-hot-toast";

const initialState: CourtInitial = {
  loading: false,
  court: null,
  courts: null,
  err: false,
};
const courtReducer = createSlice({
  name: "court reducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(courtAddAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(courtAddAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.court = payload.data;
        state.courts?.push(payload.data);
        state.err = false;
      })
      .addCase(courtAddAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload as string;
        toast.error(state.err);
      })
      .addCase(listAllCourts.pending, (state) => {
        state.loading = true;
      })
      .addCase(listAllCourts.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ payload:", payload)
        state.loading = false;
        state.courts = payload.data;
        state.err = false;
      })
      .addCase(listAllCourts.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload as string;
        state.courts = null;
      });
  },
});
export default courtReducer.reducer;
