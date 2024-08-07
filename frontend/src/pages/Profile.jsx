import { ITabs } from "@/components/Tabs";
import { useToast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCoins } from "react-icons/fa";
import { MdMap } from "react-icons/md";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();

  const getUserInfo = async () => {
    try {
      const res = await axios.get(`https://${BACKEND_URL}/api/v1/user/info`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setUserInfo(res.data.user);
    } catch (error) {
      toast({
        title: error.response.data.message ?? error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-8 border-solid border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen duration-300">
      <div className="flex flex-col lg:flex-row justify-evenly items-center py-10">
        <div className="flex flex-col items-center">
          <div className="mt-5 h-32 w-32 flex justify-center items-center bg-gray-300 dark:bg-gray-700 rounded-full border-4 border-gray-900 dark:border-gray-200 shadow-md">
            <img
              className="object-cover h-full w-full rounded-full"
              src={"/customer.jpg"}
              alt="profile-icon"
            />
          </div>
        </div>
        <div className="flex flex-col p-6 my-4 space-y-6 w-full lg:w-1/2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300">
          <div className="p-4 font-sans text-xl border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700">
            Name:{" "}
            <span className="font-bold text-gray-900 dark:text-gray-200">
              {userInfo.username}
            </span>
          </div>

          <div className="p-4 font-sans text-xl border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700">
            Email:{" "}
            <span className="font-bold text-gray-900 dark:text-gray-200">
              {userInfo.email}
            </span>
          </div>
          <div className="p-4 flex font-sans text-xl border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700">
            Shopping Coins:{" "}
            <span className="font-bold gap-1 text-gray-900 dark:text-gray-200 flex items-center ml-2">
              <FaCoins size={20} />
              {userInfo.shoppingCoins}
            </span>
          </div>
          <div className="p-4 flex font-sans text-xl border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700">
            Location:{" "}
            <span className="font-bold gap-1 text-gray-900 dark:text-gray-200 flex items-center ml-2">
              <MdMap size={20} />
              {userInfo.location}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center ">
        <ITabs />
      </div>
    </div>
  );
};

export default Profile;
