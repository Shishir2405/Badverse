import React from "react";

const TrendingMaterials = () => {
  const trendingItems = [
    {
      title: "Latest T-shirts For You",
      description: "Discover the latest trends in T-shirts that suit your style.",
      buttonText: "Shop Now",
      imageUrl: "/assets/bshirt1.jpeg", 
      link: "#", 
    },
    {
      title: "Stylish Cups",
      description: "Perfect cups to enhance your coffee experience.",
      buttonText: "Shop Now",
      imageUrl: "/assets/cup1.jpeg", 
      link: "#", 
    },
    {
      title: "Trendy Stickers",
      description: "Decorate your items with these unique and stylish stickers.",
      buttonText: "Shop Now",
      imageUrl: "/assets/sticker1.jpeg", 
      link: "#", 
    },
  ];

  return (
    <section id="trending-materials" className="py-16 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">
          Trending Materials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingItems.map((item, index) => (
            <div
              key={index}
              className="relative p-6 shadow-lg bg-cover bg-center text-white flex flex-col justify-between h-[400px] sm:h-[450px] lg:h-[500px] xl:h-[550px] w-full mx-auto"
              style={{ backgroundImage: `url(${item.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-chilly-red">
                  {item.title.split(" ")[0]}{" "}
                  <span className="text-white">{item.title.split(" ").slice(1).join(" ")}</span>
                </h3>
                <p className="text-lg sm:text-xl mb-6 text-white">
                  {item.description.split(" ")[0]}{" "}
                  <span className="text-chilly-red">
                    {item.description.split(" ").slice(1).join(" ")}
                  </span>
                </p>
                <a href={item.link}>
                  <button className="bg-red-600 hover:bg-white hover:text-black text-white py-3 px-6 text-lg sm:text-xl inline-block transition duration-300 ease-in-out shadow-lg">
                    {item.buttonText}
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingMaterials;
