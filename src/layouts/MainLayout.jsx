import { Outlet, useLocation } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import Navbar from "../components/common/Navbar";
import CategoryMenu from "../components/common/CategoryMenu";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  const { pathname } = useLocation();

  // Pages WITHOUT navbar (clean pages)
  const cleanLayoutPages = [
    "/profile",
    "/address-book",
    "/my-orders",
    "/wishlist",
    "/support",
  ];

  const isCleanLayout =
    cleanLayoutPages.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/track-order") ||
    pathname.startsWith("/return-order") ||
    pathname.startsWith("/cancel-order");

  return (
    <>
      {!isCleanLayout && <TopBar />}
      {!isCleanLayout && <Navbar />}
      {!isCleanLayout && <CategoryMenu />}

      <main className="min-h-screen bg-[#FFF7ED]">
        <Outlet />
      </main>

      {!isCleanLayout && <Footer />}
    </>
  );
};

export default MainLayout;
