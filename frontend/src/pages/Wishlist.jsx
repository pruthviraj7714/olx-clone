import { ProductCard } from "@/components/ProductCard";
import { useToast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config/config";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `http://${BACKEND_URL}/api/v1/user/wishlist`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setProducts(res.data.products);
    } catch (error) {
      toast({
        title: "Error fetching products",
        description: error.response?.data?.message ?? error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen flex flex-col p-7 bg-gray-100">
      <div className="text-4xl my-4 font-semibold text-center text-blue-600">
        The Products in your Wishlist
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="transform transition-transform duration-300 hover:scale-105"
            >
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center font-semibold text-xl text-gray-500">
            No Products found!
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
