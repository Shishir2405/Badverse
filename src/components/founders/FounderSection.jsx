// src/components/founders/FounderSection.jsx
import React from "react";
import { motion } from "framer-motion";

const FounderSection = () => {
  const founders = [
    {
      id: 1,
      name: "Sarthak Mittal",
      title: "CEO",
      image: "/sarthak2.jpeg",
      description:
        "Lorem ipsum dolor sit amet consectetur. Ut sed commodo tempor amet sit. Ut consectetur neque a nulla mattis at.",
    },
    {
      id: 2,
      name: "Banjamin Miller",
      title: "CEO",
      image: "/ban2.jpeg",
      description:
        "Lorem ipsum dolor sit amet consectetur. Ut sed commodo tempor amet sit. Ut consectetur neque a nulla mattis at.",
    },
    {
      id: 3,
      name: "Vinay Nangia",
      title: "Executive Advisor",
      image: "/u2.jpeg",
      description:
        "Lorem ipsum dolor sit amet consectetur. Ut sed commodo tempor amet sit. Ut consectetur neque a nulla mattis at.",
    },
  ];

  return (
    <section className="bg-black py-20 pt-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-white text-4xl font-bold mb-4">
            Meet Our Founders
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto px-4">
            The visionaries behind BAD TALKS, bringing innovation and excellence
            to every event.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center gap-8 max-w-7xl mx-auto px-4">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="bg-zinc-900 rounded-3xl p-8 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-red-500/20 hover:-translate-y-2">
                <div className="relative mb-6 overflow-hidden rounded-2xl aspect-[4/5]">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      aspectRatio: "4/5",
                      objectFit: "cover",
                      objectPosition: "center"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="p-4"
                >
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {founder.name}
                  </h3>
                  <p className="text-red-500 font-medium mb-4">
                    {founder.title}
                  </p>
                  <p className="text-gray-400">
                    {founder.description}
                  </p>
                </motion.div>

                <div className="mt-6 flex justify-center space-x-4">
                  <a
                    href="#"
                    className="text-white hover:text-red-500 transition-colors"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-white hover:text-red-500 transition-colors"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FounderSection;