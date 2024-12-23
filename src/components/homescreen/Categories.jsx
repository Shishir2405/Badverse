import React from "react";

const FashionCategories = () => {
  return (
    <section className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="text-center flex-1 min-w-[150px] flex justify-center items-center h-full">
            <h2 className="text-lg sm:text-2xl font-bold">
              <span className="text-red-500">The best look</span>{" "}
              <span className="text-white">anytime, anywhere.</span>
            </h2>
          </div>

          <div className="text-center flex-1 min-w-[150px]">
            <h3 className="text-lg sm:text-xl font-bold text-red-500 mb-4">For Her</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>Women Jeans</li>
              <li>Tops and Shirts</li>
              <li>Women Jackets</li>
              <li>Heels and Flats</li>
              <li>Women Accessories</li>
            </ul>
          </div>

          <div className="text-center flex-1 min-w-[150px]">
            <h3 className="text-lg sm:text-xl font-bold text-red-500 mb-4">For Him</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>Men Jeans</li>
              <li>Men Shirts</li>
              <li>Men Shoes</li>
              <li>Men Accessories</li>
              <li>Men Jackets</li>
            </ul>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default FashionCategories;
