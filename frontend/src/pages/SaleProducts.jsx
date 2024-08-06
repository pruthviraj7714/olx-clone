import { ProductCard } from "@/components/ProductCard";
import { useToast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaBuyNLarge, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdSell } from "react-icons/md";

const SaleProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const getProducts = async () => {
    try {
      const res = await axios.get(`http://${BACKEND_URL}/api/v1/user/on-sell`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(res);
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
    <div className="min-h-screen flex flex-col p-7 bg-gradient-to-r from-gray-100 to-gray-200">
    <div className="text-4xl my-4 font-semibold text-center text-blue-600 shadow-lg p-4 rounded-lg bg-white">
      The Products on Sale by You
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
      {products && products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="transform transition-transform duration-300 hover:scale-105 bg-white rounded-lg shadow-lg p-5 hover:bg-blue-50 flex flex-col items-center"
          >
            <ProductCard product={product} />
            <div className="text-center text-lg font-medium mt-4 flex items-center gap-2">
              {product.soldStauts ? (
                <div className="flex items-center gap-1 text-green-500 animate-pulse">
                  <FaCheckCircle /> Sold
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-500">
                  <FaTimesCircle /> UnSold
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500 font-semibold text-xl mt-10">
          No Products found!
        </div>
      )}
    </div>
  </div>
  );
};

export default SaleProducts;
