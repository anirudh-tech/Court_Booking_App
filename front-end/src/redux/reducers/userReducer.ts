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
    setUserLocally: (state, { payload }) => {
      state.user = payload.user;
      state.isVerified = payload.verified;
    },
  },
  extraReducers: () => {},
});
export default userReducer.reducer;
export const { setVerfication, setLoading,setUserLocally } = userReducer.actions;
