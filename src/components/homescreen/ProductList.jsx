import React from "react";

const FeaturedProducts = () => {
  const products = [
    {
      name: "T-Shirts",
      category: "female",
      originalPrice: 799,
      currentPrice: 499,
      imageUrl: "/Merch/wshirt1.jpeg",
      link: "#",
    },
    {
      name: "Books",
      category: "Unisex",
      originalPrice: 299,
      currentPrice: 199,
      imageUrl: "/Merch/book1.jpeg",
      link: "#",
    },
    {
      name: "CarryBag",
      category: "Unisex",
      originalPrice: 299,
      currentPrice: 199,
      imageUrl: "/Merch/bag1.jpeg",
      link: "#",
    },
    {
      name: "T-Shirts",
      category: "Male",
      originalPrice: 799,
      currentPrice: 499,
      imageUrl: "/Merch/bshirt1.jpeg",
      link: "https://www.flipkart.com/product/p/itme?pid=TSHH7YFVVMWVKTMH",
    },
    {
      name: "T-shirts",
      category: "Male",
      originalPrice: 799,
      currentPrice: 499,
      imageUrl: "/Merch/wshirt4.jpeg",
      link: "#",
    },
    {
      name: "T-Shirts",
      category: "Male",
      originalPrice: 799,
      currentPrice: 499,
      imageUrl: "/Merch/bshirt2.jpeg",
      link: "https://www.flipkart.com/product/p/itme?pid=TSHH7YFD4P3CDCFD",
    },
    {
      name: "T-Shirts",
      category: "Male",
      originalPrice: 799,
      currentPrice: 499,
      imageUrl: "/Merch/bshirt4.jpeg",
      link: "https://www.flipkart.com/product/p/itme?pid=TSHH7XEBHVFM7VS9",
    },
    {
      name: "Cups",
      category: "Unisex",
      originalPrice: 249,
      currentPrice: 149,
      imageUrl: "/Merch/cup1.jpeg",
      link: "#",
    },
    {
      name: "Stickers",
      category: "Unisex",
      originalPrice: 59,
      currentPrice: 49,
      imageUrl: "/Merch/sticker1.jpeg",
      link: "#",
    },
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="flex flex-col items-center ">
              <div
                className="w-full h-[200px] sm:h-[250px] lg:h-[300px] bg-cover bg-center "
                style={{ backgroundImage: `url(${product.imageUrl})` }}
              ></div>

              <div className="text-center mt-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-400 mb-3">{product.category}</p>

                <div className="mb-3">
                  <p className="text-lg font-semibold text-red-500">
                    ₹{product.currentPrice.toFixed(2)}
                  </p>
                  <p className="text-sm line-through text-gray-500">
                    Original: ₹{product.originalPrice.toFixed(2)}
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
