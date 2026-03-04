import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSimpleCategories } from "../../api/mainServices";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getSimpleCategories();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.error_msg || "Failed to load categories",
      );
    }
  },
);
