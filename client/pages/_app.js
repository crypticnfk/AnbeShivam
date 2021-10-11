import { AppWrapper } from '../context/state';
import Layout from '../components/Layout';
import NoSSRWrapper from '../components/nossr'
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

  return (
    <AppWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppWrapper>
  )
}

export default MyApp;
