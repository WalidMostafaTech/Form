import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEmirates } from "../../api/mainServices";

export const fetchEmirates = createAsyncThunk(
  "emirates/fetchEmirates",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getEmirates();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.error_msg || "Failed to load categories",
      );
    }
  },
);
