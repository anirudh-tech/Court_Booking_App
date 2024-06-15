import { Sport, SportsReducerInital } from "@/types/sportsReducerInita";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteSport,
  editSport,
  listAlsports,
  sportAddAction,
} from "../actions/sportAcion";
import toast from "react-hot-toast";

const initialState: SportsReducerInital = {
  loading: false,
  err: false,
  sport: null,
  sports: null,
};
const sportsReducer = createSlice({
  name: "sports reducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listAlsports.pending, (state) => {
        state.loading = true;
      })
      .addCase(listAlsports.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.sports = payload.data;
      })
      .addCase(listAlsports.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload as string;
        state.sports = null;
        toast.error(state.err);
      })
      .addCase(sportAddAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(sportAddAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.sports?.push(payload.data);
        state.err = false;
        toast.success("Sports added");
      })
      .addCase(sportAddAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload as string;
        toast.error(state.err);
      })
      .addCase(editSport.pending, (state) => {
        state.loading = true;
      })
      .addCase(editSport.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.sports = state.sports?.map((sport) => {
          if (sport._id == payload.id) {
            return payload.data;
          } else {
            return sport;
          }
        }) as Sport[];
        state.err = false;
      })
      .addCase(editSport.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload as string;
        toast.error(state.err);
      })
      .addCase(deleteSport.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSport.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.sports = state.sports?.filter(
          (sport) => sport?._id !== payload.id
        ) as Sport[];
        state.err = false;
      })
      .addCase(deleteSport.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload as string;
        toast.error(state.err);
      });
  },
});

export default sportsReducer.reducer;
