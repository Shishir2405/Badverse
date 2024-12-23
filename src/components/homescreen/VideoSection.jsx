import React from "react";
import { video } from "../../assets";
export default function VideoSection() {
  return (
    <div id="about">
      <div className="space-y-6 max-w-7xl mx-auto  py-12" id="about">
        <div className="flex items-center justify-center flex-col gap-4">
          <div className="relative w-fit mx-auto">
            <span className="h-[1px] w-36 bg-white absolute -bottom-2 -right-9" />
            <span className="h-[1px] w-36 bg-white absolute -top-2 -left-9" />
            <h1 className="text-center font-bold text-5xl">
              About <span className="text-red-700">Us</span>
            </h1>
          </div>
          <p>Empowering Voices, Inspiring Action.</p>
        </div>
        <div className="rounded-3xl overflow-hidden relative h-80 w-full bg-emerald-400">
          <video
            className="h-full overflow-hidden object-cover rounded-3xl absolute w-full"
            controls
            autoPlay
            muted
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex justify-between items-center text-xs md:text-lg">
          <article className="flex-1 py-6 px-2 space-y-4">
            <p>
              Bad Talks provides a brilliant opportunity for you to forge
              professional contacts and make new friends. Grab your chance of
              connecting with people to discuss ideas and opportunities.
            </p>
          </article>

          <article className="flex-1 py-6 px-2 space-y-4">
            <p>
              Dive deep into the role of innovation in business growth and learn
              how to leverage technology for sustainability. This is your chance
              to connect with industry leaders and gain valuable knowledge that
              can shape your future.
            </p>
          </article>
        </div>

        <div className="flex justify-between items-center text-xs md:text-base">
          <ul className="flex-1 py-6 px-2 space-y-4 list-disc list-inside">
            <li>Engaging Sessions by Top Entrepreneurs</li>
            <li>Discover New Career Paths</li>
            <li>Stay Informed on the Latest Business Insights</li>
          </ul>
          <ul className="flex-1 py-6 px-2 space-y-4 list-disc list-inside">
            <li>Build Your Network</li>
            <li>Develop Professional Skills</li>
            <li>Learn and Have Fun!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
