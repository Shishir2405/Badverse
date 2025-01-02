import React from "react";
import { motion } from "framer-motion";

export default function Timeline() {
  return (
    <div className="container mx-auto w-full max-w-4xl py-8">
      <div className="relative w-fit mx-auto mb-16">
        <span className="h-[1px] w-36 bg-white absolute -bottom-2 -right-9" />
        <span className="h-[1px] w-36 bg-white absolute -top-2 -left-9" />
        <h1 className="text-center font-bold text-5xl">
          History Of <span className="text-red-700">BADVERSE</span>
        </h1>
      </div>
      <div className="relative hidden md:block">
        {/* Existing timeline for larger screens */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute left-1/2 transform -translate-x-1/2 w-1 h-[680px] bg-neutral-700"
          style={{ originY: 0 }}
        />
        {/* Existing steps */}
        <div className="relative">
          {/* Step 1  */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 flex justify-between items-center w-full"
          >
            <div className="order-1 w-5/12"></div>
            <motion.div
              whileInView={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, times: [0, 0.5, 1] }}
              viewport={{ once: true }}
              className="z-20 flex items-center order-1 bg-gradient-to-br from-red-600 via-rose-500 to-red-600 shadow-xl w-10 h-10 rounded-full hover:scale-110 transition-all duration-300 border-4 ml-[1px] border-[#121212]"
            >
              <h1 className="mx-auto font-bold text-lg text-white">1</h1>
            </motion.div>
            <div className="order-1 w-5/12 px-5 py-3 rounded-xl bg-neutral-900/90 border border-neutral-700 shadow-xl hover:-translate-y-1 transition-all duration-300">
              <h3 className="mb-2 font-bold text-white text-sm md:text-lg">
                Mittal Groups
              </h3>
              <p className="text-sm leading-snug tracking-wide text-neutral-300 font-bold">
                1907
              </p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 flex justify-between items-center w-full flex-row-reverse"
          >
            <div className="order-1 w-5/12"></div>
            <motion.div
              whileInView={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, times: [0, 0.5, 1] }}
              viewport={{ once: true }}
              className="z-20 flex items-center order-1 bg-gradient-to-br from-red-600 via-rose-500 to-red-600 shadow-xl w-10 h-10 rounded-full hover:scale-110 transition-all duration-300 border-4 ml-[1px] border-[#121212]"
            >
              <h1 className="mx-auto font-bold text-lg text-white">2</h1>
            </motion.div>
            <div className="order-1 w-5/12 px-5 py-3 rounded-xl bg-neutral-900/90 border border-neutral-700 shadow-xl hover:-translate-y-1 transition-all duration-300">
              <h3 className="mb-2 font-bold text-white text-sm md:text-lg">
                Mittal Alliance(Parent Company)
              </h3>
              <p className="text-xs sm:text-sm leading-snug tracking-wide text-neutral-300">
                2020
              </p>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6 flex justify-between items-center w-full"
          >
            <div className="order-1 w-5/12"></div>
            <motion.div
              whileInView={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, times: [0, 0.5, 1] }}
              viewport={{ once: true }}
              className="z-20 flex items-center order-1 bg-gradient-to-br from-red-600 via-rose-500 to-red-600 shadow-xl w-10 h-10 rounded-full hover:scale-110 transition-all duration-300 border-4 ml-[1px] border-[#121212]"
            >
              <h1 className="mx-auto font-bold text-lg text-white">3</h1>
            </motion.div>
            <div className="order-1 w-5/12 px-5 py-3 rounded-xl bg-neutral-900/90 border border-neutral-700 shadow-xl hover:-translate-y-1 transition-all duration-300">
              <h3 className="mb-2 font-bold text-white text-sm md:text-lg">
                Young Leader Community
              </h3>
              <p className="text-xs sm:text-sm leading-snug tracking-wide text-neutral-300">
                2022-2024
              </p>
            </div>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-6 flex justify-between items-center w-full flex-row-reverse"
          >
            <div className="order-1 w-5/12"></div>
            <motion.div
              whileInView={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, times: [0, 0.5, 1] }}
              viewport={{ once: true }}
              className="z-20 flex items-center order-1 bg-gradient-to-br from-red-600 via-rose-500 to-red-600 shadow-xl w-10 h-10 rounded-full hover:scale-110 transition-all duration-300 border-4 ml-[1px] border-[#121212]"
            >
              <h1 className="mx-auto font-bold text-lg text-white">4</h1>
            </motion.div>
            <div className="order-1 w-5/12 px-5 py-3 rounded-xl bg-neutral-900/90 border border-neutral-700 shadow-xl hover:-translate-y-1 transition-all duration-300">
              <h3 className="mb-2 font-bold text-white text-sm md:text-lg">
                BADVERSE
              </h3>
              <p className="text-xs sm:text-sm leading-snug tracking-wide text-neutral-300">
                (Late 2024)
              </p>
            </div>
          </motion.div>

          {/* Step 5 */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-6 flex justify-between items-center w-full"
          >
            <div className="order-1 w-5/12"></div>
            <motion.div
              whileInView={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, times: [0, 0.5, 1] }}
              viewport={{ once: true }}
              className="z-20 flex items-center order-1 bg-gradient-to-br from-red-600 via-rose-500 to-red-600 shadow-xl w-10 h-10 rounded-full hover:scale-110 transition-all duration-300 border-4 ml-[1px] border-[#121212]"
            >
              <h1 className="mx-auto font-bold text-lg text-white">5</h1>
            </motion.div>
            <div className="order-1 w-5/12 px-5 py-3 rounded-xl bg-neutral-900/90 border border-neutral-700 shadow-xl hover:-translate-y-1 transition-all duration-300">
              <h3 className="mb-2 font-bold text-white text-sm md:text-lg">
                BADVERSE
              </h3>
              <p className="text-xs sm:text-sm leading-snug tracking-wide text-neutral-300">
                2025
              </p>
            </div>
          </motion.div>

          {/* Step 6 */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mb-4 flex justify-between items-center w-full flex-row-reverse"
          >
            <div className="order-1 w-5/12"></div>
            <motion.div
              whileInView={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, times: [0, 0.5, 1] }}
              viewport={{ once: true }}
              className="z-20 flex items-center order-1 bg-gradient-to-br from-red-600 via-rose-500 to-red-600 shadow-xl w-10 h-10 rounded-full hover:scale-110 transition-all duration-300 border-4 ml-[1px] border-[#121212]"
            >
              <h1 className="mx-auto font-bold text-lg text-white">6</h1>
            </motion.div>
            <div className="order-1 w-5/12 px-5 py-3 rounded-xl bg-neutral-900/90 border border-neutral-700 shadow-xl hover:-translate-y-1 transition-all duration-300">
              <h3 className="mb-2 font-bold text-white text-sm md:text-lg">
                Continued Legacy
              </h3>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
