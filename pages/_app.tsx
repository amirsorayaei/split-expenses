import { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";

import { store } from "@/redux/store";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface SplitAppProps extends AppProps {
  Component: NextPageWithLayout;
}

function Split(props: SplitAppProps) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Split</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </>
  );
}

export default Split;
