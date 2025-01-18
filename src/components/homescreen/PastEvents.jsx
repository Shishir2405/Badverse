import { motion } from "framer-motion";
import React from "react";
import eventvideo from "/videopast.mp4";
import medicapsImage from "/logo.png";
import rgpvImage from "/logo.png";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function PastEvents() {
  return (
    <main className="h-full w-full max-w-7xl mx-auto py-8">
      {/* Header Section */}
      <div className="relative w-fit mx-auto mb-16">
        <span className="h-[1px] w-36 bg-white absolute -bottom-2 -right-9" />
        <span className="h-[1px] w-36 bg-white absolute -top-2 -left-9" />
        <h1 className="text-center font-bold text-5xl">
          Past <span className="text-red-700">Events</span>
        </h1>
      </div>

      {/* Main Content Section */}
      <section className="h-full w-full gap-12 flex flex-col min-[800px]:flex-row mx-auto py-12 px-4">
        {/* Video Section */}
        <div className="w-full hidden min-[1180px]:flex min-[1230px]:pr-16 relative">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="border rounded-2xl h-full w-full overflow-hidden"
          >
            <video
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={eventvideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>

        {/* Description Section */}
        <div className="flex flex-1 flex-col items-start gap-8">
          <div className="flex flex-col w-full min-[800px]:max-w-96 pt-3 pb-6">
            <h2 className="text-3xl font-semibold">
              Pas<span className="text-red-600">t Ev</span>ents
            </h2>
            <p>
              From inspiring keynote speakers to interactive workshops, our past
              college events brought together bright minds, bold ideas, and
              boundless energy—sparking innovation, collaboration, and
              unforgettable experiences for students and leaders alike!
            </p>
          </div>

          {/* IPS Academy Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{
              duration: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="aspect-[16/11] w-full lg:w-96 bg-slate-700 rounded-2xl p-4 relative flex flex-col justify-between hover:bg-slate-600 transition-colors duration-300"
          >
            <motion.div
              className="absolute top-1 left-4"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={medicapsImage}
                alt="IPS Academy"
                className="w-20 h-20 rounded-full object-cover border-2 border-red-500"
              />
            </motion.div>
            <div className="h-fit mt-auto">
              <h4 className="font-semibold text-xl">IPS ACADEMY</h4>
              <p className="text-neutral-200 text-sm">
                At IPS Academy, B.A.D. Talks brought the buzz! From CEO stories
                to hands-on workshops, students connected, learned, and left
                fired up to chase their entrepreneurial dreams with fresh ideas!
              </p>
            </div>
          </motion.div>

          {/* Enhanced View All Events Button */}
          <Link to="/events" className="relative group">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                duration: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="relative bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white px-8 py-4 rounded-full flex items-center gap-3 font-medium overflow-hidden group-hover:shadow-lg group-hover:shadow-red-500/50"
            >
              <span className="relative z-10 font-bold tracking-wider">View All Events</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
              
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                animate={{ 
                  x: ["0%", "100%", "0%"],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
              />

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-red-500 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              
              {/* Particle effects */}
              <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"
                animate={{
                  y: [0, -20],
                  x: [0, 10],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
              <motion.div
                className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-400 rounded-full"
                animate={{
                  y: [0, 20],
                  x: [0, -10],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 0.7
                }}
              />
            </motion.button>
          </Link>
        </div>

        {/* Right Side Cards */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="flex flex-1 flex-col gap-12"
        >
          {/* Medicaps University Card */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{
              duration: 0.4,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="aspect-[16/11] w-full lg:w-96 bg-slate-700 rounded-2xl p-4 relative flex flex-col justify-between hover:bg-slate-600 transition-colors duration-300"
          >
            <motion.div
              className="absolute top-1 left-4"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={medicapsImage}
                alt="Medicaps University"
                className="w-20 h-20 rounded-full object-cover border-2 border-red-500"
              />
            </motion.div>
            <div className="h-fit mt-auto">
              <h4 className="font-semibold text-xl">MEDICAPS UNIVERSITY</h4>
              <p className="text-neutral-200 text-sm">
                At MediCaps University, B.A.D. Talks turned ideas into action!
                From CEO secrets to success to lively sessions sparking
                innovation, it was a day where dreams met determination and
                magic happened.
              </p>
            </div>
          </motion.div>

          {/* RGPV Bhopal Card */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{
              duration: 0.4,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="aspect-[16/11] w-full lg:w-96 bg-slate-700 rounded-xl p-4 relative flex flex-col justify-between hover:bg-slate-600 transition-colors duration-300"
          >
            <motion.div
              className="absolute top-2 left-4 mb-6"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={rgpvImage}
                alt="RGPV Bhopal"
                className="w-20 h-20 mb-6 rounded-full object-cover border-2 border-red-500"
              />
            </motion.div>
            <div className="h-fit mt-auto">
              <h4 className="font-semibold text-xl">RGPV BHOPAL</h4>
              <p className="text-neutral-200 text-sm">
                At RGPV Bhopal, B.A.D. Talks created an electrifying atmosphere!
                From hands-on workshops to inspirational talks, students
                connected,
                determination to make a difference in their entrepreneurial
                journeys.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}