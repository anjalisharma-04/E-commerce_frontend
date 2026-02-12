import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    badge: "Bestseller",
    category: "Electronics",
    title: "Premium Wireless Headphones",
    rating: 4.5,
    reviews: 1250,
    price: 2999,
    oldPrice: 4999,
    discount: "40% off",
    image:
      "/products/p1.jpg",
  },
  {
    id: 2,
    badge: "Top Rated",
    category: "Electronics",
    title: "Smart Fitness Watch",
    rating: 4.3,
    reviews: 890,
    price: 3499,
    oldPrice: 5999,
    discount: "42% off",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: 3,
    badge: "Trending",
    category: "Fashion",
    title: "Casual Denim Jacket",
    rating: 4.6,
    reviews: 2340,
    price: 1299,
    oldPrice: 2499,
    discount: "48% off",
    image:
      "/products/p3.jpg",
  },
  {
    id: 4,
    badge: "Hot Deal",
    category: "Home & Kitchen",
    title: "Non-Stick Cookware Set",
    rating: 4.4,
    reviews: 1567,
    price: 2199,
    oldPrice: 3999,
    discount: "45% off",
    image:
      "/products/p4.jpg",
  },

  // -------- SECOND ROW (same component) --------

  {
    id: 5,
    badge: "Bestseller",
    category: "Beauty",
    title: "Luxury Skincare Set",
    rating: 4.7,
    reviews: 3450,
    price: 1799,
    oldPrice: 2999,
    discount: "40% off",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd",
  },
  {
    id: 6,
    badge: "New Arrival",
    category: "Sports",
    title: "Running Shoes Pro",
    rating: 4.5,
    reviews: 1890,
    price: 2499,
    oldPrice: 4499,
    discount: "44% off",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 7,
    badge: "Top Rated",
    category: "Books",
    title: "Bestselling Novel Collection",
    rating: 4.8,
    reviews: 5670,
    price: 599,
    oldPrice: 999,
    discount: "40% off",
    image:
      "/products/p7.jpg",
  },
  {
    id: 8,
    badge: "Hot Deal",
    category: "Electronics",
    title: "Wireless Gaming Mouse",
    rating: 4.4,
    reviews: 1120,
    price: 1499,
    oldPrice: 2299,
    discount: "35% off",
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7",
  },
];

const FeaturedProducts = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FFF7EC] py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <p className="text-gray-500 text-sm">
              Trending deals at the best prices
            </p>
          </div>
          <button
            onClick={() => navigate("/products")}
            className="text-orange-500 font-medium hover:underline"
          >
            View All →
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm p-4 relative hover:shadow-md transition"
            >
              {/* Badge */}
              <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                {product.badge}
              </span>

              {/* Wishlist */}
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
                <Heart size={16} />
              </button>

              {/* Image */}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-4 cursor-pointer"
                onClick={() => navigate(`/products/${product.id}`)}
              />

              {/* Content */}
              <p className="text-sm text-gray-500">{product.category}</p>
              <h3 className="font-semibold leading-tight mb-2">
                {product.title}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                  {product.rating} ★
                </span>
                <span className="text-sm text-gray-500">
                  ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <span className="text-lg font-bold">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-400 line-through ml-2">
                  ₹{product.oldPrice.toLocaleString()}
                </span>
                <span className="text-sm text-green-600 ml-2">
                  {product.discount}
                </span>
              </div>

              {/* Button */}
              <button
                onClick={() => navigate("/cart")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
