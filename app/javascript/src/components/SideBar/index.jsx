import React from "react";

import { Book, HamburgerMenu, User, Edit } from "@bigbinary/neeto-icons";
import classNames from "classnames";
import { useLocation, Link } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();

  return (
    <header className="bg-primary-white sticky left-0 z-20 flex h-screen w-16 flex-col items-center gap-4 border-b border-r-2 py-10">
      <Book size={30} />
      <Link
        to="/dashboard"
        className={classNames("", {
          "rounded-md border-4 border-black":
            location.pathname === "/dashboard",
        })}
      >
        <HamburgerMenu size={30} />
      </Link>
      <Link
        to="/posts/create"
        className={classNames("", {
          "rounded-md border-4 border-black":
            location.pathname === "/posts/create",
        })}
      >
        <Edit size={30} />
      </Link>
      <User className="mt-auto" size={30} />
    </header>
  );
};

export default SideBar;
