import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// As a basic setup, import your same slice reducers
import GroupReducer from "@/redux/slices/groupSlice";
import ThemeProvider from "@/theme/ThemeProvider";
import SnackProvider from "@/components/Snack/SnackProvider";
import DialogAlert from "@/components/DialogAlert";
import SnackHOC from "@/components/Snack/SnackHOC";

export function renderWithUtils(
  ui: any,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: { group: GroupReducer },
      preloadedState,
    }),
    ...renderOptions
  }: any = {}
) {
  function Wrapper({ children }: { children: any }) {
    return (
      <ThemeProvider>
        <SnackProvider>
          <Provider store={store}>
            <DialogAlert />
            <SnackHOC />
            {children}
          </Provider>
        </SnackProvider>
      </ThemeProvider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
