import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BACKEND_URL } from "@/config/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiMapPin, CiShoppingCart } from "react-icons/ci";
import { FaCalendar, FaLocationArrow, FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});

  const { toast } = useToast();

  const getProductInfo = async () => {
    try {
      const res = await axios.get(`http://${BACKEND_URL}/api/v1/product/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      toast({
        title: error.response.data.message ?? error.message,
      });
    }
  };

  const purchaseProduct = async () => {
    try {
      const res = await axios.post(
        `http://${BACKEND_URL}/api/v1/product/${product._id}/purchase`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      toast({ title: res.data.message });
    } catch (error) {
      toast({
        title: error.response.data.message ?? error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getProductInfo();
  }, []);

  return (
    <div className="min-h-screen flex flex-col  items-center bg-gray-50 p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <div className="w-full h-[300px] overflow-hidden rounded-lg mb-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-between items-start gap-8">
          <div className="flex flex-col w-2/3">
            <h1 className="font-bold text-4xl mb-2">{product.name}</h1>
            <p className="text-gray-500 mt-4">Overview</p>
            <div className="border-b border-gray-200 mb-4" />
            <div className="flex items-center gap-5 text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <FaUser size={25} />
                <span className="font-sans text-xl">
                  {product.user?.username}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CiMapPin size={25} />
                <span className="font-sans text-xl">
                  {product.user?.location}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <FaCalendar size={25} />
                <span className="font-sans text-xl">
                  {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex flex-col leading-relaxed">
              <p className="text-gray-500 text-sm mt-6 mb-3">Description</p>
              <div className="leading-relaxed">{product.description}</div>
            </div>
          </div>
          <div className="flex flex-col items-center w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-gray-800 mb-4">
              ${product.price}
            </div>
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full lg:w-auto bg-slate-800  dark:text-white hover:bg-slate-700  flex gap-2 items-center">
                    <CiShoppingCart size={20} />
                    Buy Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">
                      Payment Receipt
                    </DialogTitle>
                    <DialogDescription className="text-lg">
                      Please confirm your purchase. The following amount will be
                      deducted from your account.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-6 flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 rounded-md mr-6"
                    />
                    <div>
                      <p className="text-xl font-semibold">
                        Product Name: {product.name}
                      </p>
                      <p className="text-xl text-gray-700">
                        Price: ₹{product.price}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 text-lg">
                    <p className="font-medium">Total Amount to be deducted:</p>
                    <p className="text-xl font-bold text-red-600">
                      - ₹{product.price}
                    </p>
                  </div>
                  <DialogFooter className="mt-6">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <Button onClick={purchaseProduct} type="submit">
                      Buy Product
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
