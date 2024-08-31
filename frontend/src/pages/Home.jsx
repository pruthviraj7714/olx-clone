import { ProductCard } from "@/components/ProductCard";
import { useToast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config/config";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const getProducts = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/product/all`);
      setProducts(res.data.products);
    } catch (error) {
      toast({
        title: error.response.data.message ?? error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-8 border-solid border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col  p-7 ">
      <div className="text-4xl my-6 font-semibold">Fresh Recommendations</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center font-semibold text-xl">
            No Products found!
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
