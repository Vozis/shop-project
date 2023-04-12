import React, { FC } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
