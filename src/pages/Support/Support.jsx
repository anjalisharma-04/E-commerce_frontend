import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  RefreshCcw,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  Ticket
} from "lucide-react";

const faqs = [
  { q: "How do I track my order?", a: "Go to My Orders and click Track Order." },
  { q: "What is the return policy?", a: "You can return products within 7 days." },
  { q: "How long does delivery take?", a: "Delivery takes 3-5 business days." },
  { q: "What payment methods are accepted?", a: "UPI, Cards, Net Banking." },
  { q: "How do I cancel my order?", a: "Go to My Orders → Cancel Order." },
  { q: "Is my payment information secure?", a: "Yes, encrypted payment gateway is used." }
];

const Support = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [tab, setTab] = useState("faq");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-3 text-sm text-gray-500">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">{">"}</span>
          <span className="font-medium text-gray-800">Help & Support</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        <h2 className="text-2xl font-bold mb-6">Help & Support</h2>

        {/* TOP CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div
            onClick={() => navigate("/my-orders")}
            className="cursor-pointer bg-white border rounded-xl p-6 text-center shadow hover:shadow-md transition"
          >
            <Package className="mx-auto text-orange-500 mb-3" />
            <h3 className="font-semibold">Track Orders</h3>
            <p className="text-sm text-gray-500">Check your order status</p>
          </div>

          <div
            onClick={() => navigate("/return-order/123")}
            className="cursor-pointer bg-white border rounded-xl p-6 text-center shadow hover:shadow-md transition"
          >
            <RefreshCcw className="mx-auto text-blue-500 mb-3" />
            <h3 className="font-semibold">Returns & Refunds</h3>
            <p className="text-sm text-gray-500">Initiate return & refund</p>
          </div>

          <div
            onClick={() => navigate("/chat/admin")}
            className="cursor-pointer bg-white border rounded-xl p-6 text-center shadow hover:shadow-md transition"
          >
            <MessageCircle className="mx-auto text-green-500 mb-3" />
            <h3 className="font-semibold">Live Chat</h3>
            <p className="text-sm text-gray-500">Chat with support team</p>
          </div>
        </div>

        {/* TABS */}
        <div className="bg-white border rounded-xl shadow mb-10">
          <div className="flex border-b">
            <button
              onClick={() => setTab("faq")}
              className={`px-6 py-3 font-medium ${tab === "faq" ? "text-orange-500 border-b-2 border-orange-500" : ""}`}
            >
              FAQs
            </button>
            <button
              onClick={() => setTab("ticket")}
              className={`px-6 py-3 font-medium ${tab === "ticket" ? "text-orange-500 border-b-2 border-orange-500" : ""}`}
            >
              Submit Ticket
            </button>
          </div>

          {/* FAQ TAB */}
          {tab === "faq" && (
            <div className="p-6">
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full border rounded px-4 py-2 mb-4"
              />

              <div className="space-y-3">
                {faqs.map((item, i) => (
                  <div key={i} className="border rounded-lg">
                    <button
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="w-full flex justify-between items-center px-4 py-3 font-medium"
                    >
                      {item.q}
                      <ChevronDown className={`transition ${openIndex === i ? "rotate-180" : ""}`} />
                    </button>

                    {openIndex === i && (
                      <div className="px-4 pb-3 text-sm text-gray-600">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBMIT TICKET TAB */}
          {tab === "ticket" && (
            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Brief description of your issue"
                className="w-full border rounded px-4 py-2"
              />

              <select className="w-full border rounded px-4 py-2">
                <option>Select Category</option>
                <option>Order Issue</option>
                <option>Payment Issue</option>
                <option>Delivery Problem</option>
                <option>Account Issue</option>
                <option>Other</option>
              </select>

              <textarea
                rows="4"
                placeholder="Describe your issue in detail..."
                className="w-full border rounded px-4 py-2"
              />

              <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
                Submit Ticket
              </button>
            </div>
          )}
        </div>

        {/* BOTTOM SUPPORT CARDS */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="cursor-pointer bg-white border rounded-xl p-6 text-center shadow">
            <Phone className="mx-auto text-orange-500 mb-2" />
            <h3 className="font-semibold">Phone Support</h3>
            <p className="text-sm text-gray-500">Mon-Sat, 9AM - 6PM</p>
            <p className="text-orange-500 mt-2">1800-123-4567</p>
          </div>

          <div className="cursor-pointer bg-white border rounded-xl p-6 text-center shadow">
            <Mail className="mx-auto text-blue-500 mb-2" />
            <h3 className="font-semibold">Email Support</h3>
            <p className="text-sm text-gray-500">Response within 24 hours</p>
            <p className="text-blue-500 mt-2">support@example.com</p>
          </div>

          <div
            onClick={() => navigate("/chat/admin")}
            className="cursor-pointer bg-white border rounded-xl p-6 text-center shadow"
          >
            <MessageCircle className="mx-auto text-green-500 mb-2" />
            <h3 className="font-semibold">Live Chat</h3>
            <p className="text-sm text-gray-500">Available 24/7</p>
            <p className="text-green-600 mt-2">Start Chat</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Support;
