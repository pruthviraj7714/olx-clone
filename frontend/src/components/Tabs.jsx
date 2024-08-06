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

export function ITabs() {
  return (
    <Tabs defaultValue="purchases" className="w-full max-w-2xl mx-auto mt-8">
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
           {/* <ProductCard className /> */}
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
            <div className="space-y-2">
              <Label
                htmlFor="current"
                className="block text-sm font-medium text-gray-700"
              >
                Current password
              </Label>
              <Input
                id="current"
                type="password"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="new"
                className="block text-sm font-medium text-gray-700"
              >
                New password
              </Label>
              <Input
                id="new"
                type="password"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </CardContent>
          <CardFooter className="p-4 border-t border-gray-200">
            <Button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Save password
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
