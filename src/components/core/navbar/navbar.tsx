"use client";
import { FC } from "react";
// Components
import Notification from "./notifications";
import Toolbar from "./toolbar";

const Navbar: FC = () => {
  return (
    <nav className="ubuntu-panel">
      <div className="panel-inner">
        {/* Left: Activities */}
        <div className="panel-left">
          <button className="panel-activities-btn">Activities</button>
        </div>

        {/* Center: Date/Time */}
        <div className="panel-center">
          <Notification />
        </div>

        {/* Right: System Tray */}
        <div className="panel-right">
          <Toolbar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
