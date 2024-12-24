import React from "react";
import HeroPage from "../homescreen/HeroPage";
import Footer from "../core/Footer";
import Timeline from "../homescreen/Timeline";
import VideoSection from "../homescreen/VideoSection";
import More from "../homescreen/More";
import MapScreen from "../core/Map";
import ContactSection from "../homescreen/ContactSection";
import PastEvents from "../homescreen/PastEvents";
import Gallery from "../homescreen/Gallery";
import TrendingMaterials from "../homescreen/Trending";
import Hero from "../homescreen/Hero";
import FeaturedProducts from "../homescreen/ProductList";
import FashionCategories from "../homescreen/Categories";
import Features from "../homescreen/Features";

export default function HomescreenLayout() {
  return (
    <main className="p-2 h-full flex flex-col flex-1 gap-8">
      <HeroPage />
      <VideoSection />
      <PastEvents />
      <Timeline /> 
      <Gallery />
      <More />
      <FeaturedProducts/>
      <FashionCategories/>
      <Features/>
      <ContactSection />
      <MapScreen />
      <Footer />
    </main>
  );
}
