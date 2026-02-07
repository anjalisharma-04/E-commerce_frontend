import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const ReturnOrder = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [reason, setReason] = useState("");
  const [selectedItems, setSelectedItems] = useState([1, 2]);

  const items = [
    {
      id: 1,
      title: "Premium Wireless Headphones",
      color: "Black",
      price: 3999,
      qty: 1,
      image: "/src/assets/products/p1.jpg",
    },
    {
      id: 2,
      title: "Smart Fitness Watch",
      color: "Space Gray",
      price: 12999,
      qty: 1,
      image: "/src/assets/products/p2.jpg",
    },
  ];

  const toggleItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-orange-500">Home</Link> {" > "}
        <Link to="/my-orders" className="hover:text-orange-500">My Orders</Link> {" > "}
        <span className="text-gray-800 font-medium">Return Order</span>
      </div>

      <div className="bg-white p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-4">Return Order</h2>

        {/* Order Info */}
        <div className="bg-gray-50 p-4 rounded mb-4 flex justify-between text-sm">
          <div>
            <p>Order ID: <b>{orderId}</b></p>
            <p>Order Date: 15 January 2024</p>
          </div>
          <p className="font-bold">₹16,998</p>
        </div>

        {/* Select Items */}
        <h3 className="font-semibold mb-2">Select items to return</h3>

        {items.map((item) => (
          <div
            key={item.id}
            className="border rounded p-3 mb-3 flex items-center gap-3"
          >
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => toggleItem(item.id)}
            />
            <img src={item.image} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-500">Color: {item.color}</p>
              <p className="text-sm">₹{item.price} · Qty: {item.qty}</p>
            </div>
          </div>
        ))}

        {/* Reason */}
        <h3 className="font-semibold mt-4 mb-2">Reason for return</h3>
        <div className="space-y-2 text-sm">
          {[
            "Product damaged/defective",
            "Wrong product delivered",
            "Product not as described",
            "Size/fit issues",
            "Quality not as expected",
            "Received expired product",
            "Other",
          ].map((r) => (
            <label key={r} className="flex items-center gap-2">
              <input
                type="radio"
                name="reason"
                value={r}
                checked={reason === r}
                onChange={(e) => setReason(e.target.value)}
              />
              {r}
            </label>
          ))}
        </div>

        {/* Refund Summary */}
        <div className="bg-green-50 border border-green-200 p-3 rounded mt-4 text-sm">
          <p><b>Refund Summary</b></p>
          <p>Items selected for return: {selectedItems.length}</p>
          <p>Refund amount: ₹16,998</p>
          <p>Processing time: 5-7 business days after pickup</p>
        </div>

        {/* Return Process */}
        <div className="bg-blue-50 border border-blue-200 p-3 rounded mt-4 text-sm">
          <p><b>Return Process</b></p>
          <ol className="list-decimal ml-4">
            <li>Submit return request</li>
            <li>Pickup scheduled within 24-48 hours</li>
            <li>Package inspected upon receipt</li>
            <li>Refund after successful inspection</li>
          </ol>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-5">
          <button
            onClick={() => alert("Return request submitted")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded w-full sm:w-auto"
          >
            Submit Return Request
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

export default ReturnOrder;
