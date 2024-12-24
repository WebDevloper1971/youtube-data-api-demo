import { Outlet } from "react-router-dom";
// import Navigation from "../components/Navigation";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="sm:w-[80svw] w-fit m-auto ">
      {/* <Navigation /> */}
      <Navbar />
      <div className="min-h-svh flex w-full sm:p-4 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
