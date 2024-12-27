import React, { useState } from "react";
import { logo } from "../../assets";
import { MenuIcon, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function MobileNavbar() {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const NavItems = [
    { id: 1, title: "Home", href: "/" },
    { id: 2, title: "About", href: "/#about" },
    { id: 3, title: "Teams", href: "/teams" },
    { id: 4, title: "Contact", href: "/contact" },
    { id: 5, title: "Founders", href: "/founders" },
    { id: 6, title: "Jobs", href: "/jobs" },
    { id: 7, title: "Community", href: "/community" },
    { id: 8, title: "Workshops", href: "/workshops" },
    { id: 9, title: "News", href: "/news" },
    { id: 10, title: "Events", href: "/events" },
    { id: 11, title: "Blogs", href: "/blog" },
    { id: 12, title: "Merchandise", href: "/merchandise" },
    { id: 13, title: "Career", href: "/career" },
  ];

  const AdminLinks = [
    { id: 1, title: "Event Management", href: "/admin/events" },
    { id: 2, title: "News Management", href: "/admin/news" },
    { id: 3, title: "Workshop Management", href: "/admin/workshops" },
    { id: 4, title: "Job Management", href: "/admin/jobs" },
    { id: 5, title: "Certificate Management", href: "/certificate/generate" },
    { id: 6, title: "Blog Management", href: "/admin/blog" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <nav className="w-full fixed top-0 left-0 right-0 h-16 bg-black/10 rounded-b-xl overflow-hidden backdrop-blur-sm z-50 py-2 px-4">
        <div className="w-full h-full flex items-center justify-between">
          <img src={logo} alt="logo" className="w-12 h-12 rounded-full" />
          <MenuIcon
            className="w-6 h-6 text-white cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-black/20 backdrop-blur-sm transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <X
            className="w-6 h-6 text-white cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* Sidebar content */}
        <div className="px-4 overflow-y-auto max-h-[calc(100vh-6rem)]">
          <ul className="space-y-2">
            {NavItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.href}
                  className="text-white hover:text-gray-300 cursor-pointer block w-full p-2 hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              </li>
            ))}

            {/* Admin Links */}
            {currentUser?.role === "admin" && (
              <>
                <li className="pt-4 pb-2">
                  <h3 className="text-gray-400 text-sm font-semibold">
                    Admin Panel
                  </h3>
                </li>
                {AdminLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.href}
                      className="text-white hover:text-gray-300 cursor-pointer block w-full p-2 hover:bg-white/10 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </>
            )}

            {/* Auth Links */}
            <li className="pt-4">
              {!currentUser ? (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="text-red-500 hover:text-red-700 cursor-pointer block w-full p-2 hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/sign-up"
                    className="text-red-500 hover:text-red-700 cursor-pointer block w-full p-2 hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 cursor-pointer block w-full p-2 hover:bg-white/10 rounded-lg transition-colors text-left"
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
