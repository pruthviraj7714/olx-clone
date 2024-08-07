import React, { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "./ui/select";
import { statesInIndia } from "@/constants/constants";
import axios from "axios";
import { BACKEND_URL } from "@/config/config";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";

const AuthDialog = ({ isLogin, setIsLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const { toast } = useToast();

  const submit = async () => {
    if (isLogin) {
      try {
        const res = await axios.post(
          `http://${BACKEND_URL}/api/v1/user/signin`,
          {
            email,
            password,
          }
        );
        localStorage.setItem("token", `Bearer ${res.data.token}`);
        toast({
          title: "Successfully signin",
        });

        navigate("/");
      } catch (error) {
        console.log(error);
        toast({
          title: error.response.data.message ?? error.message,
          variant: "destructive",
        });
      }
    } else {
      try {
        await axios.post(`http://${BACKEND_URL}/api/v1/user/signup`, {
          username,
          email,
          password,
          location,
        });
        toast({
          title: "Account Successfully created",
          description : "Now Login with your credentials"
        });
      } catch (error) {
        console.log(error);
        toast({
          title: error.response.data.message ?? error.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {isLogin ? "Login to Your Account" : "Create an Account"}
        </DialogTitle>
        <DialogDescription>
          {isLogin
            ? "Enter your email and password to login"
            : "Enter your details to create your account"}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-6 py-4">
        {!isLogin && (
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-gray-700">
              Name
            </Label>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              id="name"
              type="text"
              placeholder="Enter username"
              className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="m@example.com"
            className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-gray-700">
            Password
          </Label>
          <Input
            id="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        {!isLogin && (
          <div className="grid gap-2">
            <Label htmlFor="location" className="text-gray-700">
              Location
            </Label>
            <Select onValueChange={(value) => setLocation(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>States</SelectLabel>
                  {statesInIndia.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <DialogFooter className="flex flex-col items-center">
        <Button onClick={submit} type="submit">
          {isLogin ? "Login" : "Get Started Free"}
        </Button>
        <div className="flex flex-col justify-center text-center mt-4">
          <p className="text-gray-700">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span
              className="ml-2 text-blue-500 underline cursor-pointer hover:text-blue-600"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Login"}
            </span>
          </p>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default AuthDialog;
