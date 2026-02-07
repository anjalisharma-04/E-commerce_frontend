import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const CancelOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [reason, setReason] = useState("");

  const handleCancel = () => {
    if (!reason) {
      alert("Please select a reason for cancellation");
      return;
    }
    navigate("/order-success");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-orange-500">Home</Link> {" > "}
        <Link to="/my-orders" className="hover:text-orange-500">My Orders</Link> {" > "}
        <span className="text-gray-800 font-medium">Cancel Order</span>
      </div>

      <div className="bg-white p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-4">Cancel Order</h2>

        {/* Order Info */}
        <div className="bg-gray-100 p-4 rounded mb-5 flex justify-between text-sm">
          <div>
            <p><b>Order ID:</b> {orderId}</p>
            <p>Order Date: 5 January 2024</p>
          </div>
          <div className="font-semibold">₹8,999</div>
        </div>

        {/* Reason */}
        <h3 className="font-semibold mb-3">
          Why do you want to cancel this order?
        </h3>

        <div className="space-y-2 mb-4">
          {[
            "Changed my mind",
            "Found a better price elsewhere",
            "Ordered by mistake",
            "Product no longer needed",
            "Delivery time too long",
            "Want to change delivery address",
            "Other",
          ].map((item, i) => (
            <label key={i} className="flex gap-2 items-center text-sm">
              <input
                type="radio"
                name="reason"
                value={item}
                checked={reason === item}
                onChange={(e) => setReason(e.target.value)}
              />
              {item}
            </label>
          ))}
        </div>

        {/* Refund Info */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded text-sm mb-5">
          <p className="font-semibold mb-1">Refund Information</p>
          <ul className="list-disc ml-5 space-y-1 text-blue-700">
            <li>Refund will be processed to your original payment method</li>
            <li>Processing time: 5-7 business days</li>
            <li>You will receive a confirmation email once processed</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCancel}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded w-full sm:w-auto"
          >
            Cancel Order
          </button>

          <button
            onClick={() => navigate(-1)}
            className="border px-6 py-2 rounded w-full sm:w-auto"
          >
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default CancelOrder;
