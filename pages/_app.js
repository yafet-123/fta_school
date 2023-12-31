import "../styles/globals.css";
import { Navbar } from "../components/common/Navbar";
import Layout from '../components/layout/layout';
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
