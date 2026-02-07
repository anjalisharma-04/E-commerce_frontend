import { Link, useParams, useNavigate } from "react-router-dom";

const TrackOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const order = {
    trackingId: "TRK456789012",
    expectedDelivery: "16 January",
    items: [
      {
        title: "Bluetooth Speaker",
        price: "₹2,499",
        qty: 1,
        image: "/src/assets/products/p3.jpg",
      },
    ],
    address:
      "123, Green Valley Apartment, Near City Mall, Gurugram - 122001",
  };

  const steps = [
    { title: "Order Confirmed", time: "10 January at 05:30 am", active: true },
    { title: "Shipped", time: "10 January at 05:30 am", active: true },
    { title: "Out for Delivery", time: "", active: false },
    { title: "Delivered", time: "", active: false },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-orange-500">Home</Link> {" > "}
        <Link to="/my-orders" className="hover:text-orange-500">My Orders</Link> {" > "}
        <span className="text-gray-800 font-medium">Track Order</span>
      </div>

      {/* Header */}
      <div className="bg-white p-5 rounded shadow mb-4 flex flex-col sm:flex-row justify-between gap-3">
        <div>
          <h2 className="font-bold text-lg mb-1">Track Your Order</h2>
          <p className="text-sm">Order ID: <b>{orderId}</b></p>
          <p className="text-sm">Tracking ID: {order.trackingId}</p>
        </div>
        <div className="text-sm">
          <p>Expected Delivery</p>
          <p className="font-semibold">{order.expectedDelivery}</p>
          <button
            onClick={() => navigate("/order-details")}
            className="text-orange-500 mt-1 text-sm"
          >
            View Order Details
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="bg-white p-5 rounded shadow mb-4">
        <h3 className="font-semibold mb-4">Order Status</h3>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    step.active ? "bg-green-500 text-white" : "bg-gray-300"
                  }`}
                >
                  {step.active ? "✓" : ""}
                </div>
                {i !== steps.length - 1 && (
                  <div className="h-10 w-1 bg-gray-300 mx-auto"></div>
                )}
              </div>
              <div>
                <p className="font-semibold">{step.title}</p>
                {step.time && (
                  <p className="text-sm text-gray-500">{step.time}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="bg-white p-5 rounded shadow mb-4">
        <h3 className="font-semibold mb-3">Items in this Order</h3>

        {order.items.map((item, i) => (
          <div
            key={i}
            className="flex gap-4 items-center border-b py-3 last:border-0"
          >
            <img
              src={item.image}
              className="w-16 h-16 rounded object-cover"
            />
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm">
                {item.price} · Qty: {item.qty}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Address */}
      <div className="bg-white p-5 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">Delivery Address</h3>
        <p className="text-sm text-gray-600">{order.address}</p>
      </div>

      {/* Support */}
      <div className="text-center mt-6 text-sm">
        <p>Need help with your order?</p>
        <Link to="/support" className="text-orange-500 font-medium">
          Contact Support
        </Link>
      </div>

    </div>
  );
};

export default TrackOrder;
