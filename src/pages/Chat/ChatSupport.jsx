import { useState, useRef, useEffect } from "react";
import {
  Phone,
  MoreVertical,
  Send,
  Smile,
  Paperclip,
} from "lucide-react";

const ChatSupport = () => {
  const [messages, setMessages] = useState([
    {
      sender: "support",
      text: "Hello! Welcome to our support chat. How can I assist you today?",
      time: "2:30 PM",
    },
  ]);

  const [input, setInput] = useState("");
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  const quickOptions = [
    "Track my order",
    "Return/Exchange",
    "Payment issue",
    "Delivery problem",
    "Product question",
    "Account help",
  ];

  const botReplies = {
    "Track my order": "Please go to My Orders section and click on Track Order to see real-time updates.",
    "Return/Exchange": "You can initiate return or exchange within 7 days from delivery from My Orders.",
    "Payment issue": "Please share your order ID so I can check the payment status for you.",
    "Delivery problem": "Sorry for the inconvenience. Please provide your order ID to investigate.",
    "Product question": "Sure! Please tell me which product you need help with.",
    "Account help": "Please describe your account issue and I will assist you.",
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (msg) => {
    if (!msg.trim()) return;

    const userMsg = {
      sender: "user",
      text: msg,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const replyText =
        botReplies[msg] ||
        "Thank you for your message. Our support agent will assist you shortly.";

      const botMsg = {
        sender: "support",
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    sendMessage(`📎 File uploaded: ${file.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-6xl bg-white shadow rounded-lg flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
              CS
            </div>
            <div>
              <h3 className="font-semibold">Customer Support</h3>
              <p className="text-sm text-green-600">
                Online • Avg response time: 2 min
              </p>
            </div>
          </div>

          <div className="flex gap-3 text-gray-600">
            <Phone className="cursor-pointer" />
            <MoreVertical className="cursor-pointer" />
          </div>
        </div>

        {/* Info Bar */}
        <div className="bg-blue-50 text-blue-700 px-4 py-2 text-sm">
          Hi! We're here to help. For faster support, please provide your order ID if you have one.
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-md p-3 rounded-lg text-sm ${
                  msg.sender === "user"
                    ? "bg-orange-500 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-xs mt-1 opacity-70">{msg.time}</p>
              </div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        {/* Quick Options */}
        <div className="px-4 py-2 border-t">
          <p className="text-sm text-gray-500 mb-2">Quick options:</p>
          <div className="flex flex-wrap gap-2">
            {quickOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(opt)}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-orange-100 hover:text-orange-600"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="border-t px-4 py-3 flex items-center gap-2">
          <Paperclip
            className="text-gray-400 cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          />
          <Smile
            className="text-gray-400 cursor-pointer"
            onClick={() => sendMessage("😊")}
          />

          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleFileUpload}
          />

          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          />

          <button
            onClick={() => sendMessage(input)}
            className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600"
          >
            <Send size={18} />
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 py-2 border-t">
          Available 24/7 • Response time: 2-5 minutes • More support options
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;
