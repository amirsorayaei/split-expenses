import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../types/Types";

const initialState: AppState = {
  value: 0,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    increment: (state) => {
      state.value += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment } = appSlice.actions;

export default appSlice.reducer;
