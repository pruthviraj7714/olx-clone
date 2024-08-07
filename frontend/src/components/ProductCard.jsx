import { useEffect, useState } from "react";
import { FaCalendarWeek, FaHeart, FaLocationArrow } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "@/config/config";
import { useToast } from "./ui/use-toast";

export const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("token");

  const { toast } = useToast();

  const isWishlistedStatus = async () => {
    try {
      const res = await axios.get(
        `http://${BACKEND_URL}/api/v1/product/${product._id}/is-wishlisted`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setIsLiked(res.data.isWishlisted);
    } catch (error) {
      toast({
        title: error.response.data.message ?? error.message,
      });
    }
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (isLiked) {
      try {
        const res = await axios.post(
          `http://${BACKEND_URL}/api/v1/product/${product._id}/remove-wishlist`,
          {},
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        toast({
          title: res.data.message,
        });
      } catch (error) {
        toast({ title: error.response.data.message });
      }
    } else {
      try {
        const res = await axios.post(
          `http://${BACKEND_URL}/api/v1/product/${product._id}/wishlist`,
          {},
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        toast({
          title: res.data.message,
        });
      } catch (error) {
        toast({ title: error.response.data.message });
      }
    }

    setIsLiked(!isLiked);
  };

  useEffect(() => {
    if (user) {
      isWishlistedStatus();
    }
  }, []);

  return (
    <div
      onClick={() => {
        navigate(`/product/${product.category}/${product._id}`);
      }}
      className="w-[340px] h-[380px] flex flex-col cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden transform transition-all"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[180px] object-cover"
        />
        <span
          onClick={handleLike}
          className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 text-xs font-semibold rounded-md"
        >
          {isLiked ? <FaHeart size={20} /> : <CiHeart size={20} />}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-lg text-gray-700 mt-2">₹{product.price}</p>
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
    </div>
  );
};
