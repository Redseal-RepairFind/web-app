import React from "react";
import { routes } from "../routes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faX,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

const Stickybar = ({ toggleSticky }: { toggleSticky: any }) => {
  const userString = sessionStorage.getItem("repairfind_user");
  const user = userString ? JSON.parse(userString) : null;

  console.log(user);

  const location = useLocation();
  const navigate = useNavigate();

  console.log(user);
  return (
    <div className="flex-1 p-2 border-l border-gray-100 shadow bg-white z-10 left-0 h-[100vh] w-[70%] absolute">
      <button
        className="w-full flex items-center justify-start p-3"
        onClick={toggleSticky}
      >
        <FontAwesomeIcon icon={faX} className="text-sm text-gray-600" />
      </button>
      <div className="w-full flex items-center border-b border-gray-300 justify-between pb-4 px-2 my-3">
        <div>
          <h1 className="text-lg font-medium">{user?.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <span className="w-2 bg-black h-2 rounded-full"></span>
            <p className="text-sm">{user?.accountType}</p>
          </div>
        </div>
        <div className="w-10 flex items-center justify-center h-10 rounded-full border border-slate-300">
          <img className="w-4" src={user?.profilePhoto?.url} alt={user?.name} />
        </div>
      </div>
      {routes.map((route: any) => (
        <Link
          className={`w-full flex items-center ${
            location.pathname === route.href ? "bg-gray-100" : "bg-transparent"
          } border border-transparent gap-2 p-2 mb-2 hover:bg-gray-100 hover:border-gray-100 duration-200 rounded-md`}
          to={route.href}
        >
          <FontAwesomeIcon icon={route.icon} />
          <p>{route.title}</p>
        </Link>
      ))}
      <Link
        className={`w-full flex items-center ${
          location.pathname === "/account/team"
            ? "bg-gray-100"
            : "bg-transparent"
        } border border-transparent gap-2 p-2 mb-2 hover:bg-gray-100 hover:border-gray-100 duration-200 rounded-md`}
        to={"/account/team"}
      >
        Team Members
      </Link>
      <a
        className={`w-full flex items-center border border-transparent gap-2 p-2 mb-2 hover:bg-gray-100 hover:border-gray-100 duration-200 rounded-md`}
        href="https://repairfind.ca/about-us/"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faExclamationCircle} />
        About Repair Find
      </a>

      <button
        onClick={() => navigate("/")}
        className="w-full flex items-center mt-10 border border-transparent gap-2 p-2 mb-2 hover:bg-gray-100 hover:border-gray-100 duration-200 rounded-md"
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
        <p>Logout</p>
      </button>
    </div>
  );
};

export default Stickybar;
