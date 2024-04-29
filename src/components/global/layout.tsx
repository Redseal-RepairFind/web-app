import Footer from "../layout/footer";
import { LayoutProps } from "../../interfaces";
import Container from "./container";
import logo from "../../images/logo_white.png";
import phone_bg from "../../images/phone_bg.png";

const Layout = ({ children, className, hasBackground }: LayoutProps) => {
  return (
    <div
      style={{
        backgroundImage: hasBackground ? "url(/images/phone_bg.png)" : "url()",
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
      }}
      className={`${className} w-full relative min-h-[100vh]`}
    >
      <Container className="py-3">
        <img src={logo} alt="Logo" className="w-10 h-10" />
      </Container>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
