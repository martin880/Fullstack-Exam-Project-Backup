import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="flex min-h-screen mt-6">
        <aside className="w-1/6 bg-gray-200">
          <Sidebar />
        </aside>
        <main className="flex-1 bg-gray-100">{children}</main>
      </div>
    </React.Fragment>
  );
};

export default Layout;
