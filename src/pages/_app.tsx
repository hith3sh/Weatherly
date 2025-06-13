import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from 'next/head';
import '../styles/weather.css';
import '../styles/moreinfo.css';
import '../styles/rain.css';
import '../styles/snow.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
