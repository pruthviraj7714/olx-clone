import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config/config";
import axios from "axios";
import React, { useState } from "react";

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

  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://${BACKEND_URL}/api/v1/product/sell`,
        {
          name: productName,
          description,
          price : Number(price),
          category,
          image,
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
        title: error.response.data.message ?? error.message,
      });
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
