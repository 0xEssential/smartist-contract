import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react';
import Web3ContextProvider from '../contexts/web3Context';

function MyApp({ Component, pageProps }: AppProps) {
  return(
  <Web3ContextProvider>
    <Component {...pageProps} />
  </Web3ContextProvider>
  );
}
export default MyApp
