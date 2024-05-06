/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const useDebounce = (fn: any, delay: any) => {
  let timeout: any;

  // return function that takes arg and apply to the function
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

const Search = ({
  setSearch,
  resetValue,
  placeholder,
}: {
  setSearch: any;
  resetValue?: any;
  placeholder?: string;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearch = useDebounce((value: any) => {
    resetValue();
    setSearch(value);
  }, 1500); // Adjust the delay as needed (in milliseconds)

  const handleSearch = useCallback(
    (e: any) => {
      const value = e.target.value;
      setSearchTerm(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );
  return (
    <div className="relative my-1 w-full">
      <FontAwesomeIcon
        className="text-sm text-gray-600 absolute left-2 top-[50%] translate-y-[-50%]"
        icon={faSearch}
      />
      <input
        placeholder={placeholder || "Search..."}
        value={searchTerm}
        onChange={handleSearch}
        className={`w-full py-3 text-[12px] pl-6 duration-200 focus:pl-7 focus:border-black rounded-md border border-gray-100 bg-gray-100 focus:bg-white outline-none focus:ring-0`}
        type="search"
      />
    </div>
  );
};

export default Search;
