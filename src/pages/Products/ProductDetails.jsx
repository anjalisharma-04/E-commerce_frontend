import { useParams, useNavigate, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { products } from "../../data/products.data";
import { Heart } from "lucide-react";


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = useMemo(
    () => products.find((p) => p.id === Number(id)),
    [id]
  );

  const relatedProducts = useMemo(
    () =>
      products.filter(
        (p) => p.category === product?.category && p.id !== product?.id
      ).slice(0, 5),
    [product]
  );

  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("desc");
  const [activeImage, setActiveImage] = useState(0);
  const [showMore, setShowMore] = useState(false);

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exist = cart.find((i) => i.id === product.id);
    if (exist) exist.qty += qty;
    else cart.push({ ...product, qty });
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-orange-500">Home</Link> {" > "}
        <Link to="/products" className="hover:text-orange-500">Products</Link> {" > "}
        <span className="text-gray-800 font-medium">{product.title}</span>
      </div>

      {/* ================= TOP SECTION ================= */}
      <div className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div>
          <div className="border rounded-xl bg-gray-50 h-[420px] flex items-center justify-center">
            <img
              src={product.images?.[activeImage] || product.image}
              className="max-h-full object-contain"
            />
          </div>
          <div className="flex gap-3 mt-4">
            {(product.images || [product.image]).map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(i)}
                className={`w-20 h-20 border rounded cursor-pointer object-contain ${
                  activeImage === i ? "border-orange-500" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

          <div className="flex items-center gap-2 mb-3">
            <span className="bg-green-600 text-white text-sm px-2 py-1 rounded">
              {product.rating} ★
            </span>
            <span className="text-gray-500 text-sm">
              {product.reviews} ratings
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold">₹{product.price}</span>
            <span className="line-through text-gray-400">
              ₹{product.oldPrice}
            </span>
            <span className="text-green-600 font-semibold">
              {product.discount}% OFF
            </span>
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <p className="font-semibold mb-2">Quantity</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 border rounded">-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-8 h-8 border rounded">+</button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <button onClick={addToCart} className="flex-1 border py-3 rounded font-semibold">
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart();
                navigate("/checkout");
              }}
              className="flex-1 bg-orange-500 text-white py-3 rounded font-semibold"
            >
              Buy Now
            </button>
          </div>

          {/* Seller */}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{product.seller}</p>
                <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                  {product.sellerRating} ★ Seller
                </span>
              </div>
              <button
                onClick={() => navigate("/chat/admin")}
                className="border border-orange-500 text-orange-500 px-4 py-2 rounded"
              >
                Chat with Seller
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="bg-white mt-8 rounded-xl shadow p-6">
        <div className="flex gap-8 border-b text-sm font-medium">
          <button onClick={() => setTab("desc")} className={`pb-3 ${tab==="desc" && "border-b-2 border-orange-500 text-orange-500"}`}>Description</button>
          <button onClick={() => setTab("spec")} className={`pb-3 ${tab==="spec" && "border-b-2 border-orange-500 text-orange-500"}`}>Specifications</button>
          <button onClick={() => setTab("rev")} className={`pb-3 ${tab==="rev" && "border-b-2 border-orange-500 text-orange-500"}`}>Reviews</button>
        </div>

        {tab === "desc" && (
          <div className="pt-6 space-y-4 text-sm">
            <p>{product.description}</p>
            {showMore && (
              <>
                <p>{product.longDescription}</p>
                <ul className="list-disc ml-6">
                  {product.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </>
            )}
            <button onClick={() => setShowMore(!showMore)} className="text-orange-500 font-medium">
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        )}

        {tab === "spec" && (
          <div className="pt-6 border rounded">
            {Object.entries(product.specs).map(([k, v], i) => (
              <div key={k} className={`grid grid-cols-2 px-4 py-3 text-sm ${i%2===0?"bg-gray-50":""}`}>
                <span className="text-gray-500">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "rev" && (
          <div className="pt-6 space-y-5">
            {product.reviewList.map((r, i) => (
              <div key={i} className="border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{r.name}</span>
                  <span className="text-gray-400">{r.time}</span>
                </div>
                <div className="text-yellow-500">★★★★★</div>
                <p className="text-sm">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {relatedProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/products/details/${p.id}`)}
              className="bg-white rounded-xl shadow hover:shadow-lg p-3 cursor-pointer"
            >
              <img src={p.image} className="h-36 w-full object-contain mb-2" />
              <h3 className="text-sm font-semibold line-clamp-2">{p.title}</h3>
              <div className="flex gap-2 mt-1">
                <span className="font-bold">₹{p.price}</span>
                <span className="line-through text-gray-400 text-sm">₹{p.oldPrice}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
