import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Payment = () => {
  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const navigate = useNavigate(); // ✅ missing before

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-gray-50">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-orange-500">Home</Link> {" > "}
        <Link to="/cart" className="hover:text-orange-500">Cart</Link> {" > "}
        <Link to="/checkout" className="hover:text-orange-500">Checkout</Link> {" > "}
        <span className="text-gray-800 font-medium">Payment</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 bg-white p-5 rounded shadow">
          <h2 className="font-bold text-lg mb-4">Choose Payment Method</h2>

          {/* Payment Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {["upi", "card", "netbanking", "cod"].map((item) => (
              <button
                key={item}
                onClick={() => setMethod(item)}
                className={`border rounded p-3 flex flex-col items-center gap-1 ${
                  method === item ? "border-orange-500 bg-orange-50" : ""
                }`}
              >
                {item === "upi" && "📱 UPI"}
                {item === "card" && "💳 Card"}
                {item === "netbanking" && "🏦 Net Banking"}
                {item === "cod" && "💵 Cash on Delivery"}
              </button>
            ))}
          </div>

          {/* UPI Section */}
          {method === "upi" && (
            <div>
              <label className="block font-medium mb-2">Enter UPI ID</label>
              <input
                type="text"
                placeholder="example@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="border w-full p-2 rounded mb-3"
              />

              <div className="bg-blue-50 text-blue-700 p-2 rounded text-sm mb-3">
                You will be redirected to your UPI app to complete the payment
              </div>

              <p className="font-medium mb-2">Popular UPI Apps</p>
              <div className="flex gap-3">
                <button className="border px-4 py-2 rounded">Google Pay</button>
                <button className="border px-4 py-2 rounded">PhonePe</button>
                <button className="border px-4 py-2 rounded">Paytm</button>
              </div>
            </div>
          )}

          {/* Card Section */}
          {method === "card" && (
            <div className="space-y-3">
              <input className="border p-2 w-full rounded" placeholder="Card Number" />
              <div className="grid grid-cols-2 gap-3">
                <input className="border p-2 rounded" placeholder="MM/YY" />
                <input className="border p-2 rounded" placeholder="CVV" />
              </div>
              <input className="border p-2 w-full rounded" placeholder="Card Holder Name" />
            </div>
          )}

          {/* Net Banking */}
          {method === "netbanking" && (
            <select className="border p-2 rounded w-full">
              <option>Select Bank</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>SBI</option>
              <option>Axis Bank</option>
            </select>
          )}

          {/* COD */}
          {method === "cod" && (
            <div className="text-green-600 font-medium">
              Pay when your order is delivered.
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="bg-white p-5 rounded shadow h-fit">
          <h2 className="font-bold text-lg mb-4">Order Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Price (2 items)</span>
              <span>₹37,997</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹8,000</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-green-600">FREE</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>₹29,997</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/order-success")}
            className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-semibold"
          >
            Pay Now
          </button>

          <div className="mt-4 text-green-600 text-sm flex items-center gap-2">
            ✅ 100% Secure Payment
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
