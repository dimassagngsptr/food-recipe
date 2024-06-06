import { api } from "@/pages/api/api";
import { setCookie } from "@/utils/cookie";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const authRegister = createAsyncThunk(
  "auth/register",
  async (data, thunkApi) => {
    try {
      const res = await api.post("/v1/auth/register", data);
      return res?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const authRegisterGoogle = createAsyncThunk(
  "auth/registerGoogle",
  async (data, thunkApi) => {
    try {
      const res = await axios.post("/api/registerUser", {
        name: data?.name,
        email: data?.email,
        password: data?.password,
        phone: data?.phone,
      });
      return res?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const authLogin = createAsyncThunk(
  "auth/login",
  async (data, thunkApi) => {
    try {
      const res = await api.post("/v1/auth/login", data);
      return res?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    data: {},
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(authRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(authRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(authLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        setCookie(action.payload.data.token, action.payload.data.refreshToken);
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(authRegisterGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(authRegisterGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(authRegisterGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
