import { CourtInitial } from "@/types/courtReducerInitial";
import { createSlice } from "@reduxjs/toolkit";
import { courtAddAction } from "../actions/courtAction";

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
    .addCase(courtAddAction.fulfilled, (state,{payload}) => {
      state.loading = false;
      state.court = payload.data
      state.err = false;
    })
    .addCase(courtAddAction.rejected, (state, { payload }) => {
      state.loading = false;
      state.err = payload as string;
    })
  },
});
export default courtReducer.reducer;
