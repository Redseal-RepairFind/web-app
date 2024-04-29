import useLanguage from "../../../../hooks/useLanguage";

const AccountType = ({
  type,
  selectedRoute,
  handleRoute,
}: {
  type: any;
  selectedRoute: any;
  handleRoute: any;
}) => {
  const { handleLanguageChoice } = useLanguage();

  const prop = {
    value: type.route,
    onChange: handleRoute,
    type: "checkbox",
    className: "accent-black",
    checked: selectedRoute === type.route,
  };

  return (
    <label
      className={`my-1 w-full flex items-center gap-4 py-3 border-gray-100  text-[12px] px-3 duration-200 hover:bg-gray-100 cursor-pointer rounded-md border ${
        type.route === selectedRoute ? "bg-gray-100" : "bg-transparent"
      }`}
    >
      <input {...prop} />{" "}
      <div>
        <p className="font-medium">{handleLanguageChoice(type.titleKey)}</p>
        <p className="text-gray-400">{handleLanguageChoice(type.descKey)}</p>
      </div>
    </label>
  );
};

export default AccountType;
