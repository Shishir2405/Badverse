import React from "react";

const Hero = () => {
  const smoothScroll = (target) => {
    const startPosition = window.scrollY; 
    const targetPosition = target.getBoundingClientRect().top; 
    const startTime = performance.now(); 
    const duration = 700;
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const run = easeInOutQuad(
        elapsedTime,
        startPosition,
        targetPosition,
        duration
      );
      window.scrollTo(0, run); 
      if (elapsedTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        window.scrollTo(0, startPosition + targetPosition); 
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const handleExploreClick = () => {
    const trendingSection = document.getElementById("trending-materials");
    if (trendingSection) {
      smoothScroll(trendingSection);
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-black via-gray-900 to-black text-white h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
        <h1 className="text-6xl font-extrabold mb-6">
          <span className="text-red-600">Style</span> Meets{" "}
          <span className="text-white">Elegance</span>
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Discover the perfect collection of apparel, accessories, and more to
          match your unique taste.
        </p>
        <button
          className="bg-red-600 hover:bg-white hover:text-black text-white py-3 px-10 text-lg transition duration-300 ease-in-out shadow-lg"
          onClick={handleExploreClick}
        >
          Explore Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
