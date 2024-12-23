import React from "react";
import { FaTruck, FaShieldAlt, FaPercentage, FaLock } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaTruck className="text-4xl text-white" />,
      title: "Worldwide Shipping",
      description: "It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-white" />,
      title: "Best Quality",
      description: "It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    },
    {
      icon: <FaPercentage className="text-4xl text-white" />,
      title: "Best Offers",
      description: "It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    },
    {
      icon: <FaLock className="text-4xl text-white" />,
      title: "Secure Payments",
      description: "It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    },
  ];

  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-gray-900 p-8  shadow-lg transition duration-300 ease-in-out hover:scale-105"
            >
              
              <div className="mb-6">{feature.icon}</div>

              
              <h3 className="text-xl font-semibold text-red-500 mb-3">{feature.title}</h3>

              
              <p className="text-base text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
