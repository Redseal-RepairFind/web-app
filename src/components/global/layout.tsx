import Footer from "../layout/footer";
import { LayoutProps } from "../../interfaces";
import Container from "./container";
import logo from "../../images/logo_white.png";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full bg-gray-50 relative min-h-[100vh]">
      <Container className="py-3">
        <img src={logo} alt="Logo" className="w-10 h-10" />
      </Container>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
