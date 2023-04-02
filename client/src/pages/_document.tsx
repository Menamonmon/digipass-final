import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { SITE_CONSTANTS } from "../utils/consts";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="stylesheet" href={SITE_CONSTANTS.GOOGLE_FONTS_URL} />

          {/* Site Description */}
          <meta name="description" content={SITE_CONSTANTS.DESCRIPTION} />

          {/* Open Graph */}
          <meta property="og:title" content={SITE_CONSTANTS.TITLE} />
          <meta property="og:url" content={SITE_CONSTANTS.HOST} />
          <meta property="og:image" content={SITE_CONSTANTS.IMAGE_URL} />
          <meta
            property="og:description"
            content={SITE_CONSTANTS.DESCRIPTION}
          />
          <meta property="og:site_name" content={SITE_CONSTANTS.TITLE} />

          {/* Twitter */}
          <meta name="twitter:card" content={SITE_CONSTANTS.IMAGE_URL} />
          <meta name="twitter:site" content={SITE_CONSTANTS.HOST} />
          <meta name="twitter:title" content={SITE_CONSTANTS.TITLE} />
          <meta
            name="twitter:description"
            content={SITE_CONSTANTS.DESCRIPTION}
          />
          <meta name="twitter:image" content={SITE_CONSTANTS.IMAGE_URL} />

          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        </Head>
        <body data-theme="mytheme">
          <Main />
          <div id="form-modal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
