import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  ShoppingBag,
  MapPin,
  LogOut,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goTo = (path) => {
    navigate(path);
    setOpenProfile(false);
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-orange-500">
          <div className="bg-orange-500 text-white w-9 h-9 flex items-center justify-center rounded-lg">
            🛍
          </div>
          ShopMart
        </Link>

        {/* Search */}
        <div className="relative flex-1 hidden md:block">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5 text-sm text-gray-700">

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="relative flex items-center gap-1 hover:text-orange-500"
          >
            <ShoppingCart size={20} />
            <span className="hidden md:block">Cart</span>
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 rounded-full">
              3
            </span>
          </button>

          {/* Wishlist */}
          <button
            onClick={() => navigate("/wishlist")}
            className="flex items-center gap-1 hover:text-orange-500"
          >
            <Heart size={20} />
            <span className="hidden md:block">Wishlist</span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpenProfile((prev) => !prev)}
              className="flex items-center gap-1 hover:text-orange-500"
            >
              <User size={20} />
              <span className="hidden md:block">Profile</span>
              <ChevronDown size={16} />
            </button>

            {openProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border z-50">

                <div
                  onClick={() => goTo("/profile")}
                  className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gray-50 cursor-pointer"
                >
                  <User size={18} /> My Profile
                </div>

                <div
                  onClick={() => goTo("/my-orders")}
                  className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gray-50 cursor-pointer"
                >
                  <ShoppingBag size={18} /> My Orders
                </div>

                <div
                  onClick={() => goTo("/wishlist")}
                  className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gray-50 cursor-pointer"
                >
                  <Heart size={18} /> Wishlist
                </div>

                {/* ✅ Address fixed */}
                <div
                  onClick={() => goTo("/address-book")}
                  className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gray-50 cursor-pointer"
                >
                  <MapPin size={18} /> Addresses
                </div>

                <div className="border-t my-1"></div>

                <div
                  onClick={() => goTo("/login")}
                  className="flex items-center gap-3 px-5 py-3 text-sm text-orange-500 hover:bg-orange-50 cursor-pointer"
                >
                  <LogOut size={18} /> Logout
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
