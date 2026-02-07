import { NavLink } from "react-router-dom";

const categories = [
  { name: "All Products", slug: "all" },
  { name: "Electronics", slug: "electronics" },
  { name: "Fashion", slug: "fashion" },
  { name: "Home & Kitchen", slug: "home-kitchen" },
  { name: "Beauty", slug: "beauty" },
  { name: "Books", slug: "books" },
  { name: "Sports", slug: "sports" },
  { name: "Grocery", slug: "grocery" },
];

const CategoryMenu = () => {
  return (
    <nav className="bg-white shadow-md relative z-20">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex gap-6 text-sm font-medium text-gray-700 overflow-x-auto whitespace-nowrap">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <NavLink
                to={cat.slug === "all" ? "/products" : `/products/${cat.slug}`}
                className={({ isActive }) =>
                  `inline-block py-3 transition-colors ${
                    isActive
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "hover:text-orange-500"
                  }`
                }
              >
                {cat.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default CategoryMenu;
