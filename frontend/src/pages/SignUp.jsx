import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { BACKEND_URL } from "@/config/config";
import { statesInIndia } from "@/constants/constants";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const submit = async () => {
    try {
      await axios.post(`http://${BACKEND_URL}/api/v1/user/signup`, {
        username,
        email,
        password,
        location,
      });
      toast({
        title: "Account Successfully created",
      });
      navigate("/");
    } catch (error) {
      console.log(error);

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
              Create an Account
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
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
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-700">
                Location
              </Label>
              <Select onValueChange={(value) => setLocation(value)}>
                <SelectTrigger className="w-[400px]">
                  <SelectValue placeholder="Select a Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>States</SelectLabel>
                    {statesInIndia.map((state) => (
                      <SelectItem
                        onChange={(e) => setLocation(e.target.value)}
                        key={state.value}
                        value={state.value}
                      >
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <Button
              onClick={submit}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Get Started Free
            </Button>
            <div className="flex items-center mt-4">
              <p className="text-gray-700">
                Already have an account?
                <span
                  className="ml-2 text-blue-500 underline cursor-pointer hover:text-blue-600"
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
