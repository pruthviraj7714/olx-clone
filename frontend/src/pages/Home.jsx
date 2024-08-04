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
      const res = await axios.get(`http://${BACKEND_URL}/api/v1/product/all`);
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
    return <div>Loading...</div>;
  }

  return <div>Home</div>;
};

export default Home;
