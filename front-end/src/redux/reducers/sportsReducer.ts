import { SportsReducerInital } from "@/types/sportsReducerInita";
import { createSlice } from "@reduxjs/toolkit";

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
});

export default sportsReducer.reducer;
