import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="p-2 sm:p-4 sm:my-6">
      <Link
        to={"/"}
        className="size-12 bg-black text-white rounded flex justify-center items-center"
      >
        <span className="text-xl font-bold">VT</span>
      </Link>
    </nav>
  );
}

export default Navbar;
