import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Head>
          <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-3W52Y6MHJ5" />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3W52Y6MHJ5', {
            page_path: window.location.pathname,
          });
        `,
            }}
          />
          <link rel="preload" href="https://fonts.googleapis.com" />
          <link rel="preload" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Poppins:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
        </Head>
        <body>
          {/* NProgress Preloader */}
          <div className="nloader">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
