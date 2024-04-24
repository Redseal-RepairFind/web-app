import React from "react";
import { Link } from "react-router-dom";
import Each from "../helpers/each";
import { FooterLinkProp } from "@/interfaces";

const Items: FooterLinkProp[] = [
  { id: 1, title: "About Us", path: "/" },
  { id: 2, title: "Contractors", path: "/" },
  { id: 3, title: "Contact Us", path: "/" },
  { id: 4, title: "How it works", path: "/" },
  { id: 5, title: "Blog", path: "/" },
];

const FooterLinks: React.FC = () => {
  return (
    <div className="flex items-center w-full justify-center gap-10 flex-wrap sm:mb-0 mb-2">
      <Each
        of={Items}
        render={(item: FooterLinkProp) => (
          <Link className="text-white" key={item.id} to={item.path}>
            {item.title}
          </Link>
        )}
      />
    </div>
  );
};

export default FooterLinks;
