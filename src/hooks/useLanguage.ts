import { useContext } from "react";
import translations from "../i8n.json";
import { wordKey, LanguageKey } from "../types";
import { UserContext } from "../context/user-context";

const useLanguage = () => {
  const { context } = useContext(UserContext);

  const { languageChoice } = context;

  // console.log(languageChoice);

  const language = languageChoice as LanguageKey;

  const handleLanguageChoice = (key: wordKey) => {
    return translations[key][language];
  };
  return {
    handleLanguageChoice,
  };
};

export default useLanguage;
