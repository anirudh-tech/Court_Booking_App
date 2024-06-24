import { UserReducerInitial } from "@/types/userReducerInitial";
import { createSlice } from "@reduxjs/toolkit";
import {
  adminLogin,
  fetchUser,
  logoutUser,
  userAuthAction,
} from "../actions/userActions";
import toast from "react-hot-toast";

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
  extraReducers: (builder) => {
    builder
      .addCase(userAuthAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(userAuthAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.data;
        state.isVerified = true;
        toast.success("Verification successfull");
      })
      .addCase(userAuthAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload as string;
        toast.error(state.err);
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.data;
        state.isVerified = true;
        state.err = false;
      })
      .addCase(fetchUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload as string;
        state.user = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isVerified = false;
        state.err = false;
        state.verification = null;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload as string;
      })
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.data;
        state.err = false;
      })
      .addCase(adminLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload as string;
        toast.error(state.err);
        state.user = null;
      });
  },
});
export default userReducer.reducer;
export const { setVerfication, setLoading, setUserLocally } =
  userReducer.actions;
