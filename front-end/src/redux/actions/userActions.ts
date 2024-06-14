import { axiosInstance } from "@/constants/axiosInstance";
import { generateJWT } from "@/utils/generateJwt";
import { handleError } from "@/utils/handleError";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userAuthAction = createAsyncThunk(
  "user/login-or-signup",
  async ({ phoneNumber }: { phoneNumber: string }, { rejectWithValue }) => {
    try {
      console.log(phoneNumber);

      axiosInstance.interceptors.request.use(
        (config) => {
          config.headers["Authorization"] = generateJWT({
            phoneNumber: String(phoneNumber),
          });
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      const { data } = await axiosInstance.post(`/user-login`, {
        phoneNumber,
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetch-user",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/fetch-user`);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout-user",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/logout`);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
