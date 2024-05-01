import { ChangeEvent, useState, useEffect, useContext } from "react";
import english from "../images/flags/english.png";
import french from "../images/flags/french.png";
import punjabi from "../images/flags/punjabi.png";
import mandarin from "../images/flags/mandarin.png";
import spanish from "../images/flags/spanish.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user-context";
import toast from "react-hot-toast";

const useOnboarding = () => {
  const { setContext } = useContext(UserContext);

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const repair_find_language = sessionStorage.getItem("repair_find_language");

    if (repair_find_language) {
      setSelectedLanguage(repair_find_language);
      setContext({ languageChoice: repair_find_language });
    }
  }, []);

  console.log(selectedLanguage);

  const handleLanguage = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedLanguage(e.target.value);
    setContext({ languageChoice: e.target.value });
  };

  const handleRoute = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedRoute(e.target.value);
  };

  const verifyLanguage = () => {
    if (!selectedLanguage)
      return toast.error("Please select a language before proceeding...");

    sessionStorage.setItem("repair_find_language", selectedLanguage);
    navigate("select-account-type");
  };

  const handleAccountChoice = () => {
    navigate(`/onboarding${selectedRoute}`);
  };

  const languages = [
    { id: 1, name: "English", image_href: english, slug: "en" },
    { id: 2, name: "French", image_href: french, slug: "fr" },
    { id: 3, name: "Punjabi", image_href: punjabi, slug: "pa" },
    { id: 4, name: "Mandarin", image_href: mandarin, slug: "zh" },
    { id: 5, name: "Spanish", image_href: spanish, slug: "es" },
  ];

  const accountTypes = [
    {
      id: 1,
      titleKey: "as_an_individual",
      descKey: "sign_up_individual",
      route: "/individual",
    },
    {
      id: 2,
      titleKey: "as_a_company",
      descKey: "sign_up_company",
      route: "/company",
    },
    {
      id: 3,
      titleKey: "as_a_journey_man",
      descKey: "sign_up_journey_man",
      route: "/employee",
    },
  ];
  return {
    languages,
    selectedLanguage,
    setSelectedLanguage,
    handleLanguage,
    accountTypes,
    selectedRoute,
    handleRoute,
    verifyLanguage,
    handleAccountChoice,
  };
};

export default useOnboarding;
