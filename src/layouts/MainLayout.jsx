import { Outlet, useLocation } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import Navbar from "../components/common/Navbar";
import CategoryMenu from "../components/common/CategoryMenu";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  const { pathname } = useLocation();

  // Pages where navbar MUST NOT appear
  const cleanLayoutPages = [
    "/profile",
    "/address-book",
    "/my-orders",
    "/wishlist",
    "/support",
    "/login",
    "/register",
  ];

  const isCleanLayout =
    // exact & prefix matches
    cleanLayoutPages.some((p) => pathname.startsWith(p)) ||

    // order related
    pathname.startsWith("/track-order") ||
    pathname.startsWith("/return-order") ||
    pathname.startsWith("/cancel-order") ||

    // 🔥 PRODUCT DETAILS (MOST IMPORTANT)
    pathname.startsWith("/product/") ||
    pathname.startsWith("/products/details/") ||

    // checkout flow
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/payment");

  return (
    <>
      {/* ===== HEADER ===== */}
      {!isCleanLayout && <TopBar />}
      {!isCleanLayout && <Navbar />}
      {!isCleanLayout && <CategoryMenu />}

      {/* ===== PAGE CONTENT ===== */}
      <main className="min-h-screen bg-[#FFF7ED]">
        <Outlet />
      </main>

      {/* ===== FOOTER ===== */}
      {!isCleanLayout && <Footer />}
    </>
  );
};

export default MainLayout;
