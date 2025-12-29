import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function MainLayout() {
  return (
    <div>
      <Topbar />
      <div className="">
        <Sidebar />
        <div className="sm:ml-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
