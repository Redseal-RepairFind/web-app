import React from "react";
import Container from "../global/container";
import logo from "../../images/logo_white.png";

import FooterLinks from "./footer-links";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import Each from "../helpers/each";

const socials = [faFacebook, faInstagram, faLinkedinIn];

const Footer: React.FC = () => {
  return (
    <div className="w-full py-4 absolute bottom-0 bg-black">
      <Container className="flex items-center justify-between gap-5 sm:flex-row flex-col">
        <img src={logo} alt="Logo" />
        <FooterLinks />
        <div className="flex items-center justify-center gap-4">
          <Each
            of={socials}
            render={(item: any, index: number) => (
              <FontAwesomeIcon className="text-white" key={index} icon={item} />
            )}
          />
        </div>
      </Container>
    </div>
  );
};

export default Footer;
