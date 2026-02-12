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
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // close profile dropdown
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
    setOpenMobileMenu(false);
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">

        {/* LEFT : Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-orange-500"
        >
          <div className="bg-orange-500 text-white w-9 h-9 flex items-center justify-center rounded-lg">
            🛍
          </div>
          ShopMart
        </Link>

        {/* CENTER : Search (desktop) */}
        <div className="relative flex-1 hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* RIGHT : Icons (desktop) */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">

          {/* Cart */}
          <button
            onClick={() => goTo("/cart")}
            className="relative hover:text-orange-500"
          >
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 rounded-full">
              3
            </span>
          </button>

          {/* Wishlist */}
          <button
            onClick={() => goTo("/wishlist")}
            className="hover:text-orange-500"
          >
            <Heart size={22} />
          </button>

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpenProfile((p) => !p)}
              className="flex items-center gap-1 hover:text-orange-500"
            >
              <User size={22} />
              <ChevronDown size={16} />
            </button>

            {openProfile && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border">
                <ProfileMenu goTo={goTo} />
              </div>
            )}
          </div>
        </div>

        {/* MOBILE : Hamburger */}
        <button
          onClick={() => setOpenMobileMenu(true)}
          className="md:hidden"
        >
          <Menu size={26} />
        </button>
      </div>

      {/* MOBILE MENU */}
      {openMobileMenu && (
        <div className="fixed inset-0 bg-black/40 z-50">
          <div className="bg-white w-72 h-full p-4">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg text-orange-500">
                ShopMart
              </span>
              <X onClick={() => setOpenMobileMenu(false)} />
            </div>

            {/* Search mobile */}
            <div className="relative mb-4">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>

            {/* Links */}
            <div className="space-y-3 text-sm">
              <MenuItem icon={<ShoppingCart />} label="Cart" onClick={() => goTo("/cart")} />
              <MenuItem icon={<Heart />} label="Wishlist" onClick={() => goTo("/wishlist")} />
              <MenuItem icon={<User />} label="Profile" onClick={() => goTo("/profile")} />
              <MenuItem icon={<ShoppingBag />} label="Orders" onClick={() => goTo("/my-orders")} />
              <MenuItem icon={<MapPin />} label="Addresses" onClick={() => goTo("/address-book")} />

              <div className="border-t pt-3">
                <MenuItem
                  icon={<LogOut />}
                  label="Logout"
                  danger
                  onClick={() => goTo("/login")}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

/* ---------- small components ---------- */

const MenuItem = ({ icon, label, onClick, danger }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-2 py-2 rounded cursor-pointer ${
      danger
        ? "text-orange-500 hover:bg-orange-50"
        : "hover:bg-gray-100"
    }`}
  >
    {icon}
    {label}
  </div>
);

const ProfileMenu = ({ goTo }) => (
  <>
    <MenuItem icon={<User size={18} />} label="My Profile" onClick={() => goTo("/profile")} />
    <MenuItem icon={<ShoppingBag size={18} />} label="My Orders" onClick={() => goTo("/my-orders")} />
    <MenuItem icon={<Heart size={18} />} label="Wishlist" onClick={() => goTo("/wishlist")} />
    <MenuItem icon={<MapPin size={18} />} label="Addresses" onClick={() => goTo("/address-book")} />
    <div className="border-t my-1" />
    <MenuItem
      icon={<LogOut size={18} />}
      label="Logout"
      danger
      onClick={() => goTo("/login")}
    />
  </>
);
