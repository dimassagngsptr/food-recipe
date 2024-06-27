import { api } from "@/configs/api";
import { getCookie } from "@/utils/cookie";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDetailUser = createAsyncThunk(
  "user/detail",
  async (_, thunkApi) => {
    const { token } = getCookie();
    try {
      const response = await api.get("users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data?.message);
    }
  }
);
export const getMyLikeRecepi = createAsyncThunk(
  "user/like",
  async (_, thunkApi) => {
    const { token } = getCookie();
    try {
      const response = await api.get("recipes/like", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data?.message);
    }
  }
);
export const getMySaveRecepi = createAsyncThunk(
  "user/save",
  async (_, thunkApi) => {
    const { token } = getCookie();
    try {
      const response = await api.get("recipes/save", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data?.message);
    }
  }
);
export const getMyRecepi = createAsyncThunk(
  "user/myRecepi",
  async (_, thunkApi) => {
    const { token } = getCookie();
    try {
      const response = await api.get("recipes/self", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data?.message);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    data: {},
    likeRecepi: [],
    saveRecepi: [],
    myRecepi: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDetailUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDetailUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getDetailUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getMyLikeRecepi.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyLikeRecepi.fulfilled, (state, action) => {
        state.loading = false;
        state.likeRecepi = action.payload;
      })
      .addCase(getMyLikeRecepi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getMySaveRecepi.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMySaveRecepi.fulfilled, (state, action) => {
        state.loading = false;
        state.saveRecepi = action.payload;
      })
      .addCase(getMySaveRecepi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getMyRecepi.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyRecepi.fulfilled, (state, action) => {
        state.loading = false;
        state.myRecepi = action.payload;
      })
      .addCase(getMyRecepi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default userSlice.reducer;
