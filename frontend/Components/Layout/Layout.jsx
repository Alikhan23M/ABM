import React from 'react';
import Header from '../Header/Header';
import Footer2 from '../Footer/Footer';
import "../../index.css"
const Layout = ({ children }) => {
  return (
    <div className="flex  overflow-hidden hide_webscrollbar">
      <main className="flex flex-col w-full hide_webscrollbar ">
        <header className="flex items-center justify-center">
          <Header />
        </header>
        <div className="md:flex-grow overflow-y-auto hide_webscrollbar dashboard-2-scrollbar">
          {children}
        </div> 
          <Footer2 />
      </main>
    </div>
  );
  };

export default Layout;