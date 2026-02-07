import { Truck, RefreshCcw, ShieldCheck, Headphones } from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Free Shipping",
    desc: "On orders above ₹499",
    icon: Truck,
    link: "/shipping-policy",
  },
  {
    title: "Easy Returns",
    desc: "7 days return policy",
    icon: RefreshCcw,
    link: "/return-policy",
  },
  {
    title: "Secure Payment",
    desc: "100% secure checkout",
    icon: ShieldCheck,
    link: "/payment-security",
  },
  {
    title: "24/7 Support",
    desc: "Always here to help",
    icon: Headphones,
    link: "/support",
  },
];

const ServiceHighlights = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                onClick={() => navigate(item.link)}
                className="flex items-center gap-4 bg-[#FFF7EC] rounded-xl p-6 cursor-pointer hover:shadow-md transition"
              >
                {/* Icon */}
                <div className="bg-orange-500 text-white p-3 rounded-lg">
                  <Icon size={24} />
                </div>

                {/* Text */}
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
