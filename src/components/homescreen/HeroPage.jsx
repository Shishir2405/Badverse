import React from "react";
import { Link } from "react-router-dom";
import { frame } from "../../assets";
import { Link2, MoreVertical } from "lucide-react";
import Counter from "../common/Counter";

export default function HeroPage() {
  return (
    <main className="relative flex bg-[#212121] h-[97vh] z-10  rounded-xl">
      {/* hero section */}
      <section className="flex flex-col  bg-[#212121] flex-1 h-[75vh] px-4 py-8 items-start justify-end  z-[100]">
        <div className="relative h-fit w-fit">
          <h2 className="bg-gradient-to-tr text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl from-red-600 to-[#db0606] text-transparent bg-clip-text font-extrabold leading-none relative">
            BADVERSE
          </h2>
          <div className="absolute -top-[90px] sm:-top-[140px] md:-top-[160px] lg:-top-[200px] xl:-top-[390px] left-8 sm:left-12 md:left-4 lg:-left-4 w-full h-full">
            {/* SVG Triangle remains the same */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:svgjs="http://svgjs.dev/svgjs"
              viewBox="0 0 800 800"
            >
              <defs>
                <filter
                  id="nnneon-filter"
                  x="-100%"
                  y="-100%"
                  width="400%"
                  height="400%"
                  filterUnits="objectBoundingBox"
                  primitiveUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feGaussianBlur
                    stdDeviation="17 8"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    in="SourceGraphic"
                    edgeMode="none"
                    result="blur"
                  ></feGaussianBlur>
                </filter>
                <filter
                  id="nnneon-filter2"
                  x="-100%"
                  y="-100%"
                  width="400%"
                  height="400%"
                  filterUnits="objectBoundingBox"
                  primitiveUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feGaussianBlur
                    stdDeviation="10 17"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    in="SourceGraphic"
                    edgeMode="none"
                    result="blur"
                  ></feGaussianBlur>
                </filter>
              </defs>
              <g
                stroke-width="17.5"
                stroke="hsl(353, 98%, 41%)"
                fill="none"
                transform="rotate(328, 400, 400)"
              >
                <path
                  d="M389.14103223963247 255.32842112942834C393.58978170614216 246.33884568239637 406.41022474933516 246.33884568239637 410.8589742158448 255.32842112942834L548.727804019874 533.9252988041978C552.7125363170826 541.977147647995 546.8535623464834 551.4137788012202 537.8700445648469 551.4137788012202H262.1299618906303C253.14644410899382 551.4137788012202 247.2874701383946 541.977147647995 251.27220243560328 533.9252988041978L389.14103223963247 255.32842112942834Z "
                  filter="url(#nnneon-filter)"
                ></path>
                <path
                  d="M401.14103223963247 255.32842112942834C405.58978170614216 246.33884568239637 418.41022474933516 246.33884568239637 422.8589742158448 255.32842112942834L560.727804019874 533.9252988041978C564.7125363170826 541.977147647995 558.8535623464834 551.4137788012202 549.8700445648469 551.4137788012202H274.1299618906303C265.1464441089938 551.4137788012202 259.2874701383946 541.977147647995 263.2722024356033 533.9252988041978L401.14103223963247 255.32842112942834Z "
                  filter="url(#nnneon-filter2)"
                  opacity="0.25"
                ></path>
                <path
                  d="M377.14103223963247 255.32842112942834C381.58978170614216 246.33884568239637 394.41022474933516 246.33884568239637 398.8589742158448 255.32842112942834L536.727804019874 533.9252988041978C540.7125363170826 541.977147647995 534.8535623464834 551.4137788012202 525.8700445648469 551.4137788012202H250.12996189063028C241.14644410899382 551.4137788012202 235.2874701383946 541.977147647995 239.27220243560328 533.9252988041978L377.14103223963247 255.32842112942834Z "
                  filter="url(#nnneon-filter2)"
                  opacity="0.25"
                ></path>
                <path d="M389.14103223963247 255.32842112942834C393.58978170614216 246.33884568239637 406.41022474933516 246.33884568239637 410.8589742158448 255.32842112942834L548.727804019874 533.9252988041978C552.7125363170826 541.977147647995 546.8535623464834 551.4137788012202 537.8700445648469 551.4137788012202H262.1299618906303C253.14644410899382 551.4137788012202 247.2874701383946 541.977147647995 251.27220243560328 533.9252988041978L389.14103223963247 255.32842112942834Z "></path>
              </g>
            </svg>
          </div>
        </div>

        <div className="flex pl-2  gap-4  flex-col items-start justify-start">
          <p className="text-white text-base max-w-xl z-40">
            A dynamic platform where BAD (Breakdown, Analysis, Decision) meets
            Verse (a Universe of Opportunities), bridging the gap between
            Industry and Academia. Empowering youth with the skills, knowledge,
            and insights to thrive in the professional world and seize
            real-world opportunities.
          </p>
          <div className="grid grid-cols-2 sm:flex gap-4 sm:space-x-4">
            {/* First button - Jobs */}
            <button
              type="submit"
              className="flex col-span-1 justify-center gap-2 items-center shadow-xl text-base bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-red-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-1 overflow-hidden border-2 border-white rounded-full group hover:border-white"
            >
              <Link to="/jobs" className="flex items-center gap-2">
                <p className="group-hover:text-white ease-linear duration-300 text-black">
                  Jobs
                </p>
                <svg
                  className="w-6 h-6 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border group-hover:border-none p-2 rotate-45"
                  viewBox="0 0 16 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    className="fill-gray-800 group-hover:fill-gray-800"
                  ></path>
                </svg>
              </Link>
            </button>

            {/* Second button - Internships */}
            <button
              type="submit"
              className="flex col-span-1 justify-center gap-2 items-center shadow-xl text-base bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-red-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-1 overflow-hidden border-2 border-white rounded-full group hover:border-white"
            >
              <Link to="/internships" className="flex items-center gap-2">
                <p className="group-hover:text-white ease-linear duration-300 text-black">
                  Internships
                </p>
                <svg
                  className="w-6 h-6 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border group-hover:border-none p-2 rotate-45"
                  viewBox="0 0 16 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    className="fill-gray-800 group-hover:fill-gray-800"
                  ></path>
                </svg>
              </Link>
            </button>

            {/* Third button - Community (will be on second row in mobile) */}
            <button
              type="submit"
              className="flex col-span-2 justify-center gap-2 items-center mt-4 sm:mt-0 shadow-xl text-base bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-red-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-1 overflow-hidden border-2 border-white rounded-full group hover:border-white"
            >
              <Link to="/community" className="flex items-center gap-2">
                <p className="group-hover:text-white ease-linear duration-300 text-black">
                  Community
                </p>
                <svg
                  className="w-6 h-6 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border group-hover:border-none p-2 rotate-45"
                  viewBox="0 0 16 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    className="fill-gray-800 group-hover:fill-gray-800"
                  ></path>
                </svg>
              </Link>
            </button>
          </div>
        </div>
      </section>
      <section className=" flex-col justify-end flex-[0.9] hidden min-[940px]:flex  pb-8 bg-[#212121]  h-[75vh]  z-[100]">
        <div className="relative h-[300px] xl:h-96 aspect-video">
          <img src={frame} alt="" className="w-full h-full" />
          <div className="absolute top-5 left-36  w-40 h-1 bg-gradient-to-tr rounded-md from-red-600 to-[#db0606] z-10" />
          <div className="absolute bottom-20 right-8 w-40 h-1 bg-gradient-to-tr rounded-md from-red-600 to-[#db0606] z-10" />
        </div>
      </section>

      {/* bottom section & absolutes */}

      <section className="absolute flex h-44 z-[101] bg-[#121212] bottom-0 rounded-bl-xl pt-2 pr-1.5  w-[70vw]">
        <section className="flex relative flex-1 p-2 bg-[#121212] md:bg-[#212121] overflow-hidden rounded-xl z-[102]">
          {/* mobile */}
          <div className="h-full md:h-32 py-3 pl-3 mb-40 md:mb-0 w-full space-y-2 md:w-96 bg-white rounded-xl  md:hidden relative md:right-4 lg:right-24 md:bottom-44">
            <div className="p-0.5 w-full flex rounded-lg gap-2  items-center ">
              <h3 className="text-red-500 font-semibold text-lg">
                <Counter from={150} to={450} />+
              </h3>
              <p className="text-center text-black text-[13px] font-semibold min-[380px]:text-base">
                Internship Opportunities
              </p>
            </div>
            <div className=" p-0.5 w-[90%] flex rounded-lg gap-2  items-center z-[9999999999]">
              <h3 className="text-red-500 font-semibold text-lg">
                <Counter from={300} to={500} />+
              </h3>
              <p className="text-center text-black text-[13px] font-semibold min-[380px]:text-base">
                Associated Companies
              </p>
            </div>
            <div className=" p-0.5 w-[80%] flex rounded-lg gap-2  items-center z-[9999999999]">
              <h3 className="text-red-500 font-semibold text-lg">
                <Counter from={500} to={800} />+
              </h3>
              <p className="text-center text-black text-sm min-[380px]:text-base font-semibold">
                start ups
              </p>
            </div>
            <div className="absolute h-16 w-16 bottom-0 rounded-tl-[30px] -right-4 flex items-center justify-center bg-[#121212]">
              <Link to="/founders">
                <MoreVertical
                  size={44}
                  color="black"
                  className="bg-white p-3 rounded-full mt-1"
                />
              </Link>
              <div className="h-4 w-4 bg-[#121212] bottom-0 absolute -left-4">
                <div className="h-4 w-4 bg-[white] rounded-br-xl absolute -left-0 bottom-0"></div>
              </div>
              <div className="h-4 w-4 bg-[#121212] -top-4 absolute right-4">
                <div className="h-4 w-4 bg-white rounded-br-xl absolute -left-0 bottom-0"></div>
              </div>
            </div>
          </div>
          {/* large-screen */}
          <div className="h-full w-full  gap-2 hidden md:flex">
            <div className="bg-neutral-800 w-full flex-1 rounded-lg flex flex-col justify-center items-center ">
              <h3 className="text-red-500 font-semibold text-xl">
                <Counter from={150} to={450} />+
              </h3>
              <p className="text-center">Internship Opportunities</p>
            </div>
            <div className="bg-neutral-800 w-full flex-1 rounded-lg flex flex-col justify-center items-center ">
              <h3>
                <span className="text-red-500 font-semibold text-xl">
                  <Counter from={500} to={800} />+{" "}
                </span>{" "}
                Startups
              </h3>
              <p className="text-center">
                <span className="text-red-500 font-semibold text-xl">
                  <Counter from={300} to={500} />+{" "}
                </span>{" "}
                Associated Companies
              </p>
            </div>
            <div className="bg-neutral-800 w-full flex-1 rounded-lg flex flex-col justify-center items-center text-xl">
              <Link to="merchandise">
                {" "}
                <p>
                  <span className="text-red-500">Explore </span>Merchandise
                </p>
              </Link>
            </div>
          </div>
        </section>
        {/* left side */}
        <div className="w-8 h-4 absolute -top-4 left-0 bg-[#121212] z-10">
          <div className="w-full h-full absolute top-0 left-0 bg-[#212121] rounded-bl-xl" />{" "}
        </div>
        {/* right side */}
        <div className="w-8 h-8 absolute top-0 right-0 bg-[#212121] z-10">
          <div className="w-full h-full absolute top-[0px] right-0 bg-[#121212] rounded-tr-xl" />{" "}
        </div>
        {/* bottom side */}
        <div className="w-8 h-8 absolute bottom-0 -right-8 bg-[#121212] z-10">
          <div className="w-full h-full absolute bottom-0 left-0 bg-[#212121] rounded-bl-xl" />{" "}
        </div>
      </section>
    </main>
  );
}
