import { ProductCard } from "@/components/ProductCard";
import { useToast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config/config";
import axios from "axios";
import { useEffect, useState } from "react";

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
    <div className="min-h-screen flex flex-col p-7">
      <div className="text-4xl my-4 font-semibold">
        The Products on Sale by You
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-white font-semibold text-xl">
            No Products found!
          </div>
        )}
      </div>
    </div>
  );
};

export default SaleProducts;
