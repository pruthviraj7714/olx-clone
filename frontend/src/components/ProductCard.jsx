import {
  FaCalendarWeek,
  FaLocationArrow,
  FaSearchLocation,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="w-[340px] h-[380px] flex flex-col bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[180px] object-cover"
        />
        <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs font-semibold rounded-md">
          New
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-lg text-gray-700 mt-2">${product.price}</p>
          <p className="text-gray-600 mt-2">
            {product.description.length > 30
              ? product.description.substring(0, 30) + "..."
              : product.description}
          </p>
        </div>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <p className="flex items-center">
            <FaLocationArrow />
            {product.user.location}
          </p>
          <p className="flex items-center">
            <FaCalendarWeek />
            {new Date(product.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};
