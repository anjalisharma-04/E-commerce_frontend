import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const MyOrders = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("All");

  const orders = [
    {
      id: "ORD123456789",
      date: "15 Jan 2024",
      total: "₹16,998",
      status: "Delivered",
      items: [
        {
          title: "Premium Wireless Headphones",
          color: "Black",
          price: "₹3,999",
          qty: 1,
          image: "/src/assets/products/p1.jpg",
        },
        {
          title: "Smart Fitness Watch",
          color: "Space Gray",
          price: "₹12,999",
          qty: 1,
          image: "/src/assets/products/p2.jpg",
        },
      ],
    },
    {
      id: "ORD987654321",
      date: "10 Jan 2024",
      total: "₹2,499",
      status: "Shipped",
      items: [
        {
          title: "Bluetooth Speaker",
          color: "Blue",
          price: "₹2,499",
          qty: 1,
          image: "/src/assets/products/p3.jpg",
        },
      ],
    },
    {
      id: "ORD456789123",
      date: "5 Jan 2024",
      total: "₹8,999",
      status: "Confirmed",
      items: [
        {
          title: "Gaming Mechanical Keyboard",
          color: "RGB Black",
          price: "₹8,999",
          qty: 1,
          image: "/src/assets/products/p4.jpg",
        },
      ],
    },
  ];

  const filteredOrders =
    statusFilter === "All"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  return (
    <div className="w-full">

      {/* 🔥 FULL WIDTH UBHRA NAV / BREADCRUMB */}
      <div className="w-full bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-sm text-gray-500">
            <Link to="/" className="hover:text-orange-500">Home</Link> {" > "}
            <span className="text-gray-800 font-medium">My Orders</span>
          </div>
        </div>
      </div>

      {/* 🔥 MAIN CONTENT (CENTERED) */}
      <div className="max-w-7xl mx-auto px-4 py-6">

        <div className="bg-white rounded-xl shadow-sm p-6">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Orders</h2>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded px-3 py-1"
            >
              <option value="All">All Orders</option>
              <option value="Delivered">Delivered</option>
              <option value="Shipped">Shipped</option>
              <option value="Confirmed">Confirmed</option>
            </select>
          </div>

          <div className="space-y-6">
            {filteredOrders.length === 0 && (
              <p className="text-center text-gray-500">No orders found</p>
            )}

            {filteredOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">

                {/* Header */}
                <div className="flex flex-wrap justify-between border-b pb-3 mb-3 text-sm">
                  <div>
                    <p className="text-gray-500">Order ID</p>
                    <p className="font-semibold">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Order Date</p>
                    <p className="font-semibold">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total</p>
                    <p className="font-semibold">{order.total}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Shipped"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>

                    <button
                      onClick={() => navigate(`/order-details/${order.id}`)}
                      className="text-orange-500 text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Items */}
                {order.items.map((item, i) => (
                  <div key={i} className="flex gap-4 py-3 border-b last:border-b-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        Color: {item.color}
                      </p>
                      <p className="text-sm">
                        {item.price} · Qty: {item.qty}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {order.status === "Delivered" && (
                    <button
                      onClick={() => navigate(`/return-order/${order.id}`)}
                      className="border px-4 py-1 rounded"
                    >
                      Return Order
                    </button>
                  )}

                  {order.status === "Shipped" && (
                    <button
                      onClick={() => navigate(`/track-order/${order.id}`)}
                      className="border border-orange-500 text-orange-500 px-4 py-1 rounded"
                    >
                      Track Order
                    </button>
                  )}

                  {order.status === "Confirmed" && (
                    <button
                      onClick={() => navigate(`/cancel-order/${order.id}`)}
                      className="border border-red-500 text-red-500 px-4 py-1 rounded"
                    >
                      Cancel Order
                    </button>
                  )}

                  <button className="bg-orange-500 text-white px-4 py-1 rounded">
                    Buy Again
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyOrders;
