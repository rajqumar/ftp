import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Global, css } from '@emotion/core';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  TawkToinit = (tawkToId, readyCallback) => {
    if (!tawkToId) {
      throw new Error('TawkTo id is missing');
    }

    const tawkToScript = document.getElementById('tawkToScript');

    if (tawkToScript) {
      return window.Tawk_API;
    }

    const s1 = document.createElement('script');
    s1.id = 'tawkToScript';
    s1.async = true;
    s1.src = 'https://embed.tawk.to/' + tawkToId + '/default';
    s1.setAttribute('crossorigin', '*');
    const s0 = document.getElementsByTagName('script')[0];

    if (!s0 || !s0.parentNode) {
      throw new Error('DOM is missing');
    }

    s0.parentNode.insertBefore(s1, s0);

    document.body.appendChild(s0);
    document.body.appendChild(s1);

    var check = function(callback) {
      if (window && window.Tawk_API && window.Tawk_API.getStatus() !== undefined && callback !== undefined) {
        callback(window.Tawk_API);
        return;
      }

      setTimeout(function() {
        check(callback);
      }, 0);
    };
    check(readyCallback);
  };

  render() {
    return (
      <Html>
        <Global
          styles={css`
            body,
            html,
            container {
              font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
              font-size: 14px !important;
              overflow-x: hidden;
              overflow-y: auto;
            }
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            .h1,
            .h2,
            .h3,
            .h4,
            .h5,
            .h6 {
              font-family: 'Source Sans Pro', sans-serif !important;
            }
            label {
              font-size: 14px;
              font-weight: 700;
            }
            input[type='number']::-webkit-inner-spin-button,
            input[type='number']::-webkit-outer-spin-button {
              -webkit-appearance: none;
              -moz-appearance: none;
              appearance: none;
              margin: 0;
            }
          `}
        />

        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/static/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#000000" />
          <link rel="shortcut icon" href="/static/favicon/favicon.png" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" />
          <meta name="msapplication-config" content="/static/favicon/browserconfig.xml" />
          <meta name="theme-color" content="#000" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
