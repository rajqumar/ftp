import React from 'react';

import { Provider } from 'react-redux';

import Head from 'next/head';
import App from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { config } from '@fortawesome/fontawesome-svg-core' // 👈
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import withReduxStore from 'utils/with-redux-store';
import 'bootstrap/dist/css/bootstrap.min.css';

class Srr extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>FTP by HelloSME</title>
        </Head>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
        <ToastContainer />
      </React.Fragment>
    );
  }
}

export default withReduxStore(Srr);
