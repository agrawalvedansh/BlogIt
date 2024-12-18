import React from "react";

import { Book, HamburgerMenu, User } from "@bigbinary/neeto-icons";
import classNames from "classnames";
import { useLocation, Link } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();

  return (
    <header className="bg-primary-white sticky left-0 z-20 flex h-screen w-16 flex-col items-center gap-4 border-b border-r-2 py-10">
      <Link
        to="/dashboard"
        className={classNames("", {
          "rounded-md border-4 border-black":
            location.pathname === "/dashboard",
        })}
      >
        <Book size={30} />
      </Link>
      <HamburgerMenu size={30} />
      <User className="mt-auto" size={30} />
    </header>
  );
};

export default SideBar;
