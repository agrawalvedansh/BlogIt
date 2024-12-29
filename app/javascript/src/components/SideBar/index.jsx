import React, { useState } from "react";

import {
  Book,
  HamburgerMenu,
  User,
  Edit,
  Category,
} from "@bigbinary/neeto-icons";
import classNames from "classnames";
import { useLocation, Link } from "react-router-dom";

import Categories from "components/Categories";

const SideBar = ({ selectedCategories, setSelectedCategories }) => {
  const location = useLocation();

  const [showCategories, setShowCategories] = useState(false);
  const locationDashboard = location.pathname === "/dashboard";

  return (
    <header className="flex">
      <div className="bg-primary-white  z-20 flex h-screen w-16 flex-col items-center gap-4 border-b border-r-2 py-10">
        <Book size={30} />
        <Link
          to="/dashboard"
          className={classNames("", {
            "rounded-md border-4 border-black": locationDashboard,
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
        <Category
          size={30}
          className={classNames("cursor-pointer rounded-md p-1", {
            "bg-slate-200": showCategories,
            hidden: !locationDashboard,
          })}
          onClick={() => setShowCategories(!showCategories)}
        />
        <User className="mt-auto" size={30} />
      </div>
      {showCategories && locationDashboard && (
        <Categories {...{ selectedCategories, setSelectedCategories }} />
      )}
    </header>
  );
};

export default SideBar;
