import Footer from "../layout/footer";
import { LayoutProps } from "../../interfaces";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full relative min-h-[100vh]">
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
