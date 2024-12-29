import React, { useState, useEffect, useRef } from "react";

import {
  Book,
  HamburgerMenu,
  User,
  Edit,
  Category,
} from "@bigbinary/neeto-icons";
import classNames from "classnames";
import { useLocation, Link } from "react-router-dom";
import { resetAuthTokens } from "src/apis/axios";

import authApi from "apis/auth";
import Categories from "components/Categories";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

const SideBar = ({ selectedCategories, setSelectedCategories }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef();
  const userName = getFromLocalStorage("authUserName");
  const email = getFromLocalStorage("authEmail");
  const location = useLocation();

  const [showCategories, setShowCategories] = useState(false);
  const locationDashboard = location.pathname === "/";

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <header className="flex">
      <div className="bg-primary-white relative z-20 flex h-screen w-16 flex-col items-center gap-4 border-b border-r-2 py-10">
        <Book size={30} />
        <Link
          to="/"
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
        <div className="mt-auto" ref={menuRef}>
          <User className="cursor-pointer" size={30} onClick={toggleMenu} />
          {isMenuVisible && (
            <div className="absolute bottom-10 left-16 z-30 rounded-md border border-gray-300 p-2 shadow-md">
              <div className="flex items-end gap-2 border-b-2 pb-2">
                <User size={30} />
                <div>
                  <p className="text-md font-semibold text-slate-700">
                    {userName}
                  </p>
                  <p className="text-xs text-slate-400">{email}</p>
                </div>
              </div>
              <div className="w-48 bg-white">
                <Link
                  className="block cursor-pointer px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Log out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      {showCategories && locationDashboard && (
        <Categories {...{ selectedCategories, setSelectedCategories }} />
      )}
    </header>
  );
};

export default SideBar;
