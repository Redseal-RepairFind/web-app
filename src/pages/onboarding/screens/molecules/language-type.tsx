import React from "react";

const LanguageType = ({
  language,
  handleLanguage,
  selectedLanguage,
}: {
  language: any;
  handleLanguage: any;
  selectedLanguage: any;
}) => {
  return (
    <label
      className={`my-1 w-full flex items-center gap-2 py-3 text-[12px] px-3 duration-200 hover:border-black cursor-pointer rounded-md border ${
        language.slug === selectedLanguage ? "border-black" : "border-slate-300"
      }`}
    >
      <input
        value={language.slug}
        onChange={handleLanguage}
        type="checkbox"
        className="accent-black"
        checked={selectedLanguage === language.slug}
      />{" "}
      <img src={language.image_href} className="w-6 h-5" alt={language.name} />
      {language.name}
    </label>
  );
};

export default LanguageType;
