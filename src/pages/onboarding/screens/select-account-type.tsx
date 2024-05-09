import React from "react";
import Container from "../../../components/global/container";
import Layout from "../../../components/global/layout";
import useOnboarding from "../../../hooks/useOnboarding";
import Each from "../../../components/helpers/each";
import AccountType from "./molecules/account-type";

import { faArrowRightLong, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useLanguage from "../../../hooks/useLanguage";

const SelectAccountType: React.FC = () => {
  const { accountTypes, selectedRoute, handleRoute, handleAccountChoice } =
    useOnboarding();

  const { handleLanguageChoice } = useLanguage();

  console.log(selectedRoute);

  const handleBtnStyle = (selectedRoute: any) => {
    if (selectedRoute)
      return `relative border border-black bg-black mt-5 py-3 rounded-md text-white cursor-pointer`;

    return `relative border border-gray-100 bg-gray-100 mt-5 py-3 rounded-md text-gray-600 cursor-not-allowed`;
  };

  return (
    <Layout hasBackground={true}>
      <Container className="flex w-full items-center justify-center">
        <main className="flex w-full items-center justify-end py-4">
          <div className="w-full max-w-xl flex flex-col mt-4 rounded-md p-8 bg-white">
            <h1 className="font-semibold text-2xl mb-5 text-center">
              {handleLanguageChoice("sign_up")}
            </h1>
            <Each
              of={accountTypes}
              render={(type: any) => {
                const props = { type, selectedRoute, handleRoute };
                return <AccountType {...props} />;
              }}
            />
            <div className="flex items-center gap-2 border border-gray-200 bg-gray-200 py-2 px-4 mt-5 rounded text-xs">
              <FontAwesomeIcon
                className="text-white rounded-full px-3 py-2 bg-black"
                icon={faInfo}
              />
              <p>{handleLanguageChoice("qualified_contractor_note")}</p>
            </div>
            <button
              disabled={!selectedRoute}
              onClick={handleAccountChoice}
              className={handleBtnStyle(selectedRoute)}
            >
              {handleLanguageChoice("next")}
              <FontAwesomeIcon
                className="absolute top-[50%] translate-y-[-50%] right-2"
                icon={faArrowRightLong}
              />
            </button>
          </div>
        </main>
      </Container>
    </Layout>
  );
};

export default SelectAccountType;
