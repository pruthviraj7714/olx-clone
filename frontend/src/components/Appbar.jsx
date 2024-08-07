import React, { useState } from "react";
import { FaSearch, FaUser, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppMenu } from "./AppMenu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AuthDialog from "./AuthDialog";

const Appbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="h-16 flex justify-between items-center px-5 bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">
      <div
        onClick={() => navigate("/")}
        className="text-2xl font-bold cursor-pointer"
      >
        <img
          src={"/logo.jpg"}
          alt="Logo"
          className="h-10 w-16 rounded-full object-cover"
        />
      </div>

      <div className="flex items-center gap-6">
        {!user && (
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <FaUser className="text-lg" />
                <span className="font-semibold underline">Login</span>
              </div>
            </DialogTrigger>
            <AuthDialog isLogin={isLogin} setIsLogin={setIsLogin} />
          </Dialog>
        )}
        <Dialog>
          <DialogTrigger asChild>
            <div
              onClick={() => {
                if (user) navigate("/sell");
              }}
              className="flex items-center gap-2 cursor-pointer bg-white text-purple-500 px-4 py-2 rounded-full transition duration-300 ease-in-out hover:bg-purple-500 hover:text-white"
            >
              <FaDollarSign className="text-lg" />
              <span className="font-bold">Sell</span>
            </div>
          </DialogTrigger>
          {!user && <AuthDialog isLogin={isLogin} setIsLogin={setIsLogin} />}
        </Dialog>
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
