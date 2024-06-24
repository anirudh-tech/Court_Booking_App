import { axiosInstance } from "@/constants/axiosInstance";
import { adminFormSchema } from "@/pages/AdminLogin";
import { generateJWT } from "@/utils/generateJwt";
import { handleError } from "@/utils/handleError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { z } from "zod";

export const userAuthAction = createAsyncThunk(
  "user/login-or-signup",
  async ({ phoneNumber }: { phoneNumber: string }, { rejectWithValue }) => {
    try {

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

export const adminLogin = createAsyncThunk(
  "user/admin/login",
  async (user: z.infer<typeof adminFormSchema>, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/admin-login", user);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
