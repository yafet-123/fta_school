import React from 'react';
import { Footer } from '../common/Footer';
import { Navbar } from '../common/Navbar';

interface LayoutProps {
  children: React.ReactNode;
<<<<<<< HEAD
  session?: any;
  pageProps?: any;
}

const Layout: React.FC<LayoutProps> = ({ children, session, pageProps }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar session={session} pageProps={pageProps} />
=======
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
<<<<<<< HEAD

=======
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
