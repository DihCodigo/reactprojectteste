import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './layout.css';

function Layout({ children }) {
  return (
    <>
      <Header />
      <main style={{ padding: '20px 30px' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
