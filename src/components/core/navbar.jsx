"use client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Home,
  Info,
  Phone,
  Users2,
  MoreVertical,
  X,
  Briefcase,
  Globe,
  Rocket,
  Calendar,
  Newspaper,
  ShieldCheck,
  Hammer,
  Trophy,
} from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { logo } from "../../assets";

const NavItems = [
  {
    id: 1,
    title: "Home",
    href: "/",
    icon: React.createElement(Home, { className: "h-4 w-4" }),
  },
  {
    id: 2,
    title: "About",
    href: "#about",
    icon: React.createElement(Info, { className: "h-4 w-4" }),
  },
  {
    id: 3,
    title: "Teams",
    href: "/teams",
    icon: React.createElement(Users2, { className: "h-4 w-4" }),
  },
  {
    id: 4,
    title: "Contact",
    href: "/contact",
    icon: React.createElement(Phone, { className: "h-4 w-4" }),
  },
  {
    id: 5,
    title: "More",
    href: "#",
    icon: React.createElement(MoreVertical, { className: "h-4 w-4" }),
  },
];

const MoreLinks = [
  {
    id: 1,
    title: "Jobs",
    href: "/jobs",
    icon: React.createElement(Briefcase, { className: "h-4 w-4" }),
  },
  {
    id: 2,
    title: "Community",
    href: "/community",
    icon: React.createElement(Globe, { className: "h-4 w-4" }),
  },
  {
    id: 3,
    title: "Workshops",
    href: "/workshops",
    icon: React.createElement(Rocket, { className: "h-4 w-4" }),
  },
  {
    id: 4,
    title: "News",
    href: "/news",
    icon: React.createElement(Newspaper, { className: "h-4 w-4" }),
  },
  {
    id: 5,
    title: "Events",
    href: "/events",
    icon: React.createElement(Calendar, { className: "h-4 w-4" }),
  },
];


const AdminLinks = [
  {
    id: 1,
    title: "Event Management",
    href: "/admin/events",
    icon: React.createElement(Calendar, { className: "h-4 w-4" }),
  },
  {
    id: 2,
    title: "News Management",
    href: "/admin/news",
    icon: React.createElement(Newspaper, { className: "h-4 w-4" }),
  },
  {
    id: 3,
    title: "Workshop Management",
    href: "/admin/workshops",
    icon: React.createElement(Hammer, { className: "h-4 w-4" }),
  },
  {
    id: 4,
    title: "Job Management",
    href: "/admin/jobs",
    icon: React.createElement(Briefcase, { className: "h-4 w-4" }), // Icon for jobs
  },
  {
    id: 5,
    title: "Certificate Management",
    href: "/certificate/generate",
    icon: React.createElement(Trophy, { className: "h-4 w-4" }), // Icon for certificates
  },
];


const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const scrollThreshold = 200;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = scrollY.get();
      setVisible(
        currentScrollY <= scrollThreshold || currentScrollY < prevScrollY
      );
      setPrevScrollY(currentScrollY);
    };

    const unsubscribe = scrollY.onChange(handleScroll);
    return () => unsubscribe();
  }, [scrollY, prevScrollY]);

  return React.createElement(
    AnimatePresence,
    null,
    visible &&
      React.createElement(
        motion.div,
        {
          initial: { scale: 0, opacity: 1, y: -100 },
          animate: {
            y: visible ? 0 : -150,
            opacity: visible ? 1 : 0,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 10 },
          },
          transition: { duration: 0.8 },
          className:
            "flex items-center justify-between w-[97%] mx-auto z-50 rounded-xl py-1 pl-2 pr-12 h-fit fixed top-4 space-x-4 shadow-lg",
        },
        React.createElement(
          "div",
          { className: "flex items-center" },
          React.createElement("img", {
            src: logo,
            alt: "logo",
            className: "w-16 h-16 rounded-full",
          })
        ),
        React.createElement(
          "div",
          { className: "flex items-center space-x-4" },
          NavItems.map((item) =>
            React.createElement(
              Link,
              {
                key: item.id,
                to: item.href,
                onClick: () => item.title === "More" && setShowMoreModal(true),
                className:
                  "flex gap-2 items-center text-white hover:text-red-500 transition-transform duration-300",
              },
              item.icon,
              React.createElement("p", { className: "text-sm" }, item.title)
            )
          ),
          currentUser
            ? React.createElement(
                React.Fragment,
                null,
                React.createElement(
                  "button",
                  {
                    onClick: () => setShowAdminModal(true),
                    className:
                      "flex gap-2 items-center text-white hover:text-red-500",
                  },
                  React.createElement(ShieldCheck, { className: "h-4 w-4" }),
                  "Admin"
                ),
                React.createElement(
                  "button",
                  {
                    onClick: logout,
                    className:
                      "text-red-500 hover:text-red-600 transition-transform",
                  },
                  "Logout"
                )
              )
            : React.createElement(
                Link,
                {
                  to: "/login",
                  className:
                    "text-white hover:text-red-500 transition-transform",
                },
                "Login"
              )
        )
      ),
    showMoreModal &&
      React.createElement(
        "div",
        {
          className:
            "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
        },
        React.createElement(
          motion.div,
          {
            initial: { scale: 0, opacity: 0, y: -100 },
            animate: { scale: 1, opacity: 1, y: 0 },
            exit: { scale: 0, opacity: 0, y: -100 },
            transition: { type: "spring", stiffness: 100, damping: 10 },
            className:
              "rounded-lg p-6 w-1/3 border border-white flex flex-col justify-center items-center backdrop-blur-md relative",
          },
          React.createElement(
            "button",
            {
              onClick: () => setShowMoreModal(false),
              className: "absolute top-3 right-3 text-white hover:text-red-500",
            },
            React.createElement(X, { className: "h-6 w-6" })
          ),
          React.createElement(
            "ul",
            { className: "space-y-4" },
            MoreLinks.map((link) =>
              React.createElement(
                "li",
                { key: link.id, className: "flex items-center gap-3" },
                link.icon,
                React.createElement(
                  Link,
                  {
                    to: link.href,
                    className: "text-white hover:underline",
                    onClick: () => setShowMoreModal(false),
                  },
                  link.title
                )
              )
            )
          )
        )
      ),
    showAdminModal &&
      React.createElement(
        "div",
        {
          className:
            "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
        },
        React.createElement(
          motion.div,
          {
            initial: { scale: 0, opacity: 0, y: -100 },
            animate: { scale: 1, opacity: 1, y: 0 },
            exit: { scale: 0, opacity: 0, y: -100 },
            transition: { type: "spring", stiffness: 100, damping: 10 },
            className:
              "rounded-lg p-6 w-1/3 border border-white flex flex-col justify-center items-center backdrop-blur-md relative",
          },
          React.createElement(
            "button",
            {
              onClick: () => setShowAdminModal(false),
              className: "absolute top-3 right-3 text-white hover:text-red-500",
            },
            React.createElement(X, { className: "h-6 w-6" })
          ),
          React.createElement(
            "ul",
            { className: "space-y-4" },
            AdminLinks.map((link) =>
              React.createElement(
                "li",
                { key: link.id, className: "flex items-center gap-3" },
                link.icon,
                React.createElement(
                  Link,
                  {
                    to: link.href,
                    className: "text-white hover:underline",
                    onClick: () => setShowAdminModal(false),
                  },
                  link.title
                )
              )
            )
          )
        )
      )
  );
};

export default Navbar;
