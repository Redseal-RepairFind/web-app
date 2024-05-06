import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Account from "./account";
import TeamMembers from "./pages/team-members";
import Stickybar from "./molecules/stickybar";
import Sidebar from "./molecules/sidebar";
import Container from "../../components/global/container";
import Layout from "../../components/global/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import TeamData from "./pages/team-data";

function Accountroutes() {
  const [showSticky, setShowSticky] = useState(false);

  const navigate = useNavigate();

  const userString = sessionStorage.getItem("repairfind_user");
  const user = userString ? JSON.parse(userString) : null;

  // useEffect(() => {
  //   !user && navigate("/");
  // }, []);

  const toggleSticky = () => {
    setShowSticky(!showSticky);
  };
  return (
    <React.Fragment>
      <Layout className={"relative"}>
        {showSticky && <Stickybar toggleSticky={toggleSticky} />}
        <Container className="flex w-full items-start py-3 bg-white sm:min-h-[70vh] min-h-[64.2vh] justify-center">
          <div className="w-full p-5 flex relative">
            <button
              onClick={toggleSticky}
              className="md:hidden block absolute top-0 left-0"
            >
              <FontAwesomeIcon className="text-xl" icon={faBars} />
            </button>
            <Sidebar />
            <div className="flex-[4] flex items-center justify-center flex-col p-4">
              <Routes>
                <Route path="/" element={<Account />} />
                <Route path="/team" element={<TeamMembers />} />
                <Route path="/my-team" element={<TeamData />} />
              </Routes>
            </div>
          </div>
        </Container>
      </Layout>
    </React.Fragment>
  );
}

export default Accountroutes;
