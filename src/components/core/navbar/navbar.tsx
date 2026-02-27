"use client";
import { FC } from "react";
// Components
import Notification from "./notifications";
import Toolbar from "./toolbar";

const Navbar: FC = () => {
  return (
    <nav className="z-10 fixed bg-cool-grey top-0 w-full">
      <div className="flex flex-row justify-between px-3 py-1">
        <div />
        <Notification />
        <Toolbar />
      </div>
    </nav>
  );
};

export default Navbar;
