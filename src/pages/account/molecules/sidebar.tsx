/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { routes } from "../routes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faExclamationCircle,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const userString = sessionStorage.getItem("repairfind_user");
  const user = userString ? JSON.parse(userString) : null;

  // console.log(user);

  const location = useLocation();
  const navigate = useNavigate();

  // console.log(user);
  return (
    <div className="flex-1 p-2 md:block hidden">
      <div className="w-full flex items-center gap-2 border-b border-gray-300 justify-between pb-4 px-2 my-3">
        <div>
          <h1 className="text-lg font-medium">{user?.name}</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 justify-start">
              <span className="w-1 bg-black h-1 rounded-full"></span>
              <p className="text-sm">{user?.accountType}</p>
            </div>
            {user?.accountType.toLowerCase() !== "company" && (
              <div className="flex items-center gap-1 justify-start">
                <span className="w-1 bg-black h-1 rounded-full"></span>
                <p className="text-sm">{user?.profile?.skill}</p>
              </div>
            )}
            {user?.accountType.toLowerCase() === "company" && (
              <div className="flex items-center gap-1 justify-start">
                <span
                  className={`rounded-3xl px-5 py-1 text-sm capitalize ${
                    user?.companyDetails?.status.toLowerCase() === "pending"
                      ? "bg-pink-200"
                      : "bg-green-300"
                  }`}
                >
                  {user?.companyDetails?.status.toLowerCase()}
                </span>
                <p className="text-sm">{user?.profile?.skill}</p>
              </div>
            )}
          </div>
        </div>
        <div className="w-12 flex items-center justify-center h-10 rounded-full border border-gray-100 shadow">
          <img
            className="w-7"
            src={
              user?.accountType.toLowerCase() !== "company"
                ? user?.profilePhoto?.url
                : user?.companyDetails?.companyLogo
            }
            alt={user?.name}
          />
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
      {user?.accountType.toLowerCase() === "company" && (
        <Link
          className={`w-full flex items-center ${
            location.pathname === "/account/team"
              ? "bg-gray-100"
              : "bg-transparent"
          } border border-transparent gap-2 p-2 mb-2 hover:bg-gray-100 hover:border-gray-100 duration-200 rounded-md`}
          to={"/account/team"}
        >
          <FontAwesomeIcon icon={faUsers} />
          Team Members
        </Link>
      )}
      <a
        className={`w-full flex items-center border border-transparent gap-2 p-2 mb-2 hover:bg-gray-100 hover:border-gray-100 duration-200 rounded-md`}
        href="https://repairfind.ca/about-us/"
        target="_blank"
      >
        <FontAwesomeIcon icon={faExclamationCircle} />
        About Repair Find
      </a>

      <button
        onClick={() => {
          sessionStorage.clear();
          navigate("/");
        }}
        className="w-full flex items-center mt-10 border border-transparent gap-2 p-2 mb-2 hover:bg-gray-100 hover:border-gray-100 duration-200 rounded-md"
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
        <p>Logout</p>
      </button>
    </div>
  );
};

export default Sidebar;
