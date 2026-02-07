import { useState } from "react";
import { ArrowLeft, Phone, MoreVertical, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatSupport = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      from: "support",
      text: "Hello! Welcome to our support chat. How can I assist you today?",
      time: "2:30 PM",
    },
    {
      from: "user",
      text: "Hi, I need help with my recent order. The tracking shows it was delivered but I haven't received it.",
      time: "2:32 PM",
    },
    {
      from: "support",
      text: "I understand your concern. Could you please provide your order ID?",
      time: "2:33 PM",
    },
    {
      from: "user",
      text: "My order ID is ORD123456789",
      time: "2:34 PM",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        from: "user",
        text: input,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setInput("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft />
          </button>

          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
            CS
          </div>

          <div>
            <p className="font-semibold">Customer Support</p>
            <p className="text-xs text-green-500">Online • Avg response time: 2 min</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Phone className="cursor-pointer" />
          <MoreVertical className="cursor-pointer" />
        </div>
      </div>

      {/* INFO BAR */}
      <div className="bg-blue-50 text-blue-600 px-4 py-2 text-sm">
        Hi! We're here to help. For faster support, please provide your order ID if you have one.
      </div>

      {/* CHAT BODY */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.from === "support" && (
              <div className="w-8 h-8 mr-2 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                CS
              </div>
            )}

            <div
              className={`max-w-[75%] px-4 py-3 rounded-lg text-sm ${
                msg.from === "user"
                  ? "bg-orange-500 text-white rounded-br-none"
                  : "bg-white border rounded-bl-none"
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-xs mt-1 opacity-70">{msg.time}</p>
            </div>

            {msg.from === "user" && (
              <div className="w-8 h-8 ml-2 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">
                U
              </div>
            )}
          </div>
        ))}
      </div>

      {/* QUICK OPTIONS */}
      <div className="px-4 py-2 border-t bg-white">
        <p className="text-xs text-gray-500 mb-2">Quick options:</p>
        <div className="flex flex-wrap gap-2">
          {[
            "Track my order",
            "Return / Exchange",
            "Payment issue",
            "Delivery problem",
            "Product question",
            "Account help",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => setInput(opt)}
              className="px-3 py-1 border rounded-full text-sm hover:bg-gray-100"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* INPUT BOX */}
      <div className="px-4 py-3 border-t bg-white flex items-center gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-orange-500 p-3 rounded-full text-white hover:bg-orange-600"
        >
          <Send size={18} />
        </button>
      </div>

      {/* FOOTER */}
      <div className="text-center text-xs text-gray-500 py-1 bg-white">
        Available 24/7 • Response time: 2-5 minutes • More support options
      </div>
    </div>
  );
};

export default ChatSupport;
