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
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setImageUrl(tempUrl);
    }
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
        `${BACKEND_URL}/api/v1/product/upload`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.result.url;
    } catch (error) {
      toast({
        title: "Image upload failed",
        description: error.response?.data?.message ?? error.message,
      });
      throw new Error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !description || !price || !category) {
      toast({
        title: "Please fill out all fields.",
        variant: "destructive",
      });
      return;
    }

    let uploadedImageUrl = imageUrl;
    if (image && !uploadedImageUrl) {
      try {
        uploadedImageUrl = await uploadImage(image);
        setImageUrl(uploadedImageUrl);
      } catch (error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
        return;
      }
    }

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/product/sell`,
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
      navigate("/");
    } catch (error) {
      toast({
        title: error.response?.data?.message ?? error.message,
        variant: "destructive",
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
              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}
              >
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

              {imageUrl && (
                <div className="mt-4 relative">
                  <img
                    src={imageUrl}
                    alt="Uploaded product"
                    className="w-full h-64 object-contain rounded-md"
                  />
                  <Button
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-full"
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Sell;
