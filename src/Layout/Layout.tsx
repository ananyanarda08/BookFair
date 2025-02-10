import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";


type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className=" min-h-screen bg-gray-100">
        <Header />
        {children}
      </div>
  );
};

export default Layout;
