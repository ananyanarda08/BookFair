import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Avatar } from "@mui/material";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isLoggedIn = user && user.name;
  const isBuyer = user.type === "buyer";
  const isSeller = user.type === "seller";
  const profilePic = localStorage.getItem("profilePic");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("shopName");
    localStorage.removeItem("profilePic");
    navigate("/");
  };

  const showAuthButtons =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/login";

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 md:p-6 z-10 shadow-md bg-[#3A7D44]">
      <Link to="/" className="flex items-center space-x-2">
        <MenuBookIcon sx={{ fontSize: 30, color: "#F8F5E9" }} />
        <span className="text-2xl md:text-4xl font-bold bg-[#F8F5E9] text-transparent bg-clip-text">
          BookFair
        </span>
      </Link>

      <div className="flex items-center space-x-3 md:space-x-6">
        {isBuyer && (
          <>
            <Link to="/buyer-profile" className="relative">
              <Avatar
                sx={{ bgcolor: "#F8F5E9", color: "black" }}
                src={profilePic || ""}
              />
            </Link>

            <Link to="/cart-item" className="relative">
              <ShoppingCartIcon
                className="text-[#F8F5E9]"
                sx={{ fontSize: 28 }}
              />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          </>
        )}
        {isSeller && (
          <Link to="/seller-profile" className="relative">
            <Avatar
              sx={{ bgcolor: "#F8F5E9", color: "black" }}
              src={profilePic || ""}
            />
          </Link>
        )}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md opacity-80 hover:opacity-100 hover:bg-red-600 transition text-sm md:text-base"
          >
            Logout
          </button>
        ) : (
          showAuthButtons && (
            <div className="space-x-2 md:space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md opacity-80 hover:opacity-100 hover:bg-blue-600 transition text-sm md:text-base"
                onClick={() => navigate("/signup")}
              >
                Register
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md opacity-80 hover:opacity-100 hover:bg-green-600 transition text-sm md:text-base"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
