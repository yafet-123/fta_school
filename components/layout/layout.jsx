import React from 'react';
import { Footer } from '../common/Footer';
import { Navbar } from '../common/Navbar';


const Layout = ({ children, session, pageProps }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar session={session} pageProps={pageProps} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

