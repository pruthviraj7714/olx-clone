import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Appbar from "./components/Appbar";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import Product from "./pages/Product";
import SaleProducts from "./pages/SaleProducts";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import PurchaseHistory from "./pages/PurchaseHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WithAppbar element={<Home />} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/sell" element={<WithAppbar element={<Sell />} />} />
        <Route
          path="/product/:category/:id"
          element={<WithAppbar element={<Product />} />}
        />
        <Route
          path="/on-sale"
          element={<WithAppbar element={<SaleProducts />} />}
        />
        <Route
          path="/wishlist"
          element={<WithAppbar element={<Wishlist />} />}
        />
        <Route path="/profile" element={<WithAppbar element={<Profile />} />} />
        <Route path="/purchase-history" element={<WithAppbar element={<PurchaseHistory />} />} />
      </Routes>
    </BrowserRouter>
  );
}

const WithAppbar = ({ element }) => {
  const location = useLocation();

  const isPublicRoute =
    location.pathname === "/signup" || location.pathname === "/login";

  return isPublicRoute ? (
    element
  ) : (
    <>
      <Appbar />
      {element}
    </>
  );
};

export default App;
