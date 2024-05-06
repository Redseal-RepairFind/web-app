import React, { useState } from "react";
import Layout from "../../components/global/layout";
import Container from "../../components/global/container";
import Sidebar from "./molecules/sidebar";
import Stickybar from "./molecules/stickybar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import useLanguage from "../../hooks/useLanguage";
import welcome from "../../images/welcome.png";
import stressed from "../../images/stressed.png";

const Account = () => {
  const userString = sessionStorage.getItem("repairfind_user");
  const user = userString ? JSON.parse(userString) : null;

  const [showSticky, setShowSticky] = useState(false);

  const { handleLanguageChoice } = useLanguage();

  const toggleSticky = () => {
    setShowSticky(!showSticky);
  };

  if (user?.gstDetails?.status?.toLowerCase() === "pending") {
    return (
      <div className="w-full flex items-center justify-center flex-col">
        {" "}
        <img
          src={stressed}
          className="w-[80%] lg:w-[50%] h-auto mb-10"
          alt="Stressed"
        />
        <h1 className="text-2xl font-semibold text-center">
          Registration Pending
        </h1>
        <p className="text-sm text-gray-500 font-medium text-center w-full mt-1 md:max-w-[500px]">
          Thank you for submitting your GST details. Please note that
          verification may take some time. Rest assured, our team is diligently
          processing your information. We appreciate your patience and will
          notify you as soon as your GST details are verified.
        </p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div></div>
      <img
        src={welcome}
        className="w-[90%] lg:w-[70%] h-auto mb-10"
        alt="Welcome"
      />
      <h1 className="text-2xl font-semibold">
        {handleLanguageChoice("welcome_msg")}
      </h1>
      <p className="text-sm text-gray-500 font-medium text-center mt-1 md:max-w-[400px]">
        Congratulations! Your registration process is complete. We'll notify you
        as soon as we go live. Thank you for joining the Repairfind community!
      </p>
      <div className="flex items-center justify-center gap-2 md:flex-row flex-col w-full mt-10">
        {/* <button className="border flex items-center justify-center gap-2 border-black bg-black py-3 w-full max-w-[200px] rounded-md text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6"
                  viewBox="0 0 404 404"j
                  id="playstore"
                >
                  <path
                    fill="#f6b94c"
                    d="m21.963 402.378 373.648-186.806c11.185-5.592 11.185-21.553 0-27.145L21.963 1.622C11.872-3.423 0 3.914 0 15.194v373.612c0 11.28 11.872 18.617 21.963 13.572z"
                  ></path>
                  <path
                    fill="#52c1ff"
                    d="M5.068 3.875C2.007 6.593 0 10.559 0 15.194v373.612c0 4.635 2.007 8.601 5.068 11.319L203.193 202 5.068 3.875z"
                  ></path>
                  <path
                    fill="#67c7a5"
                    d="M276.377 128.816 21.963 1.622C16.018-1.35 9.458-.022 5.068 3.875L203.193 202l73.184-73.184z"
                  ></path>
                  <path
                    fill="#f56c61"
                    d="M5.068 400.125c4.39 3.897 10.95 5.225 16.895 2.253l254.414-127.195L203.193 202 5.068 400.125z"
                  ></path>
                </svg>
                Play Store
              </button>
              <button className="flex items-center justify-center gap-2 border border-black w-full max-w-[200px] py-3 rounded-md text-black">

                Apple Store
              </button> */}
        {/* <button className="border flex items-center justify-center gap-2 border-black bg-black py-3 w-full max-w-[200px] rounded-md text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6"
                  viewBox="0 0 404 404"
                  id="playstore"
                >
                  <path
                    fill="#f6b94c"
                    d="m21.963 402.378 373.648-186.806c11.185-5.592 11.185-21.553 0-27.145L21.963 1.622C11.872-3.423 0 3.914 0 15.194v373.612c0 11.28 11.872 18.617 21.963 13.572z"
                  ></path>
                  <path
                    fill="#52c1ff"
                    d="M5.068 3.875C2.007 6.593 0 10.559 0 15.194v373.612c0 4.635 2.007 8.601 5.068 11.319L203.193 202 5.068 3.875z"
                  ></path>
                  <path
                    fill="#67c7a5"
                    d="M276.377 128.816 21.963 1.622C16.018-1.35 9.458-.022 5.068 3.875L203.193 202l73.184-73.184z"
                  ></path>
                  <path
                    fill="#f56c61"
                    d="M5.068 400.125c4.39 3.897 10.95 5.225 16.895 2.253l254.414-127.195L203.193 202 5.068 400.125z"
                  ></path>
                </svg>
                Play Store
              </button>
              <button className="flex items-center justify-center gap-2 border border-black w-full max-w-[200px] py-3 rounded-md text-black">
                <svg
                  className="w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  id="apple"
                >
                  <g fill-rule="evenodd">
                    <path
                      d="M11.6218,4.7571c-0.0193291,-2.02332 1.65317,-2.99846 1.72865,-3.04467c-0.939167,-1.37684 -2.40442,-1.56532 -2.92624,-1.58735c-1.24564,-0.125075 -2.431,0.734352 -3.06342,0.734352c-0.630702,0 -1.60726,-0.7153 -2.63953,-0.694961c-1.35921,0.0188997 -2.61125,0.789063 -3.31105,2.00483c-1.41025,2.44865 -0.360481,6.07511 1.01479,8.0616c0.671226,0.970026 1.47351,2.06429 2.52553,2.02476c1.0148,-0.0397892 1.39689,-0.654453 2.62078,-0.654453c1.22488,0 1.56888,0.654453 2.64224,0.634268c1.08898,-0.0196037 1.78139,-0.990762 2.44848,-1.96475c0.771157,-1.12822 1.0887,-2.22035 1.10719,-2.27707c-0.0234604,-0.0085233 -2.12539,-0.815491 -2.14743,-3.23655v0Z"
                      transform="translate(.745 3.743)"
                    ></path>
                    <path
                      d="M2.49696,2.55553c0.559066,-0.677623 0.934193,-1.61793 0.831414,-2.55553c-0.804695,0.031969 -1.78039,0.537152 -2.3568,1.21266c-0.51813,0.599437 -0.97158,1.55665 -0.848624,2.47462c0.897671,0.0697992 1.81466,-0.455431 2.37401,-1.13175v0Z"
                      transform="translate(7.857)"
                    ></path>
                  </g>
                </svg>
                Apple Store
              </button> */}
      </div>
    </React.Fragment>
  );
};

export default Account;
