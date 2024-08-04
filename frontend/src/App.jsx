import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Appbar from "./components/Appbar";
import { Button } from "./components/ui/button";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Sell from "./pages/Sell";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WithAppbar element={<Home />} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route 
        path="/sell" 
        element={<WithAppbar element={<Sell />} />}
        />
        {/* <Route
          path="/dashboard"
          element={<WithAppbar element={<Dashboard />} />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

const WithAppbar = ({ element }) => {
  const location = useLocation();

  const isPublicRoute =
    location.pathname === "/signup" ||
    location.pathname === "/login";

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
