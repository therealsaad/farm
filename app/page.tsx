import Navbar from "@/components/navbar";
import HeroSection from "@/components/home/hero-section";
import FeaturedFarmhouses from "@/components/home/featured-farmhouses";
import CategoriesSection from "@/components/home/categories-section";
import HowItWorks from "@/components/home/how-it-works";
import PopularCities from "@/components/home/popular-cities";
import TestimonialsSection from "@/components/home/testimonials-section";
import CTASection from "@/components/home/cta-section";
import Footer from "@/components/footer";
import AIChatbot from "@/components/ai-chatbot";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturedFarmhouses />
      <CategoriesSection />
      <PopularCities />
      <HowItWorks />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <AIChatbot />
    </main>
  );
}
