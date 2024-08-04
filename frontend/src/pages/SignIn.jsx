import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { BACKEND_URL } from "@/config/config";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const submit = async () => {
    try {
      const res = await axios.post(`http://${BACKEND_URL}/api/v1/user/signin`, {
        email,
        password,
      });
      localStorage.setItem("token", `Bearer ${res.data.token}`);
      toast({
        title: "Successfully signin",
      });

      navigate("/");
    } catch (error) {
      console.log(error)
      toast({
        title: error.response.data.message ?? error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-2 min-h-screen bg-gray-50">
      <div className="col-span-1">
        <img
          src="/olx-landing.jpg"
          className="w-full h-full object-cover"
          alt="Landing"
        />
      </div>
      <div className="flex justify-center items-center col-span-1 p-8 bg-white shadow-lg rounded-lg">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">
              Login
            </CardTitle>
            <CardDescription className="text-gray-600">
              Login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
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
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <Button
              onClick={submit}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Login
            </Button>
            <div className="flex items-center mt-4">
              <p className="text-gray-700">
                Don't have an account?
                <span
                  className="ml-2 text-blue-500 underline cursor-pointer hover:text-blue-600"
                  onClick={() => navigate("/signup")}
                >
                  signup
                </span>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
