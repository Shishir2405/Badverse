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
  Crown,
  Shirt,
  Route,
  BookMarked,
  BookType,
} from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { logo } from "../../assets";

const NavItems = [
  { id: 1, title: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
  {
    id: 3,
    title: "Teams",
    href: "/teams",
    icon: <Users2 className="h-4 w-4" />,
  },
  {
    id: 5,
    title: "Founders",
    href: "/founders",
    icon: <Crown className="h-4 w-4" />,
  },
  {
    id: 6,
    title: "More",
    href: "#",
    icon: <MoreVertical className="h-4 w-4" />,
  },
];

const MoreLinks = [
  {
    id: 1,
    title: "Jobs",
    href: "/jobs",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    id: 2,
    title: "Community",
    href: "/community",
    icon: <Globe className="h-4 w-4" />,
  },
  {
    id: 3,
    title: "Workshops",
    href: "/workshops",
    icon: <Rocket className="h-4 w-4" />,
  },
  {
    id: 4,
    title: "News",
    href: "/news",
    icon: <Newspaper className="h-4 w-4" />,
  },
  {
    id: 5,
    title: "Events",
    href: "/events",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    id: 6,
    title: "Blogs",
    href: "/blog",
    icon: <BookMarked className="h-4 w-4" />,
  },
  {
    id: 7,
    title: "Merchandise",
    href: "/merchandise",
    icon: <Shirt className="h-4 w-4" />,
  },
  {
    id: 8,
    title: "Career",
    href: "/career",
    icon: <Route className="h-4 w-4" />,
  },
];

const AdminLinks = [
  {
    id: 1,
    title: "Event Management",
    href: "/admin/events/new",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    id: 2,
    title: "News Management",
    href: "/admin/news",
    icon: <Newspaper className="h-4 w-4" />,
  },
  {
    id: 3,
    title: "Workshop Management",
    href: "/admin/workshops",
    icon: <Hammer className="h-4 w-4" />,
  },
  {
    id: 4,
    title: "Job Management",
    href: "/admin/jobs",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    id: 5,
    title: "Certificate Management",
    href: "/certificate/generate",
    icon: <Trophy className="h-4 w-4" />,
  },
  {
    id: 6,
    title: "Blog Management",
    href: "/admin/blog",
    icon: <BookType className="h-4 w-4" />,
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

  const handleNavClick = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const Modal = ({ show, onClose, children }) =>
    show && (
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0, opacity: 0, y: -100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: -100 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className="rounded-lg p-6 w-1/3 border border-white flex flex-col justify-center items-center backdrop-blur-md relative"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white hover:text-red-500"
          >
            <X className="h-6 w-6" />
          </button>
          {children}
        </motion.div>
      </div>
    );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 1, y: -100 }}
          animate={{
            y: visible ? 0 : -150,
            opacity: visible ? 1 : 0,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 10 },
          }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between w-[97%] mx-auto z-50 rounded-xl py-1 pl-2 pr-12 h-fit fixed top-4 space-x-4 shadow-lg bg-opacity-80 backdrop-blur-sm"
        >
          <div className="flex items-center">
            <img src={logo} alt="logo" className="w-16 h-16 rounded-full" />
          </div>

          <div className="flex items-center space-x-4">
            {NavItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                onClick={(e) => {
                  if (item.title === "More") {
                    e.preventDefault();
                    setShowMoreModal(true);
                  } else {
                    handleNavClick(e, item.href);
                  }
                }}
                className="flex gap-2 items-center text-white hover:text-red-500 transition-transform duration-300"
              >
                {item.icon}
                <p className="text-sm">{item.title}</p>
              </Link>
            ))}

            {currentUser ? (
              <>
                {currentUser.role === "admin" && (
                  <button
                    onClick={() => setShowAdminModal(true)}
                    className="flex gap-2 items-center text-white hover:text-red-500"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Admin
                  </button>
                )}
                <button
                  onClick={logout}
                  className="text-red-500 hover:text-red-600 transition-transform"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/admin/login"
                  className="text-white hover:text-red-500 transition-transform"
                >
                  Admin Login
                </Link>
                <Link
                  to="/login"
                  className="text-white hover:text-red-500 transition-transform"
                >
                  Login
                </Link>
                <Link
                  to="/sign-up"
                  className="text-white hover:text-red-500 transition-transform"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}

      <Modal show={showMoreModal} onClose={() => setShowMoreModal(false)}>
        <ul className="space-y-4">
          {MoreLinks.map((link) => (
            <li key={link.id} className="flex items-center gap-3">
              {link.icon}
              <Link
                to={link.href}
                className="text-white hover:underline"
                onClick={() => setShowMoreModal(false)}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </Modal>

      {currentUser?.role === "admin" && (
        <Modal show={showAdminModal} onClose={() => setShowAdminModal(false)}>
          <ul className="space-y-4">
            {AdminLinks.map((link) => (
              <li key={link.id} className="flex items-center gap-3">
                {link.icon}
                <Link
                  to={link.href}
                  className="text-white hover:underline"
                  onClick={() => setShowAdminModal(false)}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
