"use client";
import React, { useState, useEffect } from "react";
import {  ArrowLeft, Group, Home, Info, Moon, MoreVertical, MoveRightIcon, Phone, Sun, Users, Users2 } from "lucide-react";
import { motion, AnimatePresence, useScroll, } from "framer-motion";
import {logo} from "../../assets"
const NavItems = [
  { id: 1, title: "Home", href: '/home', icon: <Home className="h-4 w-4 " /> },
  { id: 2, title: "About", href: '/about', icon: <Info className="h-4 w-4 " /> },
  { id: 3, title: "Teams", href: '/teams', icon: <Users2 className="h-4 w-4 " /> },
  { id: 4, title: "Contact", href: "/contact", icon: <Phone className="h-4 w-4 " /> },
  { id: 5, title: "More", href: '/more', icon: <MoreVertical className="h-4 w-4 " /> },
];

const Navbar = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const scrollThreshold = 200;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = scrollY.get();

      if (currentScrollY > scrollThreshold) {
        if (currentScrollY < prevScrollY) {
          setVisible(true); // Scrolling up
        } else {
          setVisible(false); // Scrolling down
        }
      } else {
        setVisible(true); // Show navbar if scrolled less than 200px
      }

      setPrevScrollY(currentScrollY)
    };

    const unsubscribe = scrollY.onChange(handleScroll);

    return () => {
      unsubscribe();
    };
  }, [scrollY, prevScrollY]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ scale: 0, opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -150,
          opacity: visible ? 1 : 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
          },
        }}
        transition={{ duration: 0.8 }}
        className={
          "flex items-center justify-between w-[97%] mx-auto z-[9999999999999]  rounded-xl py-2 pl-2 pr-12  h-fit fixed top-4 right-0 left-0  space-x-4"
        }
      >
        <div className="flex items-center justify-center bg-slate-50 rounded-full">
          <img src={logo} alt="logo" className="w-16 h-16 rounded-full" />
        </div>
        <div className={
          "flex max-w-fit  border border-transparent dark:border-white/[0.2] rounded-xl dark:bg-transparent backdrop-blur-[2px] py-4 px-8 pr-7 bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4"
        }>

          {NavItems.map((item) => (
            <a key={item.id} href={item.href} className="text-black flex gap-2 items-center justify-center dark:text-white hover:-translate-y-0.5 hover:text-red-500 transition-transform duration-300 ease-in-out">
              {item.icon}
              <p className="text-sm">{item.title}</p>
            </a>
          ))}
          <ArrowLeft
            color="red"
            className="absolute -right-12 h-10 w-10 hover:translate-x-1 rounded-2xl p-2 scale-0 dark:scale-100 transition-transform duration-500 ease-in-out cursor-pointer"
          />


        </div>



      </motion.div>
    </AnimatePresence>
  );
}

export default Navbar;
