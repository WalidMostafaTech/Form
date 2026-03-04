import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./categoriesActions";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [{ id: 0, name: "All" }],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = [{ id: 0, name: "All" }, ...action.payload];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default categoriesSlice.reducer;
