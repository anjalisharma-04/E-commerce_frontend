import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// Pages
import Home from "../pages/Home/Home";
import ProductList from "../pages/Products/ProductList";
import ProductDetails from "../pages/Products/ProductDetails";

import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Payment from "../pages/Payment/Payment";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";

import MyOrders from "../pages/Orders/MyOrders";
import TrackOrder from "../pages/Orders/TrackOrder";
import ReturnOrder from "../pages/Orders/ReturnOrder";
import CancelOrder from "../pages/Orders/CancelOrder";

import Wishlist from "../pages/Wishlist/Wishlist";
import AddressBook from "../pages/AddressBook/AddressBook";
import Profile from "../pages/Profile/Profile";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import Support from "../pages/Support/Support";
import ChatSupport from "../pages/Chat/ChatSupport";

import NotFound from "../pages/NotFound/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ✅ ALL pages inside MainLayout */}
      <Route path="/" element={<MainLayout />}>
        {/* Home */}
        <Route index element={<Home />} />

        {/* Products */}
        <Route path="products" element={<ProductList />} />
        <Route path="products/:category" element={<ProductList />} />
        <Route path="products/details/:id" element={<ProductDetails />} />

        {/* Cart & Checkout */}
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="payment" element={<Payment />} />
        <Route path="order-success" element={<OrderSuccess />} />

        {/* Orders */}
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="track-order/:orderId" element={<TrackOrder />} />
        <Route path="return-order/:orderId" element={<ReturnOrder />} />
        <Route path="cancel-order/:orderId" element={<CancelOrder />} />

        {/* Profile & User */}
        <Route path="profile" element={<Profile />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="address-book" element={<AddressBook />} />

        {/* Support & Chat */}
        <Route path="support" element={<Support />} />
        <Route path="chat/admin" element={<ChatSupport />} />

        {/* Auth */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;