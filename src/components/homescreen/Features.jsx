import React from "react";
import { FaTruck, FaShieldAlt, FaPercentage, FaLock } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaTruck className="text-4xl text-white" />,
      title: "Fast & Reliable Shipping",
      description: "Get your orders delivered quickly and securely, no matter where you are in the world.",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-white" />,
      title: "Top-Notch Quality",
      description: "We ensure every product meets the highest standards for durability and performance.",
    },
    {
      icon: <FaPercentage className="text-4xl text-white" />,
      title: "Exclusive Discounts",
      description: "Enjoy unbeatable deals and offers tailored just for you, all year round.",
    },
    {
      icon: <FaLock className="text-4xl text-white" />,
      title: "Safe & Secure Payments",
      description: "Your transactions are protected with the latest security technologies.",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-gray-900 p-8 shadow-lg transition duration-300 ease-in-out hover:scale-105"
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
