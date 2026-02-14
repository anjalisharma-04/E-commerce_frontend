import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { products } from "../../data/products.data";
import { useWishlist } from "../../services/WishlistContext";
import { Heart } from "lucide-react"; // ✅ ADDED

const categories = [
  "Electronics","Fashion","Home & Kitchen","Beauty","Books","Sports","Toys & Games",
];

const brands = ["Sony","Apple","Levi's","Prestige","Lakme","Nike","Penguin"];

const ProductList = () => {

  const navigate = useNavigate();
  const { category } = useParams();

  // ✅ ADDED (Wishlist Hooks)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const cleanCategory = category
    ? category.replace("category-", "").toLowerCase()
    : "";

  const [selectedCategories, setSelectedCategories] = useState(
    cleanCategory ? [cleanCategory] : []
  );
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(100000);
  const [sort, setSort] = useState("popularity");

  useEffect(() => {
    if (cleanCategory) {
      setSelectedCategories([cleanCategory]);
    }
  }, [cleanCategory]);

  let filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(p.category.toLowerCase());

    const matchBrand =
      selectedBrands.length === 0 ||
      selectedBrands.includes(p.brand);

    const matchRating = p.rating >= rating;
    const matchPrice = p.price <= price;

    return matchCategory && matchBrand && matchRating && matchPrice;
  });

  if (sort === "low") filteredProducts.sort((a, b) => a.price - b.price);
  if (sort === "high") filteredProducts.sort((a, b) => b.price - a.price);
  if (sort === "rating") filteredProducts.sort((a, b) => b.rating - a.rating);
  if (sort === "new") filteredProducts.sort((a, b) => b.id - a.id);

  const toggleCategory = (cat) => {
    const value = cat.toLowerCase();
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((c) => c !== value)
        : [...prev, value]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setRating(0);
    setPrice(100000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      <div className="text-sm text-gray-500 mb-4">
        <Link to="/">Home</Link> {" > "}
        <span className="text-gray-800 font-medium">All Products</span>
      </div>

      <div className="flex gap-6">

        {/* LEFT FILTER */}
        <aside className="w-72 bg-white p-4 rounded-xl shadow hidden md:block h-[85vh] overflow-y-auto">

          <div className="flex justify-between mb-3">
            <h3 className="font-bold">Filters</h3>
            <button onClick={clearAll} className="text-orange-500 text-sm">
              Clear All
            </button>
          </div>

          <h4 className="font-semibold mb-2">Categories</h4>
          {categories.map((cat) => (
            <label key={cat} className="block text-sm mb-1">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.toLowerCase())}
                onChange={() => toggleCategory(cat)}
                className="mr-2"
              />
              {cat}
            </label>
          ))}

          <h4 className="font-semibold mt-4 mb-2">Price Range</h4>
          <input
            type="range"
            min="0"
            max="100000"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-purple-600"
          />

          <h4 className="font-semibold mt-4 mb-2">Customer Ratings</h4>
          {[4,3,2,1].map((r) => (
            <label key={r} className="block text-sm">
              <input
                type="radio"
                name="rating"
                checked={rating === r}
                onChange={() => setRating(r)}
                className="mr-2"
              />
              {r} ⭐ & above
            </label>
          ))}

          <h4 className="font-semibold mt-4 mb-2">Brand</h4>
          {brands.map((b) => (
            <label key={b} className="block text-sm mb-1">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => toggleBrand(b)}
                className="mr-2"
              />
              {b}
            </label>
          ))}
        </aside>

        {/* RIGHT */}
        <div className="flex-1">

          <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-xl shadow">
            <div>
              <h2 className="text-xl font-bold">All Products</h2>
              <p className="text-gray-500">
                {filteredProducts.length} products found
              </p>
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border-2 border-orange-500 px-3 py-2 rounded-lg"
            >
              <option value="popularity">Popularity</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="new">Newest First</option>
            </select>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => {
              const inWishlist = isInWishlist(p.id);

              return (
                <div
                  key={p.id}
                  onClick={() => navigate(`/products/details/${p.id}`)}
                  className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer relative transition"
                >

                  {/* ✅ WISHLIST BUTTON ADDED */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      inWishlist
                        ? removeFromWishlist(p.id)
                        : addToWishlist(p);
                    }}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition"
                  >
                    <Heart
                      size={18}
                      className={
                        inWishlist
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }
                    />
                  </button>

                  <img
                    src={p.image}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />

                  <div className="p-3">
                    <h3 className="font-semibold text-sm">{p.title}</h3>
                    <p className="text-green-600 text-sm">⭐ {p.rating}</p>
                    <p className="font-bold">₹{p.price}</p>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductList;
