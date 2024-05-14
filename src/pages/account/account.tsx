import React from "react";
import useLanguage from "../../hooks/useLanguage";
import welcome from "../../images/welcome.png";
import stressed from "../../images/stressed.png";
import failed from "../../images/Failed businessman.png";

const Account = () => {
  const userString = sessionStorage.getItem("repairfind_user");
  const user = userString ? JSON.parse(userString) : null;

  // const [showSticky, setShowSticky] = useState(false);

  const { handleLanguageChoice } = useLanguage();

  // const toggleSticky = () => {
  //   setShowSticky(!showSticky);
  // };

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
          {handleLanguageChoice("registration_pending")}
        </h1>
        <p className="text-sm text-gray-500 font-medium text-center w-full mt-1 md:max-w-[500px]">
          {handleLanguageChoice("gst_pending_info")}
        </p>
      </div>
    );
  }

  if (user?.certnStatus?.toLowerCase() === "not_started") {
    return (
      <div className="w-full flex items-center justify-center flex-col">
        {" "}
        <img
          src={stressed}
          className="w-[80%] lg:w-[50%] h-auto mb-10"
          alt="Stressed"
        />
        <h1 className="text-2xl font-semibold text-center">
          {handleLanguageChoice("certn_verification_not_started")}
        </h1>
        <p className="text-sm text-gray-500 font-medium text-center w-full mt-1 md:max-w-[500px]">
          {handleLanguageChoice("certn_verification_not_started_subtext")}
        </p>
      </div>
    );
  }

  if (user?.certnStatus?.toLowerCase() === "not_submitted") {
    return (
      <div className="w-full flex items-center justify-center flex-col">
        {" "}
        <img
          src={stressed}
          className="w-[80%] lg:w-[50%] h-auto mb-10"
          alt="Stressed"
        />
        <h1 className="text-2xl font-semibold text-center">
          {handleLanguageChoice("registration_pending")}
        </h1>
        <p className="text-sm text-gray-500 font-medium text-center w-full mt-1 md:max-w-[500px]">
          {handleLanguageChoice("certn_verification_not_submitted_subtext")}
        </p>
        <a
          className="px-5 py-3 mt-5 rounded-md bg-black text-white "
          target="_blank"
          rel="noreferrer"
          href={`${user?.certnReport?.action}`}
        >
          Click Link to Submit
        </a>
      </div>
    );
  }

  if (user?.certnStatus?.toLowerCase() === "pending") {
    return (
      <div className="w-full flex items-center justify-center flex-col">
        {" "}
        <img
          src={stressed}
          className="w-[80%] lg:w-[50%] h-auto mb-10"
          alt="Stressed"
        />
        <h1 className="text-2xl font-semibold text-center">
          {handleLanguageChoice("registration_pending")}
        </h1>
        <p className="text-sm text-gray-500 font-medium text-center w-full mt-1 md:max-w-[500px]">
          {handleLanguageChoice("certn_verification_pending")}
        </p>
      </div>
    );
  }

  if (user?.certnStatus?.toLowerCase() === "failure") {
    return (
      <div className="w-full flex items-center justify-center flex-col">
        {" "}
        <img
          src={failed}
          className="w-[80%] lg:w-[50%] h-auto mb-10"
          alt="Stressed"
        />
        <h1 className="text-2xl font-semibold text-center">
          {handleLanguageChoice("registration_failed")}
        </h1>
        <p className="text-sm text-gray-500 font-medium text-center w-full mt-1 md:max-w-[500px]">
          {handleLanguageChoice("certn_verification_failure")}
        </p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="w-full flex items-center justify-center flex-col">
        <img
          src={welcome}
          className="w-[90%] lg:w-[70%] h-auto mb-10"
          alt="Welcome"
        />
        <h1 className="text-2xl font-semibold text-center">
          {handleLanguageChoice("welcome_msg")}
        </h1>
        <p className="text-sm text-gray-500 font-medium text-center mt-1 md:max-w-[400px]">
          {handleLanguageChoice("welcome_msg_subtext")}
        </p>
      </div>
    </React.Fragment>
  );
};

export default Account;
