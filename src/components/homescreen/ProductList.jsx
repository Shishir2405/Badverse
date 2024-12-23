import React from "react";

const FeaturedProducts = () => {
  const products = [
    {
      name: "T-Shirts",
      category: "female",
      originalPrice: 150.0,
      currentPrice: 120.0,
      imageUrl: "/assets/wshirt1.jpeg",
      link: "#",
    },
    {
      name: "Books",
      category: "Unisex",
      originalPrice: 80.0,
      currentPrice: 60.0,
      imageUrl: "/assets/book1.jpeg",
      link: "#", 
    },
    {
      name: "CarryBag",
      category: "Unisex",
      originalPrice: 50.0,
      currentPrice: 40.0,
      imageUrl: "/assets/bag1.jpeg",
      link: "#", 
    },
    {
      name: "T-Shirts",
      category: "Male",
      originalPrice: 50.0,
      currentPrice: 40.0,
      imageUrl: "/assets/bshirt3.jpeg",
      link: "#", 
    },
    {
      name: "T-Shirts",
      category: "female",
      originalPrice: 150.0,
      currentPrice: 120.0,
      imageUrl: "/assets/wshirt2.jpeg",
      link: "#", 
    },
    {
      name: "T-Shirts",
      category: "Male",
      originalPrice: 80.0,
      currentPrice: 60.0,
      imageUrl: "/assets/bshirt1.jpeg",
      link: "#", 
    },
    {
      name: "T-shirts",
      category: "Male",
      originalPrice: 50.0,
      currentPrice: 40.0,
      imageUrl: "/assets/wshirt4.jpeg",
      link: "#", 
    },
    {
      name: "T-Shirts",
      category: "Male",
      originalPrice: 50.0,
      currentPrice: 40.0,
      imageUrl: "/assets/bshirt2.jpeg",
      link: "#", 
    },
    {
      name: "T-Shirts",
      category: "Male",
      originalPrice: 150.0,
      currentPrice: 120.0,
      imageUrl: "/assets/wshirt3.jpeg",
      link: "#", 
    },
    {
      name: "T-Shirts",
      category: "Male",
      originalPrice: 80.0,
      currentPrice: 60.0,
      imageUrl: "/assets/bshirt4.jpeg",
      link: "#", 
    },
    {
      name: "Cups",
      category: "Unisex",
      originalPrice: 50.0,
      currentPrice: 40.0,
      imageUrl: "/assets/cup1.jpeg",
      link: "#", 
    },
    {
      name: "Stickers",
      category: "Unisex",
      originalPrice: 50.0,
      currentPrice: 40.0,
      imageUrl: "/assets/sticker1.jpeg",
      link: "#", 
    },
  ];

  

  return (
    <section className="py-10 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="flex flex-col items-center ">
              <div
                className="w-full h-[200px] sm:h-[250px] lg:h-[300px] bg-cover bg-center "
                style={{ backgroundImage: `url(${product.imageUrl})` }}
              ></div>

              <div className="text-center mt-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">{product.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{product.category}</p>

                <div className="mb-3">
                  <p className="text-lg font-semibold text-red-500">${product.currentPrice.toFixed(2)}</p>
                  <p className="text-sm line-through text-gray-500">
                    Original: ${product.originalPrice.toFixed(2)}
                  </p>
                </div>

                

                <a href={product.link}>
                  <button className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-6 transition duration-300">
                    Shop Now
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

export default FeaturedProducts;
