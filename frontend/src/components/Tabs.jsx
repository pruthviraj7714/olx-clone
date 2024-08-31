import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "./ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config/config";
import MiniCard from "./MiniCard";

export function ITabs() {
  const [soldProducts, setSoldProducts] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const getSoldProducts = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/v1/user/sold-products`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setSoldProducts(res.data.products);
    } catch (error) {
      toast({
        title: error.response.data.message ?? error.message,
        variant: "destructive",
      });
    }
  };

  const getPurchasedProducts = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/v1/user/purchased-products`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setPurchasedProducts(res.data.products);
    } catch (error) {
      toast({
        title: error.response.data.message ?? error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getPurchasedProducts();
    getSoldProducts();
  }, []);
  return (
    <Tabs
      defaultValue="purchases"
      className="w-full max-w-4xl mx-auto mt-8 min-h-screen"
    >
      <TabsList className="flex justify-between bg-gray-100 p-2 rounded-lg shadow-md">
        <TabsTrigger
          value="purchases"
          className="flex-1 p-2 text-center text-lg font-semibold text-gray-600 rounded-lg hover:bg-gray-200"
        >
          Purchases
        </TabsTrigger>
        <TabsTrigger
          value="sold"
          className="flex-1 p-2 text-center text-lg font-semibold text-gray-600 rounded-lg hover:bg-gray-200"
        >
          Sold
        </TabsTrigger>
      </TabsList>
      <TabsContent value="purchases" className="mt-4">
        <Card className="bg-white rounded-lg shadow-lg">
          <CardHeader className="p-4 border-b border-gray-200">
            <CardTitle className="text-xl font-bold text-gray-700">
              Purchases
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              The products purchased by you
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-x-10">
              {purchasedProducts && purchasedProducts.length > 0 ? (
                purchasedProducts.map((product) => (
                  <MiniCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center font-semibold text-xl">
                  No Products found!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="sold" className="mt-4">
        <Card className="bg-white rounded-lg shadow-lg">
          <CardHeader className="p-4 border-b border-gray-200">
            <CardTitle className="text-xl font-bold text-gray-700">
              Sold
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              The products sold by you
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-x-10">
              {soldProducts && soldProducts.length > 0 ? (
                soldProducts.map((product) => (
                  <MiniCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center font-semibold text-xl">
                  No Products found!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
