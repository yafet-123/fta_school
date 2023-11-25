import "../styles/globals.css";
import { Navbar } from "../components/common/Navbar";
import Layout from '../components/layout/layout';

export default function App({ Component, pageProps: { ...pageProps } }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
