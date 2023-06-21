import { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { PersistGate } from "redux-persist/integration/react";

import "@/assets/css/fonts.css";

import { persistor, store } from "@/redux/store";
import createEmotionCache from "@/theme/createEmotionCache";
import ThemeProvider from "@/theme/ThemeProvider";
import BaseLayout from "@/layouts/BaseLayout";
import DialogAlert from "@/components/DialogAlert/DialogAlert";

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface SplitAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

function Split(props: SplitAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  // const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Split</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <CssBaseline />
            <DialogAlert />
            <BaseLayout>
              <Component {...pageProps} />
            </BaseLayout>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default Split;
