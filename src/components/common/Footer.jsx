import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#FFF9F3] border-t border-orange-100">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-orange-500 text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold">
              🛍
            </div>
            <span className="text-xl font-bold text-orange-500">
              ShopMart
            </span>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Your one-stop destination for all your shopping needs.
            Quality products, great prices, and fast delivery.
          </p>

          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition cursor-pointer"
              >
                <Icon size={18} />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><Link to="/products" className="hover:text-orange-500">All Products</Link></li>
            <li><Link to="/orders/history" className="hover:text-orange-500">My Orders</Link></li>
            <li><Link to="/wishlist" className="hover:text-orange-500">Wishlist</Link></li>
            <li><Link to="/cart" className="hover:text-orange-500">Shopping Cart</Link></li>
            <li><Link to="/profile" className="hover:text-orange-500">My Profile</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">
            Customer Service
          </h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><Link to="/support" className="hover:text-orange-500">Help Center</Link></li>
            <li><Link to="/shipping" className="hover:text-orange-500">Shipping Info</Link></li>
            <li><Link to="/returns" className="hover:text-orange-500">Returns & Refunds</Link></li>
            <li><Link to="/payments" className="hover:text-orange-500">Payment Methods</Link></li>
            <li><Link to="/orders/track" className="hover:text-orange-500">Track Order</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">
            Contact Us
          </h4>

          <ul className="space-y-4 text-sm text-gray-600">
            <li className="flex gap-3">
              <MapPin size={18} className="text-orange-500" />
              <span>
                123 Shopping Street, Mumbai,
                Maharashtra 400001
              </span>
            </li>

            <li className="flex gap-3">
              <Phone size={18} className="text-orange-500" />
              <span>+91 98765 43210</span>
            </li>

            <li className="flex gap-3">
              <Mail size={18} className="text-orange-500" />
              <span>support@shopmart.com</span>
            </li>

            <li className="flex gap-3">
              <Clock size={18} className="text-orange-500" />
              <span>24/7 Customer Support</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-orange-100 bg-white">
  <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 gap-3">
    <p>© 2024 ShopMart. All rights reserved.</p>

    <div className="flex gap-6">
      <Link to="/privacy" className="hover:text-orange-500">
        Privacy Policy
      </Link>
      <Link to="/terms" className="hover:text-orange-500">
        Terms of Service
      </Link>
      <Link to="/cookies" className="hover:text-orange-500">
        Cookie Policy
      </Link>
    </div>
  </div>
</div>
    </footer>
  );
};

export default Footer;
