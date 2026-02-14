import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { X } from "lucide-react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(data);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exist = cart.find((i) => i.id === product.id);

    if (exist) exist.qty += 1;
    else cart.push({ ...product, qty: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-orange-500">Home</Link> {" > "}
        <span className="text-gray-800 font-medium">My Wishlist</span>
      </div>

      <h2 className="text-2xl font-bold mb-6">
        My Wishlist ({wishlist.length} items)
      </h2>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          Your wishlist is empty.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition relative p-3"
            >

              {/* Discount Badge */}
              <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded">
                {product.discount}% OFF
              </span>

              {/* Remove Button */}
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 bg-white p-1 rounded-full shadow hover:bg-gray-100"
              >
                <X size={16} />
              </button>

              {/* Product Image */}
              <img
                src={product.image}
                alt={product.title}
                onClick={() => navigate(`/products/details/${product.id}`)}
                className="h-40 w-full object-contain cursor-pointer"
              />

              {/* Title */}
              <h3
                onClick={() => navigate(`/products/details/${product.id}`)}
                className="text-sm font-semibold mt-2 line-clamp-2 cursor-pointer"
              >
                {product.title}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-1">
                <span className="bg-green-600 text-white text-xs px-2 rounded">
                  {product.rating} ★
                </span>
                <span className="text-xs text-gray-500">
                  ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="flex gap-2 mt-2 items-center">
                <span className="font-bold">₹{product.price}</span>
                <span className="line-through text-gray-400 text-sm">
                  ₹{product.oldPrice}
                </span>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(product)}
                className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm"
              >
                Add to Cart
              </button>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Wishlist;
