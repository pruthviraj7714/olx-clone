import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Appbar from "./components/Appbar";
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import Product from "./pages/Product";
import SaleProducts from "./pages/SaleProducts";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import PurchaseHistory from "./pages/PurchaseHistory";
import Footer from "./pages/Footer";

const Layout = () => (
  <>
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md mb-4">
      <div className="flex items-center">
        <svg
          className="w-5 h-5 mr-2 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 17h2v2h-2zm0-6h2v4h-2zm0-4h2v2h-2z"
          ></path>
        </svg>
        <span className="font-semibold">Important Notice:</span>
      </div>
      <p className="mt-2">
        For a limited time, we have provided shopping coins for test purchases.
        Use these coins to explore our products and experience our shopping
        platform without making a real purchase.
      </p>
    </div>
    <Appbar />
    <Outlet />
    <Footer />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/product/:category/:id" element={<Product />} />
          <Route path="/on-sale" element={<SaleProducts />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
