import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '../styles/weather.css';
import '../styles/theme-toggle.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
