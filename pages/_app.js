import "../styles/globals.css";
<<<<<<< HEAD
import Layout from '../components/layout/layout';
import { SessionProvider } from "next-auth/react";
=======
import { Navbar } from "../components/common/Navbar";
import Layout from '../components/layout/layout';
import { SessionProvider } from "next-auth/react"
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
<<<<<<< HEAD
      <Layout session={session} pageProps={pageProps}>
=======
      <Layout>
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
