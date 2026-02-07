import { useParams, Link } from "react-router-dom";

const OrderDetails = () => {
  const { orderId } = useParams();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-4 text-sm text-gray-500">
        <Link to="/">Home</Link> {" > "}
        <Link to="/my-orders">My Orders</Link> {" > "}
        <span className="text-gray-800 font-medium">Order Details</span>
      </div>

      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-bold mb-4">Order Details</h2>
        <p><b>Order ID:</b> {orderId}</p>
        <p>Status: Processing</p>
        <p>Total: ₹16,998</p>

        <button
          onClick={() => window.history.back()}
          className="mt-4 border px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
