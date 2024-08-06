import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CiHeart, CiLogout, CiMoneyCheck1, CiSettings } from "react-icons/ci";
import { FaMoneyBill, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { useEffect } from "react";

export function AppMenu() {
    const navigate = useNavigate();
    const { toast } = useToast();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-slate-100 text-black hover:bg-slate-200">
          Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
          <div className="flex gap-1" onClick={() => navigate('/profile')}>
            <FaUser className="mr-2 h-4 w-4" />
            <span>Profile</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex gap-1" onClick={() => navigate('/on-sale')}>
              <FaMoneyBill className="mr-2 h-4 w-4" />
              <span>Products on Sale</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <div className="flex gap-1" onClick={() => navigate('/wishlist')}>
            <CiHeart className="mr-2 h-4 w-4" />
            <span>Wishlist</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <AlertDialog
          onOpenChange={() => {
            setTimeout(() => (document.body.style.pointerEvents = ""), 100);
          }}
        >
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="my-2 mx-3">
              Logout
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to log out? You will need to log in again
                to access your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  localStorage.removeItem("token");
                  toast({
                    title : "You Logged out"
                  })
                  navigate("/login");
                }}
              >
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
