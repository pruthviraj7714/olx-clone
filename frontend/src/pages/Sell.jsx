import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BACKEND_URL } from "@/config/config";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Electronics", value: "electronics" },
  { name: "Clothing", value: "clothing" },
  { name: "Books", value: "books" },
  { name: "Home Appliances", value: "home_appliances" },
];

const Sell = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const naviagte = useNavigate();
  const { toast } = useToast();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const removeImage = () => {
    setImage(null);
    setImageUrl("");
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `https://${BACKEND_URL}/api/v1/product/upload`, 
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.url;
    } catch (error) {
      toast({
        title: "Image upload failed",
        description: error.response?.data?.message ?? error.message,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedImageUrl = imageUrl;
    if (image && !imageUrl) {
      try {
        uploadedImageUrl = await uploadImage(image);
        setImageUrl(uploadedImageUrl);
      } catch (error) {
        return;
      }
    }

    try {
      const res = await axios.post(
        `https://${BACKEND_URL}/api/v1/product/sell`,
        {
          name: productName,
          description,
          price: Number(price),
          category,
          image: uploadedImageUrl,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      toast({
        title: res.data.message ?? "Product Successfully Added",
      });
      naviagte('/')
    } catch (error) {
      toast({
        title: error.response?.data?.message ?? error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <h1 className="text-4xl font-extrabold mb-8">
        Add Your Product To Sell Here
      </h1>
      <div className="max-w-md w-full bg-white p-6 shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <div>
              <Label
                htmlFor="productName"
                className="text-gray-700 font-semibold"
              >
                Product Name
              </Label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label
                htmlFor="description"
                className="text-gray-700 font-semibold"
              >
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="price" className="text-gray-700 font-semibold">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter product price"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-gray-700 font-semibold">
                Category
              </Label>
              <Select onValueChange={(value) => setCategory(value)}>
                <SelectTrigger className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <div>
                <Label htmlFor="image" className="text-gray-700 font-semibold">
                  Product Image
                </Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {image && (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Selected"
                    className="w-full h-auto rounded-md"
                  />
                  <Button
                    onClick={removeImage}
                    className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md"
                  >
                    Remove Image
                  </Button>
                </div>
              )}
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md"
              >
                Add Product
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sell;
