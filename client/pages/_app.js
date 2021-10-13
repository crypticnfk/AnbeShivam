import { Context } from '../context/state';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { loadWeb3 } from '../utils/web3-utils';
import NoSSRWrapper from '../components/nossr'
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [web3, setweb3] = useState(false);

  useEffect(async() => {
    const web3Connected = await loadWeb3();
    setweb3(web3Connected);
  },[web3]);

  return (
    <Context.Provider value={[web3, setweb3]}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Context.Provider>
  )
}

export default MyApp;
