import React from "react";
import { FaCalendarWeek } from "react-icons/fa";

const MiniCard = ({ product }) => {
  return (
    <div className="w-[240px] h-[340px] flex flex-col justify-between cursor-pointer border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[180px] object-cover"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 truncate">
            {product.name}
          </h1>
          <p className="text-lg text-green-600 font-semibold mt-2">
            ₹{product.price}
          </p>
          <p className="text-gray-600 mt-2">
            {product.description.length > 50
              ? product.description.substring(0, 50) + "..."
              : product.description}
          </p>
        </div>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <p className="flex items-center">
            <FaCalendarWeek className="mr-1" />
            {new Date(product.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MiniCard;
