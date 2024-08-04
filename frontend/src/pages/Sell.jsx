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
        `http://${BACKEND_URL}/api/v1/product/upload`, // Adjust this URL to your actual upload endpoint
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
      throw error;
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
        `http://${BACKEND_URL}/api/v1/product/sell`,
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
    } catch (error) {
      toast({
        title: error.response?.data?.message ?? error.message,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="productName" className="text-gray-700">
              Product Name
            </Label>
            <Input
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="price" className="text-gray-700">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-gray-700">
              Category
            </Label>
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger className="w-full">
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
              <Label htmlFor="image" className="text-gray-700">
                Product Image
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
            </div>
            {image && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  className="w-full h-auto"
                />
                <Button onClick={removeImage} className="mt-2">
                  Remove Image
                </Button>
              </div>
            )}
          </div>

          <div className="mt-4">
            <Button type="submit" className="w-full">
              Add Product
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Sell;
