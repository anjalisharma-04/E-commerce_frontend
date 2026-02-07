import { Link, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 text-4xl">✔</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* Order Info */}
        <div className="bg-gray-50 rounded p-4 grid grid-cols-2 gap-4 text-left mb-4">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-semibold">ORDUL31KLZEH</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Order Date</p>
            <p className="font-semibold">27 January 2026</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Payment Method</p>
            <p className="font-semibold">UPI</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="font-semibold">₹16,998</p>
          </div>
        </div>

        {/* Delivery */}
        <div className="border border-blue-200 bg-blue-50 text-blue-700 rounded p-3 mb-6 flex items-center justify-center gap-2">
          🚚 Expected delivery by <strong>1 February</strong>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-4">
          <button
            onClick={() => navigate("/orders/history")}
            className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded font-medium"
          >
            View Order Details
          </button>

          <button
            onClick={() => navigate("/products")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold"
          >
            Continue Shopping
          </button>
        </div>

        <hr className="my-4" />

        <p className="text-sm text-gray-500">
          Order confirmation has been sent to your email and mobile number
        </p>

      </div>
    </div>
  );
};

export default OrderSuccess;
