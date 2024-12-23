import React from 'react'

export default function Timeline() {
    return (
        <div className="container mx-auto w-full max-w-4xl px-4 py-20">
            <div className="relative wrap">
                {/* Continuous background line */}
                <div className="absolute h-full w-1 bg-neutral-800 left-1/2 transform -translate-x-1/2"></div>

                {/* First timeline item */}
                <div className="mb-16 flex justify-between items-center w-full right-timeline relative">
                    <div className="order-1 w-5/12"></div>
                    <div className="z-20 flex items-center order-1 bg-gradient-to-r from-blue-600 to-blue-800 shadow-xl w-10 h-10 rounded-full hover:scale-110 transition-transform duration-300">
                        <h1 className="mx-auto font-bold text-lg text-white">1</h1>
                    </div>
                    <div className="order-1 w-5/12 px-6 py-4 rounded-xl bg-neutral-900/90 border border-neutral-700 shadow-xl hover:transform hover:-translate-y-1 transition-all duration-300">
                        <h3 className="mb-3 font-bold text-white text-xl">Discovery Phase</h3>
                        <p className="text-sm leading-snug tracking-wide text-neutral-300">Initial project analysis and requirement gathering</p>
                    </div>
                </div>

                {/* Second timeline item */}
                <div className="mb-16 flex justify-between flex-row-reverse items-center w-full left-timeline relative">
                    <div className="order-1 w-5/12"></div>
                    <div className="z-20 flex items-center order-1 bg-gradient-to-r from-blue-600 to-blue-800 shadow-xl w-10 h-10 rounded-full hover:scale-110 transition-transform duration-300">
                        <h1 className="mx-auto font-bold text-lg text-white">2</h1>
                    </div>
                    <div className="order-1 w-5/12 px-6 py-4 rounded-xl bg-neutral-900/90 border border-neutral-700 shadow-xl hover:transform hover:-translate-y-1 transition-all duration-300">
                        <h3 className="mb-3 font-bold text-white text-xl">Planning</h3>
                        <p className="text-sm leading-snug tracking-wide text-neutral-300">Strategic roadmap and resource allocation</p>
                    </div>
                </div>

                {/* Third timeline item */}
                <div className="mb-16 flex justify-between items-center w-full right-timeline relative">
                    <div className="order-1 w-5/12"></div>
                    <div className="z-20 flex items-center order-1 bg-gradient-to-r from-blue-600 to-blue-800 shadow-xl w-10 h-10 rounded-full hover:scale-110 transition-transform duration-300">
                        <h1 className="mx-auto font-bold text-lg text-white">3</h1>
                    </div>
                    <div className="order-1 w-5/12 px-6 py-4 rounded-xl bg-neutral-900/90 border border-neutral-700 shadow-xl hover:transform hover:-translate-y-1 transition-all duration-300">
                        <h3 className="mb-3 font-bold text-white text-xl">Design</h3>
                        <p className="text-sm leading-snug tracking-wide text-neutral-300">UI/UX design and prototyping phase</p>
                    </div>
                </div>

                {/* Fourth timeline item */}
                <div className="mb-16 flex justify-between flex-row-reverse items-center w-full left-timeline relative">
                    <div className="order-1 w-5/12"></div>
                    <div className="z-20 flex items-center order-1 bg-gradient-to-r from-blue-600 to-blue-800 shadow-xl w-10 h-10 rounded-full hover:scale-110 transition-transform duration-300">
                        <h1 className="mx-auto font-bold text-lg text-white">4</h1>
                    </div>
                    <div className="order-1 w-5/12 px-6 py-4 rounded-xl bg-neutral-900/90 border border-neutral-700 shadow-xl hover:transform hover:-translate-y-1 transition-all duration-300">
                        <h3 className="mb-3 font-bold text-white text-xl">Development</h3>
                        <p className="text-sm leading-snug tracking-wide text-neutral-300">Core development and implementation</p>
                    </div>
                </div>

                {/* Fifth timeline item */}
                <div className="mb-16 flex justify-between items-center w-full right-timeline relative">
                    <div className="order-1 w-5/12"></div>
                    <div className="z-20 flex items-center order-1 bg-gradient-to-r from-blue-600 to-blue-800 shadow-xl w-10 h-10 rounded-full hover:scale-110 transition-transform duration-300">
                        <h1 className="mx-auto font-bold text-lg text-white">5</h1>
                    </div>
                    <div className="order-1 w-5/12 px-6 py-4 rounded-xl bg-neutral-900/90 border border-neutral-700 shadow-xl hover:transform hover:-translate-y-1 transition-all duration-300">
                        <h3 className="mb-3 font-bold text-white text-xl">Testing</h3>
                        <p className="text-sm leading-snug tracking-wide text-neutral-300">Quality assurance and bug fixing</p>
                    </div>
                </div>

                {/* Sixth timeline item */}
                <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline relative">
                    <div className="order-1 w-5/12"></div>
                    <div className="z-20 flex items-center order-1 bg-gradient-to-r from-blue-600 to-blue-800 shadow-xl w-10 h-10 rounded-full hover:scale-110 transition-transform duration-300">
                        <h1 className="mx-auto font-bold text-lg text-white">6</h1>
                    </div>
                    <div className="order-1 w-5/12 px-6 py-4 rounded-xl bg-neutral-900/90 border border-neutral-700 shadow-xl hover:transform hover:-translate-y-1 transition-all duration-300">
                        <h3 className="mb-3 font-bold text-white text-xl">Launch</h3>
                        <p className="text-sm leading-snug tracking-wide text-neutral-300">Deployment and project delivery</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
