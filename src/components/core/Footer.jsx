import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { BsSpotify, BsTwitterX, BsYoutube } from "react-icons/bs";

const NavItems = [
  { id: 1, title: "Home", href: "/" },
  { id: 2, title: "About", href: "#about" },
  { id: 3, title: "Teams", href: "/teams" },
  { id: 5, title: "Founders", href: "/founders" },
  { id: 6, title: "Privacy & Policy", href: "/privacy-policy" },
];

const MoreLinks = [
  { id: 1, title: "Jobs", href: "/jobs" },
  { id: 2, title: "Community", href: "/community" },
  { id: 3, title: "Workshops", href: "/workshops" },
  { id: 4, title: "News", href: "/news" },
  { id: 5, title: "Events", href: "/events" },
];

export default function Footer() {
  return (
    <main
      className="bg-[#212121] h-full md:h-60 py-8 flex-col md:flex-row flex items-start md:items-center justify-between md:px-4 lg:px-24 px-8 rounded-xl"
      id="footer"
    >
      {/* Logo Section */}
      <div className="flex flex-col items-start justify-center">
        <h1 className="text-white text-4xl font-bold flex items-center flex-row">
          <div className="text-white mt-2 mr-1">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current mb-2"
            >
              <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
            </svg>
          </div>
          <span className="text-red-500">BADVERSE</span>
        </h1>
        <p className="text-neutral-400 text-sm font-bold max-w-sm">
          Break It Down, Build It Up—The B.A.D. Way!
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-8 md:gap-4 xl:gap-28 md:px-4 xl:px-24 flex-row flex-wrap md:flex-nowrap items-start py-8 md:py-0">
        <div className="flex flex-col items-start justify-center w-fit min-w-fit">
          <h1 className="text-white text-2xl font-bold">Quick links</h1>
          {NavItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className="text-neutral-400 text-sm font-bold max-w-sm"
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-start justify-center w-fit min-w-fit">
          <h1 className="text-white text-2xl font-bold">More links</h1>
          {MoreLinks.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className="text-neutral-400 text-sm font-bold max-w-sm"
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-start justify-center w-fit min-w-fit">
          <h1 className="text-white text-2xl font-bold">Social Links</h1>
          <nav className="flex justify-between h-auto flex-wrap items-center gap-6">
            <a
              href="https://www.instagram.com/BADVERSEglobal/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 w-11 relative rounded-xl group text-white hover:text-white"
            >
              <div className="h-full w-full absolute group-hover:bg-white/40 group-hover:backdrop-blur-sm transition-all duration-300 rounded-xl z-10 flex items-center justify-center">
                <FaInstagram className="text-2xl" />
              </div>
              <div className="h-full w-full rounded-xl absolute transition-all duration-300 bg-gradient-to-tr from-orange-500 to-pink-500 group-hover:rotate-[35deg] origin-bottom"></div>
            </a>
            <a
              href="https://chat.whatsapp.com/FYzPkqLqZ9v0vzBLSnuBm6"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 w-11 relative rounded-xl group text-white hover:text-white"
            >
              <div className="h-full w-full absolute group-hover:bg-white/40 group-hover:backdrop-blur-sm transition-all duration-300 rounded-xl z-10 flex items-center justify-center">
                <FaWhatsapp className="text-2xl" />
              </div>
              <div className="h-full w-full rounded-xl absolute transition-all duration-300 bg-gradient-to-tr from-green-500 to-green-700 group-hover:rotate-[35deg] origin-bottom"></div>
            </a>
            {/* Additional social icons */}
            {/* <a
              href="/"
              className="h-11 w-11 relative rounded-xl group text-white hover:text-white"
            >
              <div className="h-full w-full absolute group-hover:bg-white/40 group-hover:backdrop-blur-sm transition-all duration-300 rounded-xl z-10 flex items-center justify-center">
                <BsTwitterX className="text-xl" />
              </div>
              <div className="h-full w-full rounded-xl absolute transition-all duration-300 bg-gradient-to-tr from-neutral-800 to-neutral-700 group-hover:rotate-[35deg] origin-bottom"></div>
            </a> */}
            <a
              href="https://www.linkedin.com/company/105723033/admin/dashboard/"
              className="h-11 w-11 relative rounded-xl group text-white hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="h-full w-full absolute group-hover:bg-white/40 group-hover:backdrop-blur-sm transition-all duration-300 rounded-xl z-10 flex items-center justify-center">
                <FaLinkedin className="text-xl" />
              </div>
              <div className="h-full w-full rounded-xl absolute transition-all duration-300 bg-gradient-to-tr from-blue-700 to-blue-600 group-hover:rotate-[35deg] origin-bottom"></div>
            </a>

            <a
              href="https://www.youtube.com/@BADVERSEglobal"
              className="h-11 w-11 relative rounded-xl group text-white hover:text-white"
            >
              <div className="h-full w-full absolute  group-hover:bg-white/40 group-hover:backdrop-blur-sm transition-all duration-300 rounded-xl z-10 flex items-center justify-center">
                <BsYoutube className="text-xl" />
              </div>
              <div className="h-full w-full  rounded-xl absolute transition-all duration-300 bg-gradient-to-tr from-red-800 to-red-700 group-hover:rotate-[35deg] origin-bottom  "></div>
            </a>
            <a
              href="https://open.spotify.com/show/2xylhP1PG90whlBakdpJzv"
              className="h-11 w-11 relative rounded-xl group text-white hover:text-white"
            >
              <div className="h-full w-full absolute  group-hover:bg-white/40 group-hover:backdrop-blur-sm transition-all duration-300 rounded-xl z-10 flex items-center justify-center">
                <BsSpotify className="text-xl" />
              </div>
              <div className="h-full w-full  rounded-xl absolute transition-all duration-300 bg-gradient-to-tr from-green-600 to-lime-400 group-hover:rotate-[35deg] origin-bottom  "></div>
            </a>
          </nav>
        </div>
      </div>
    </main>
  );
}
