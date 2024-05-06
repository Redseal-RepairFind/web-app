import React from "react";
import { Link } from "react-router-dom";
import Each from "../helpers/each";
import { FooterLinkProp } from "@/interfaces";

const Items: FooterLinkProp[] = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Contractors", path: "/" },
];

const FooterLinks: React.FC = () => {
  return (
    <div className="flex items-center w-[60%] sm:w-full justify-center gap-10 flex-wrap sm:mb-0 mb-2">
      <Each
        of={Items}
        render={(item: FooterLinkProp) => (
          <Link
            className="text-white hover:underline"
            key={item.id}
            to={item.path}
          >
            {item.title}
          </Link>
        )}
      />
      <a
        className="text-white hover:underline"
        href="https://repairfind.ca/privacy-policy/"
      >
        Privacy Policy
      </a>
      <a
        className="text-white hover:underline"
        href="https://repairfind.ca/terms-of-service/"
      >
        Terms & Conditions
      </a>
    </div>
  );
};

export default FooterLinks;
