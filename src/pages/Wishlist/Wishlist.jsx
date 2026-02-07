import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      title: "Premium Wireless Headphones",
      price: 2999,
      oldPrice: 4999,
      discount: "40% OFF",
      rating: 4.5,
      reviews: 1250,
      image: "/src/assets/products/p1.jpg",
    },
    {
      id: 2,
      title: "Smart Fitness Watch",
      price: 3499,
      oldPrice: 5999,
      discount: "42% OFF",
      rating: 4.3,
      reviews: 890,
      image: "/src/assets/products/p2.jpg",
    },
    {
      id: 3,
      title: "Casual Denim Jacket",
      price: 1299,
      oldPrice: 2499,
      discount: "48% OFF",
      rating: 4.6,
      reviews: 2340,
      image: "/src/assets/products/p3.jpg",
    },
    {
      id: 4,
      title: "Non-Stick Cookware Set",
      price: 2199,
      oldPrice: 3999,
      discount: "45% OFF",
      rating: 4.4,
      reviews: 1567,
      image: "/src/assets/products/p4.jpg",
    },
    {
      id: 5,
      title: "Luxury Skincare Set",
      price: 1799,
      oldPrice: 2999,
      discount: "40% OFF",
      rating: 4.7,
      reviews: 3450,
      image: "/src/assets/products/p5.jpg",
    },
    {
      id: 6,
      title: "Running Shoes Pro",
      price: 2499,
      oldPrice: 4499,
      discount: "44% OFF",
      rating: 4.5,
      reviews: 1890,
      image: "/src/assets/products/p6.jpg",
    },
  ]);

  const removeItem = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FFF7ED]">

      {/* ✅ UPPER RAISED NAV BAR (same as MyOrders) */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">{">"}</span>
          <span className="text-gray-800 font-medium">My Wishlist</span>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-6">

        <h2 className="text-2xl font-bold mb-6">
          My Wishlist ({wishlist.length} items)
        </h2>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-3 relative"
            >
              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100"
              >
                <X size={16} />
              </button>

              {/* Discount Badge */}
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                {item.discount}
              </span>

              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-contain mb-3"
              />

              {/* Title */}
              <h3 className="text-sm font-semibold line-clamp-2">
                {item.title}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 text-sm mt-1">
                <span className="bg-green-600 text-white px-2 rounded text-xs">
                  {item.rating} ★
                </span>
                <span className="text-gray-500 text-xs">
                  ({item.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="mt-2">
                <span className="font-bold text-lg">₹{item.price}</span>
                <span className="line-through text-gray-400 text-sm ml-2">
                  ₹{item.oldPrice}
                </span>
              </div>

              {/* Button */}
              <button className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded text-sm">
                Add to Cart
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Wishlist;
