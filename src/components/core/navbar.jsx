import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Home,
  BriefcaseBusiness,
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
  TicketCheck,
  GlobeLock,
  HeartHandshake,
  Store,
  Trophy as TrophyIcon,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { logo } from "../../assets";

const NavItems = [
  { id: 1, title: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
  {
    id: 2,
    title: "Career",
    href: "/",
    icon: <Briefcase className="h-4 w-4" />,
    subItems: [
      {
        id: 'jobs',
        title: "Jobs",
        href: "/jobs",
        icon: <Briefcase className="h-4 w-4" />,
      },
      {
        id: 'internship',
        title: "Internship",
        href: "/internships",
        icon: <BriefcaseBusiness className="h-4 w-4" />,
      },
      {
        id: 'industry',
        title: "Industry Opportunity",
        href: "/career",
        icon: <Route className="h-4 w-4" />,
      },
      {
        id: 'tickets',
        title: "My Tickets",
        href: "/tickets",
        icon: <TicketCheck className="h-4 w-4" />,
      },
    ]
  },
  {
    id: 3,
    title: "Engagement",
    href: "/",
    icon: <HeartHandshake className="h-4 w-4" />,
    subItems: [
      {
        id: 'community',
        title: "Community",
        href: "/community",
        icon: <Globe className="h-4 w-4" />,
      },
      {
        id: 'workshops',
        title: "Workshops",
        href: "/workshops",
        icon: <Rocket className="h-4 w-4" />,
      },
      {
        id: 'events',
        title: "Events",
        href: "/events",
        icon: <Calendar className="h-4 w-4" />,
      },
      {
        id: 'blogcast',
        title: "BlogCast",
        href: "/blog",
        icon: <BookMarked className="h-4 w-4" />,
      },
    ]
  },
  {
    id: 4,
    title: "Store",
    href: "/merchandise",
    icon: <Store className="h-4 w-4" />,
    subItems: [
      {
        id: 'merchandise',
        title: "Merchandise",
        href: "/merchandise",
        icon: <Shirt className="h-4 w-4" />,
      },
    ]
  },
  {
    id: 5,
    title: "BAD",
    href: "/",
    icon: <TrophyIcon className="h-4 w-4" />,
    subItems: [
      {
        id: 'hall-of-fame',
        title: "Hall of Fame",
        href: "/teams",
        icon: <Users2 className="h-4 w-4" />,
      },
      {
        id: 'founders',
        title: "Founders",
        href: "/founders",
        icon: <Crown className="h-4 w-4" />,
      },
    ]
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
  {
    id: 7,
    title: "Internship Management",
    href: "/admin/internships",
    icon: <BriefcaseBusiness className="h-4 w-4" />,
  },
  {
    id: 8,
    title: "Privacy & Policy",
    href: "/admin/privacy-policy",
    icon: <GlobeLock className="h-4 w-4" />,
  },
];

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [clickedDropdown, setClickedDropdown] = useState(null);
  const scrollThreshold = 200;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setClickedDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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

  const handleNavClick = (e, item) => {
    e.preventDefault();
    if (clickedDropdown === item.id) {
      setClickedDropdown(null);
    } else {
      setClickedDropdown(item.id);
    }
  };

  const isDropdownActive = (itemId) => {
    return activeDropdown === itemId || clickedDropdown === itemId;
  };

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
          className="flex items-center justify-between w-[97%] mx-auto z-50 rounded-xl py-1 pl-2 pr-12 h-fit fixed top-4 space-x-4 shadow-lg  bg-opacity-80 backdrop-blur-sm"
        >
          <div className="flex items-center">
            <img src="/logo.png" alt="logo" className="w-16 h-16 rounded-full" />
          </div>

          <div className="flex items-center space-x-4">
            {NavItems.map((item) => (
              <div 
                key={item.id}
                className="relative dropdown-container"
                onMouseEnter={() => !clickedDropdown && setActiveDropdown(item.id)}
                onMouseLeave={() => !clickedDropdown && setActiveDropdown(null)}
              >
                {item.subItems ? (
                  <button
                    onClick={(e) => handleNavClick(e, item)}
                    className="flex gap-2 items-center text-white hover:text-red-500 transition-all duration-300"
                  >
                    {item.icon}
                    <p className="text-sm">{item.title}</p>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isDropdownActive(item.id) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className="flex gap-2 items-center text-white hover:text-red-500 transition-all duration-300"
                  >
                    {item.icon}
                    <p className="text-sm">{item.title}</p>
                  </Link>
                )}
                
                {item.subItems && isDropdownActive(item.id) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-black bg-opacity-90 backdrop-blur-md ring-1 ring-red-500/20 border border-red-500/5"
                  >
                    <div className="py-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.id}
                          to={subItem.href}
                          className="flex items-center gap-2 px-4 py-3 text-sm text-white hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
                          onClick={() => {
                            setClickedDropdown(null);
                            setActiveDropdown(null);
                          }}
                        >
                          {subItem.icon}
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}

            {currentUser ? (
              <>
                {currentUser.role === "admin" && (
                  <div 
                    className="relative dropdown-container"
                    onMouseEnter={() => !clickedDropdown && setActiveDropdown('admin')}
                    onMouseLeave={() => !clickedDropdown && setActiveDropdown(null)}
                  >
                    <button
                      onClick={(e) => handleNavClick(e, { id: 'admin' })}
                      className="flex gap-2 items-center text-white hover:text-red-500 transition-all duration-300"
                    >
                      <ShieldCheck className="h-4 w-4" />
                      Admin
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isDropdownActive('admin') ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    {isDropdownActive('admin') && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-black bg-opacity-90 backdrop-blur-md ring-1 ring-red-500/20 border border-red-500/5"
                      >
                        <div className="py-2">
                          {AdminLinks.map((link) => (
                            <Link
                              key={link.id}
                              to={link.href}
                              className="flex items-center gap-2 px-4 py-3 text-sm text-white hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
                              onClick={() => {
                                setClickedDropdown(null);
                                setActiveDropdown(null);
                              }}
                            >
                              {link.icon}
                              {link.title}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
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
    </AnimatePresence>
  );
};

export default Navbar;