import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { products } from "../../data/products.data";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = useMemo(
    () => products.find((p) => p.id === Number(id)),
    [id]
  );

  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [tab, setTab] = useState("desc");
  const [wishlisted, setWishlisted] = useState(() => {
    const w = JSON.parse(localStorage.getItem("wishlist") || "[]");
    return w.includes(Number(id));
  });

  if (!product) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Product not found
      </div>
    );
  }

  // Wishlist
  const toggleWishlist = () => {
    let w = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (w.includes(product.id)) {
      w = w.filter((i) => i !== product.id);
      setWishlisted(false);
    } else {
      w.push(product.id);
      setWishlisted(true);
    }
    localStorage.setItem("wishlist", JSON.stringify(w));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-orange-500">Home</Link> {" > "}
        <Link to="/products" className="hover:text-orange-500">Products</Link> {" > "}
        <span className="text-gray-800 font-medium">{product.title}</span>
      </div>

      {/* Top Card */}
      <div className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[420px] object-contain rounded"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

          <div className="flex items-center gap-2 mb-3">
            <span className="bg-green-600 text-white text-sm px-2 py-1 rounded">
              {product.rating} ★
            </span>
            <span className="text-gray-500 text-sm">
              {product.reviews} reviews
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-black">
              ₹{product.price}
            </span>
            <span className="line-through text-gray-400">
              ₹{product.oldPrice}
            </span>
            <span className="text-green-600 text-sm font-semibold">
              {product.discount}% OFF
            </span>
          </div>

          {/* Color */}
          <div className="mb-4">
            <p className="font-semibold mb-2">Color</p>
            <div className="flex gap-2">
              {["Black", "White", "Blue", "Red", "Gray"].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-4 py-2 border rounded-md text-sm ${
                    selectedColor === c
                      ? "border-orange-500 text-orange-500"
                      : "border-gray-300"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <p className="font-semibold mb-2">Quantity</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-8 h-8 border rounded"
              >−</button>
              <span>{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-8 h-8 border rounded"
              >+</button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => navigate("/cart")}
              className="flex-1 bg-gray-100 border py-3 rounded-md font-semibold"
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="flex-1 bg-orange-500 text-white py-3 rounded-md font-semibold"
            >
              Buy Now
            </button>
          </div>

          {/* Wishlist */}
          <button
            onClick={toggleWishlist}
            className="mt-4 flex items-center gap-2 text-sm"
          >
            <span className={wishlisted ? "text-orange-500" : ""}>♥</span>
            {wishlisted ? "Wishlisted" : "Add to Wishlist"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white mt-8 rounded-xl shadow p-6">
        <div className="flex gap-6 border-b mb-4">
          <button onClick={() => setTab("desc")} className={tab==="desc"?"border-b-2 border-orange-500 text-orange-500":""}>Description</button>
          <button onClick={() => setTab("spec")} className={tab==="spec"?"border-b-2 border-orange-500 text-orange-500":""}>Specifications</button>
          <button onClick={() => setTab("rev")} className={tab==="rev"?"border-b-2 border-orange-500 text-orange-500":""}>Reviews</button>
        </div>

        {tab === "desc" && (
          <p className="text-gray-700">
            This {product.title} is designed to deliver premium quality and
            performance.
          </p>
        )}

        {tab === "spec" && (
          <ul className="text-gray-700 space-y-2">
            <li><b>Brand:</b> {product.brand}</li>
            <li><b>Category:</b> {product.category}</li>
            <li><b>Rating:</b> {product.rating}</li>
          </ul>
        )}

        {tab === "rev" && (
          <p className="text-gray-700">
            ⭐⭐⭐⭐☆ Based on {product.reviews} reviews.
          </p>
        )}
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Related Products</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products
            .filter(
              (p) => p.id !== product.id && p.category === product.category
            )
            .slice(0, 5)
            .map((item) => (
              <Link
                to={`/product/${item.id}`}
                key={item.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-3 relative"
              >
                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  {item.discount}% OFF
                </span>

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-contain mb-3"
                />

                <h3 className="text-sm font-semibold line-clamp-2 mb-2">
                  {item.title}
                </h3>

                <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                  {item.rating} ★
                </span>

                <div className="flex gap-2 mt-2">
                  <span className="font-bold">₹{item.price}</span>
                  <span className="line-through text-gray-400 text-sm">
                    ₹{item.oldPrice}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </div>
      {/* ================= END ================= */}
    </div>
  );
};

export default ProductDetails;
