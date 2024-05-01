import React from "react";
import { routes } from "../routes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const userString = sessionStorage.getItem("repairfind_user");
  const user = userString ? JSON.parse(userString) : null;

  const location = useLocation();
  const navigate = useNavigate();

  console.log(user);
  return (
    <div className="flex-1 p-2">
      <div className="w-full flex items-center border-b border-gray-300 justify-between pb-4 px-2 my-3">
        <div>
          <h1 className="text-lg font-medium">{user?.name}</h1>
          <p className="text-sm">{user?.accountType}</p>
        </div>
        <img className="w-4" src={user?.profilePhoto?.url} alt={user?.name} />
      </div>
      {routes.map((route: any) => (
        <Link
          className={`w-full flex items-center ${
            location.pathname === route.href ? "bg-gray-100" : "bg-transparent"
          } border border-transparent gap-2 p-4 mb-3 hover:bg-gray-100 hover:border-gray-100 duration-200 rounded-md`}
          to={route.href}
        >
          <FontAwesomeIcon icon={route.icon} />
          <p>{route.title}</p>
        </Link>
      ))}

      <button
        onClick={() => navigate("/")}
        className="w-full flex items-center mt-10 border border-transparent gap-2 p-4 mb-3 hover:bg-gray-100 hover:border-gray-100 duration-200 rounded-md"
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
        <p>Logout</p>
      </button>
    </div>
  );
};

export default Sidebar;
