import { createSlice } from "@reduxjs/toolkit";
import { fetchEmirates } from "./emiratesActions";

const emiratesSlice = createSlice({
  name: "emirates",
  initialState: {
    emirates: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmirates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmirates.fulfilled, (state, action) => {
        state.loading = false;
        state.emirates = action.payload;
      })
      .addCase(fetchEmirates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default emiratesSlice.reducer;
