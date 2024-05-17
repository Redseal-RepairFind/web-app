import React, { useState, useEffect, useRef } from "react";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VerticalMenu = ({
  children,
  isBackground,
  width,
}: {
  children: any;
  isBackground?: any;
  width?: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<any>();

  const handleOutsideClick = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  const handleToggle = () => {};
  return (
    <div className="relative" ref={menuRef}>
      <FontAwesomeIcon
        icon={faEllipsisV}
        className={`cursor-pointer ${isBackground ? "text-customBlue" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      {isMenuOpen && (
        <div
          style={{ right: "0", top: "23px", zIndex: "10" }}
          className={`absolute ${
            width ? width : "min-w-[130px]"
          } mt-1 h-auto ease-in-out transition-all overflow-hidden origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default VerticalMenu;
