import { FaSearch, FaUser, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppMenu } from "./AppMenu";

const Appbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("token");

  return (
    <div className="h-16 flex justify-between items-center px-5 bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">
      <div onClick={() => navigate('/')} className="text-2xl font-bold cursor-pointer">
        <img src={"/logo.png"} alt="Logo" className="h-10 w-16 object-cover" />
      </div>
      <div className="flex items-center">
        <input
          type="text"
          className="p-2 rounded-full border-2 border-transparent focus:border-white focus:outline-none transition duration-300 ease-in-out"
          placeholder="Search here"
        />
        <FaSearch className="ml-2 text-lg cursor-pointer" />
      </div>
      <div className="flex items-center gap-6">
        {!user && (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            <FaUser className="text-lg" />
            <span className="font-semibold underline">Login</span>
          </div>
        )}
        <div
          onClick={() => navigate("/sell")}
          className="flex items-center gap-2 cursor-pointer bg-white text-purple-500 px-4 py-2 rounded-full transition duration-300 ease-in-out hover:bg-purple-500 hover:text-white"
        >
          <FaDollarSign className="text-lg" />
          <span className="font-bold">Sell</span>
        </div>
        {user && (
          <div>
            <AppMenu />
          </div>
        )}
      </div>
    </div>
  );
};

export default Appbar;
