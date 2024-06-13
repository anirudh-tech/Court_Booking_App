import { UserReducerInitial } from "@/types/userReducerInitial";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserReducerInitial = {
  loading: false,
  err: false,
  user: null,
  verification: null,
  isVerified: false,
};
const userReducer = createSlice({
  name: "user reducer",
  initialState,
  reducers: {
    setVerfication: (state, { payload }) => {
      state.verification = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
  extraReducers: () => {},
});
export default userReducer.reducer;
export const { setVerfication,setLoading } = userReducer.actions;
