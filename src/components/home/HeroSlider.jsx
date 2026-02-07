import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Big Sale! Up to 60% Off",
    subtitle: "On Electronics & Fashion",
    button: "Shop Now",
    link: "/products",
  },
  {
    title: "New Arrivals",
    subtitle: "Latest Collection 2024",
    button: "Explore",
    link: "/products",
  },
  {
    title: "Free Shipping",
    subtitle: "On Orders Above ₹499",
    button: "Start Shopping",
    link: "/products",
  },
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-[#FFF4E5] py-10">
      <div className="max-w-[1300px] mx-auto px-6">

        <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-xl">

          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#6b2400] via-[#d35400] to-[#f5a623]" />

          {/* Content */}
<div className="relative z-10 h-full flex items-center justify-center">
  <div className="max-w-xl text-white">

    {/* Heading CENTER */}
    <h1 className="text-3xl md:text-5xl font-bold leading-tight text-center">
      {slides[index].title}
    </h1>

    {/* Subtitle LEFT */}
    <p className="mt-3 text-base md:text-lg text-left">
      {slides[index].subtitle}
    </p>

    {/* Button LEFT */}
    <button
      onClick={() => navigate(slides[index].link)}
      className="mt-6 bg-orange-500 hover:bg-orange-600 transition px-8 py-3 rounded-lg font-semibold"
    >
      {slides[index].button}
    </button>

  </div>
</div>


          {/* Left Arrow */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow z-20"
          >
            <ChevronLeft />
          </button>

          {/* Right Arrow */}
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow z-20"
          >
            <ChevronRight />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                className={`cursor-pointer rounded-full transition-all ${
                  index === i
                    ? "w-8 h-2 bg-white"
                    : "w-2 h-2 bg-white/60"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
