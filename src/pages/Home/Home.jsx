import HeroSlider from "../../components/home/HeroSlider";
import CategoryGrid from "../../components/home/CategoryGrid";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import ServiceHighlights from "../../components/home/ServiceHighlights";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-[#FFF7ED] overflow-x-hidden">
      
      <HeroSlider />

      <CategoryGrid />

      <FeaturedProducts />

      <ServiceHighlights />

    </div>
  );
};

export default Home;
