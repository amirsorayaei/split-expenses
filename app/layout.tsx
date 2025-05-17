"use client";

import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@/components/theme-provider";
import { persistor, store } from "@/src/redux/store";
import SnackProvider from "@/src/components/Snack/SnackProvider";
import DialogAlert from "@/src/components/DialogAlert";
import SnackHOC from "@/src/components/Snack/SnackHOC";
import BaseLayout from "@/src/layouts/BaseLayout";
import { ConvexClientProvider } from "./ConvexClientProvider";

import "@/src/assets/css/fonts.css";
import "../styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <SnackProvider>
                <Provider store={store}>
                  <PersistGate loading={null} persistor={persistor}>
                    <DialogAlert />
                    <SnackHOC />
                    <BaseLayout>{children}</BaseLayout>
                  </PersistGate>
                </Provider>
              </SnackProvider>
            </ThemeProvider>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
