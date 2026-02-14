import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../../data/products.data"; // ✅ ADDED

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Premium Wireless Headphones",
      price: 3999,
      oldPrice: 5999,
      discount: "33% off",
      seller: "AudioTech Store",
      color: "Black",
      qty: 1,
      image: "./products/p1.jpg",
    },
    {
      id: 2,
      title: "Smart Fitness Watch",
      price: 12999,
      oldPrice: 15999,
      discount: "19% off",
      seller: "FitTech Solutions",
      color: "Space Gray",
      qty: 2,
      image: "./products/p2.jpg",
    },
  ]);

  // ✅ RECOMMENDED PRODUCTS (Random 4 Different Products)
  const recommendedProducts = [...products]
    .filter((p) => !cartItems.some((item) => item.id === p.id))
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.oldPrice * item.qty,
    0
  );

  const totalDiscount = cartItems.reduce(
    (acc, item) => acc + (item.oldPrice - item.price) * item.qty,
    0
  );

  const finalAmount = totalPrice - totalDiscount;

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 bg-white rounded shadow p-4">
          <h2 className="text-xl font-bold mb-4">
            My Cart ({cartItems.length} items)
          </h2>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row gap-4 border-b py-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  Sold by: {item.seller}
                </p>
                <p className="text-sm text-gray-500">
                  Color: {item.color}
                </p>

                <div className="mt-2">
                  <span className="font-bold text-lg">₹{item.price}</span>
                  <span className="line-through text-gray-400 ml-2">
                    ₹{item.oldPrice}
                  </span>
                  <span className="text-green-600 ml-2">
                    {item.discount}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="border px-2 rounded"
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="border px-2 rounded"
                >
                  +
                </button>

                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-3 text-red-500"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded shadow p-4 h-fit">
          <h3 className="font-bold mb-4">Price Details</h3>

          <div className="flex justify-between mb-2">
            <span>Price ({cartItems.length} items)</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="flex justify-between mb-2 text-green-600">
            <span>Discount</span>
            <span>-₹{totalDiscount}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Delivery Charges</span>
            <span className="text-green-600">FREE</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount</span>
            <span>₹{finalAmount}</span>
          </div>

          <p className="text-green-600 text-sm mt-2">
            You will save ₹{totalDiscount} on this order
          </p>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-orange-500 text-white py-3 rounded mt-4 hover:bg-orange-600"
          >
            Place Order ({cartItems.length} items)
          </button>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="max-w-7xl mx-auto mt-8 bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-4">You might also like</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendedProducts.map((item) => (
            <div key={item.id} className="border rounded p-2 text-center">
              <img
                src={item.image}
                alt={item.title}
                className="mx-auto h-28 object-contain"
              />
              <p className="mt-2 text-sm">{item.title}</p>
              <p className="font-bold">₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
