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
import * as gtag from "../lib/gtag"
import { useRouter } from "next/router";
import { useStore } from "zustand";
// import Image from "../ui_assets/images/background.jpg"

// const backgroundImage = {
//   paperContainer: {
//     backgroundImage: `url(${Image})`,
//   },
// };
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {

  const router = useRouter();
  const { currTheme, updateTheme } = useStore(LearnerStore);
  
  useEffect(() => {
    const body = document.querySelector("body");

    //LearnerStore.subscribe(() => {
      

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
//    });
  }, [currTheme]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;

  return (
    <>
    <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Learn Robotics and Programming</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </Head>


        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
