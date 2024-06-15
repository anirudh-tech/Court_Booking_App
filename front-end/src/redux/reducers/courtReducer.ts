import { CourtInitial } from "@/types/courtReducerInitial";
import { createSlice } from "@reduxjs/toolkit";

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
//   extraReducers: (builder) => {},
});
export default courtReducer.reducer;
