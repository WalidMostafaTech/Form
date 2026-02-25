import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSettings } from "../../api/mainServices";

export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getSettings();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.error_msg || "Failed to load settingss",
      );
    }
  },
);

const appSettings = createSlice({
  name: "settings",
  initialState: {
    settings: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default appSettings.reducer;
