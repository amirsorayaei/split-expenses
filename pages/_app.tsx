import { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "@/assets/css/fonts.css";
import "../styles/globals.css";

import { persistor, store } from "@/redux/store";
import ThemeProvider from "@/theme/ThemeProvider";
import BaseLayout from "@/layouts/BaseLayout";
import DialogAlert from "@/components/DialogAlert";
import SnackHOC from "@/components/Snack/SnackHOC";
import SnackProvider from "@/components/Snack/SnackProvider";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface SplitAppProps extends AppProps {
  Component: NextPageWithLayout;
}

export const metadata = {
  title: "Split Expenses - Easily Manage and Split Group Expenses",
  description:
    "Split Expenses is a simple, intuitive app for tracking, managing, and splitting expenses with friends, roommates, and groups.",
};

function Split(props: SplitAppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Split Expenses - Easily Manage and Split Group Expenses</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider>
        <SnackProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <DialogAlert />
              <SnackHOC />
              <BaseLayout>
                <Component {...pageProps} />
              </BaseLayout>
            </PersistGate>
          </Provider>
        </SnackProvider>
      </ThemeProvider>
    </>
  );
}

export default Split;
