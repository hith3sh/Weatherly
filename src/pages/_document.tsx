import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Blocking script to prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getInitialTheme() {
                  try {
                    const savedTheme = localStorage.getItem('theme');
                    if (savedTheme) return savedTheme;
                    
                    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    return systemTheme;
                  } catch (e) {
                    return 'dark'; // fallback to dark theme
                  }
                }

                const theme = getInitialTheme();
                document.documentElement.setAttribute('data-theme', theme);
                document.documentElement.style.visibility = 'visible';
              })();
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html {
                visibility: hidden;
              }
            `,
          }}
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Weather application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
