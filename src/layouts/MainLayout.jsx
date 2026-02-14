import { Outlet, useLocation } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import Navbar from "../components/common/Navbar";
import CategoryMenu from "../components/common/CategoryMenu";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  const { pathname } = useLocation();

  // 🔥 Hide layout on these pages
  const hideLayout =
    pathname.startsWith("/products/details") || // Product Details
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/payment") ||
    pathname.startsWith("/track-order") ||
    pathname.startsWith("/return-order") ||
    pathname.startsWith("/cancel-order") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/address-book") ||
    pathname.startsWith("/my-orders") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  return (
    <>
      {/* Header */}
      {!hideLayout && <TopBar />}
      {!hideLayout && <Navbar />}
      {!hideLayout && <CategoryMenu />}

      {/* Page Content */}
      <main className="min-h-screen bg-[#FFF7ED]">
        <Outlet />
      </main>

      {/* Footer */}
      {!hideLayout && <Footer />}
    </>
  );
};

export default MainLayout;
