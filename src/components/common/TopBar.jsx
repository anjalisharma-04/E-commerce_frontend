import { NavLink } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="bg-orange-500 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">

        {/* Left Text */}
        <span className="flex items-center gap-1">
          🚚 Free Shipping on orders above ₹499
        </span>

        {/* Right Links */}
        <div className="flex gap-6 font-medium">

          <NavLink
            to="/support"
            className={({ isActive }) =>
              `hover:underline cursor-pointer transition ${
                isActive ? "underline font-semibold" : ""
              }`
            }
          >
            Help & Support
          </NavLink>

          <NavLink
            to="/my-orders"
            className={({ isActive }) =>
              `hover:underline cursor-pointer transition ${
                isActive ? "underline font-semibold" : ""
              }`
            }
          >
            Track Order
          </NavLink>

        </div>
      </div>
    </div>
  );
};

export default TopBar;
