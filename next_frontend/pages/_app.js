import * as React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { SessionProvider } from "next-auth/react";
import ScrollTop from "../components/ScrollTop";
import "../styles/globals.css";
import "../styles/backgroundStyles.css";
import LearnerStore from "../store/LearnerStore";
import Script from "next/script";
// import Image from "../ui_assets/images/background.jpg"

// const backgroundImage = {
//   paperContainer: {
//     backgroundImage: `url(${Image})`,
//   },
// };
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  useEffect(() => {
    const body = document.querySelector("body");

    LearnerStore.subscribe(() => {
      const currTheme = LearnerStore.getState().currTheme;

      body.classList.remove(
        "light-theme",
        "dark-theme",
        "grey-theme",
        "skyBlue-theme"
      );

      if (currTheme === 1) {
        body.classList.add("dark-theme");
      } else if (currTheme === 2) {
        body.classList.add("grey-theme");
      } else if (currTheme === 4) {
        body.classList.add("skyBlue-theme");
      } else {
        body.classList.add("light-theme");
      }
    });
  }, []);

  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;

  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />

      <Script id="google-analytics-script" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
          page_path: window.location.pathname,
          });
    `}
      </Script>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
