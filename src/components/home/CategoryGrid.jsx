import { useNavigate } from "react-router-dom";

// ✅ Import Images Properly
import a1 from "../../assets/categories/a1.jpg";
import a2 from "../../assets/categories/a2.jpg";
import a3 from "../../assets/categories/a3.jpg";
import a4 from "../../assets/categories/a4.jpg";
import a5 from "../../assets/categories/a5.jpg";
import a6 from "../../assets/categories/a6.avif";
import a7 from "../../assets/categories/a7.jpg";
import a8 from "../../assets/categories/a8.jpg";

const categories = [
  {
    name: "Electronics",
    products: "2500+ Products",
    image: a1,
    slug: "electronics",
  },
  {
    name: "Fashion",
    products: "5000+ Products",
    image: a2,
    slug: "fashion",
  },
  {
    name: "Home & Kitchen",
    products: "3200+ Products",
    image: a3,
    slug: "home-kitchen",
  },
  {
    name: "Beauty",
    products: "1800+ Products",
    image: a4,
    slug: "beauty",
  },
  {
    name: "Books",
    products: "4500+ Products",
    image: a5,
    slug: "books",
  },
  {
    name: "Sports",
    products: "2100+ Products",
    image: a6,
    slug: "sports",
  },
  {
    name: "Toys & Games",
    products: "1500+ Products",
    image: a7,
    slug: "toys",
  },
  {
    name: "Grocery",
    products: "3800+ Products",
    image: a8,
    slug: "grocery",
  },
];

const CategoryGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Shop by Category
          </h2>

          <button
            onClick={() => navigate("/products")}
            className="text-orange-500 font-medium flex items-center gap-1 hover:underline"
          >
            View All →
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigate(`/products?category=${cat.slug}`)}
              className="cursor-pointer bg-[#FFF7ED] rounded-2xl p-5 transition hover:shadow-xl"
            >
              {/* Image */}
              <div className="rounded-xl overflow-hidden mb-5 bg-white">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-40 object-cover"
                />
              </div>

              {/* Text */}
              <h3 className="text-lg font-semibold text-gray-900">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {cat.products}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategoryGrid;