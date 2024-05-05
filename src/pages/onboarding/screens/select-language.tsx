import React, { useEffect } from "react";
import Container from "../../../components/global/container";
import Layout from "../../../components/global/layout";
import useOnboarding from "../../../hooks/useOnboarding";
import Each from "../../../components/helpers/each";
import LanguageType from "./molecules/language-type";
import useLanguage from "../../..//hooks/useLanguage";

const SelectLanguage: React.FC = () => {
  const { languages, selectedLanguage, handleLanguage, verifyLanguage } =
    useOnboarding();

  const { handleLanguageChoice } = useLanguage();

  useEffect(() => {
    sessionStorage.removeItem("employee_session_step");
    sessionStorage.removeItem("individual_session_step");
    sessionStorage.removeItem("company_session_step");
  }, []);

  return (
    <Layout>
      <Container className="flex items-center sm:min-h-[77.4vh] min-h-[64.2vh] justify-center">
        <main className="flex w-full items-center justify-center py-4">
          <div className="w-full max-w-xl flex flex-col mt-4 rounded-md p-8 bg-white">
            <h1 className="font-semibold text-2xl mb-5 text-center">
              {handleLanguageChoice("select_language")}
            </h1>
            <Each
              of={languages}
              render={(language: any) => {
                const prop = {
                  language,
                  selectedLanguage,
                  handleLanguage,
                };
                return <LanguageType {...prop} />;
              }}
            />
            <button
              onClick={verifyLanguage}
              className="border border-black bg-black mt-5 py-3 rounded-md text-white"
            >
              {handleLanguageChoice("continue")}
            </button>
          </div>
        </main>
      </Container>
    </Layout>
  );
};

export default SelectLanguage;
