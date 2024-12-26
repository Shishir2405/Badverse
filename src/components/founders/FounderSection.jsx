import React from "react";
import { motion } from "framer-motion";

const FounderSection = () => {
  const founders = [
    {
      id: 1,
      name: "Sarthak Mittal",
      title: "CEO",
      image: "/sarthak2.jpeg",
      desc: "As Chairman and CEO of Mittal Alliance India, I empower youth through innovation, education-industry bridges, and impactful initiatives, aiming to reach 100M students with mentorship, skills, and career opportunities.",
      linkedin: "https://www.linkedin.com/in/sarthak-cxo/",
    },
    {
      id: 2,
      name: "Banjamin Miller",
      title: "CEO",
      image: "/ban2.jpeg",
      desc: "Benjamin Miller, CEO of BADVERSE, specializes in Marcom and Business Development. A social entrepreneur and Colorado State University graduate, he drives ethical, scalable, and technical solutions, inspiring impactful growth through BAD TALKS.",
      linkedin: "https://www.linkedin.com/in/benjaminemiller/",
    },
    {
      id: 3,
      name: "Vinay Nangia",
      title: "Executive Advisor",
      image: "/u2.jpeg",
      desc: "Vinay Nangia, Executive Advisor at BADVERSE, brings strategic expertise to guide impactful decisions. With a wealth of experience, he empowers innovation, fosters growth, and inspires success across diverse ventures.",
      linkedin: "https://www.linkedin.com/in/prof-vinay-nangia-760a6360/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      id: 4,
      name: "Saiyam Kumar",
      title: "COO & Co-founder",
      image: "/saiyam2.png",
      desc: "Saiyam Kumar, COO & Co-founder of BADVERSE, is a visionary entrepreneur building 5x startups, including DevItUp and Dharika. Passionate about innovation, tech, and helping students elevate themselves.",
      linkedin: "https://www.linkedin.com/in/saiyam0211/",
    },
    {
      id: 5,
      name: "Smit Rami",
      title: "CTO",
      image: "/smit2.png",
      desc: "Smit Rami, CTO at BADVERSE, is a Cybersecurity Analyst and Trainer dedicated to providing accessible, cost-effective protection and empowering clients against cyber threats through expert, innovative solutions.",
      linkedin: "https://www.linkedin.com/in/smit-rami/",
    },
    {
      id: 6,
      name: "Shivanshi Gupta",
      title: "Project Lead",
      image: "/shivanshi2.png",
      desc: "Lead Developer of Bad Talks and cofounder of Mittal Branding, known for delivering innovative strategies and impactful solutions for diverse projects with creative vision and technical precision as a web developer.",
      linkedin:
        "https://www.linkedin.com/in/shivanshi-gupta-frontend-developer/",
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
                      objectPosition: "center",
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
                  <h3 className="text-white text-2xl font-bold mb-2 text-center">
                    {founder.name}
                  </h3>
                  <p className="text-red-500 font-medium mb-2 text-center">
                    {founder.title}
                  </p>
                  {founder.desc && (
                    <p className="text-gray-400 text-center mt-4">
                      {founder.desc}
                    </p>
                  )}
                </motion.div>

                <div className="mt-6 flex justify-center">
                  {founder.linkedin && (
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
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
                  )}
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
