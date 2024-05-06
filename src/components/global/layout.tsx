import Footer from "../layout/footer";
import { LayoutProps } from "../../interfaces";
import Container from "./container";
import logo from "../../images/logo_white.png";
import FooterMobile from "../layout/footer-mobile";

const Layout = ({ children, className, hasBackground }: LayoutProps) => {
  return (
    <div
      style={{
        backgroundImage: hasBackground ? "url(/images/phone_bg.png)" : "url()",
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
      }}
      className={`${className} w-full relative flex items-start justify-between flex-col min-h-[100vh] md:pb-[200px]`}
    >
      <Container className="py-3">
        <img src={logo} alt="Logo" className="w-10 h-10" />
      </Container>
      {children}
      <Footer />
      <FooterMobile />
    </div>
  );
};

export default Layout;
