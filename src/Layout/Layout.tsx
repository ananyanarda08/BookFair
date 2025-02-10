import React from "react";
import Header from "../components/Header";


type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="  bg-gray-100">
        <Header />
        {children}
      </div>
  );
};

export default Layout;
