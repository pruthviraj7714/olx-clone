import { BACKEND_URL } from "@/config/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiShoppingBasket, CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";

const PurchaseHistory = () => {
  const [history, setHistory] = useState([]);

  const getPurchaseHistory = async () => {
    try {
      const res = await axios.get(
        `http://${BACKEND_URL}/api/v1/user/purchased-products`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setHistory(res.data.products);
    } catch (error) {
      toast({
        title: error.response.data.message ?? error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getPurchaseHistory();
  }, []);

  return (
    <div className="bg-gray-50 flex items-center justify-center py-10 dark:bg-slate-800">
      <div className="container mx-auto p-6 bg-white dark:bg-slate-700 shadow-lg rounded-lg">
        {history.length === 0 ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-300">
              No Purchases Yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              You haven&apos;t purchased any Products yet.
            </p>
            <Link
              to={"/"}
              className="px-4 py-2 font-semibold bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 dark:bg-slate-600">
                <th className="py-3 px-4 text-left font-semibold text-sm text-gray-700 dark:text-gray-300">
                  Product
                </th>
                <th className="py-3 px-4 text-left font-semibold text-sm text-gray-700 dark:text-gray-300">
                  Details
                </th>
                <th className="py-3 px-4 text-left font-semibold text-sm text-gray-700 dark:text-gray-300">
                  Price
                </th>
                <th className="py-3 px-4 text-left font-semibold text-sm text-gray-700 dark:text-gray-300">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-100 dark:hover:bg-slate-600 text-gray-900 dark:text-gray-200 transition-colors duration-150"
                >
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <CiShoppingBasket size={25} />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span>{product.updatedAt}</span>
                  </td>
                  <td className="py-3 px-4">₹ {product.price}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        product.soldStatus
                          ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                          : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100"
                      }`}
                    >
                      {product.soldStatus ? "Success" : "Failed" }
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
