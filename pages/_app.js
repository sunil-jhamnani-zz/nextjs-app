import React from 'react';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import Head from 'next/head';
import App, { Container } from 'next/app';
import makeStore from '../store';

class PaysenseApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {})
      }
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Head>
          <title>Paysense assignment App</title>
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(PaysenseApp);
