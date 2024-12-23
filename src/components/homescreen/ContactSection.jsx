import { PhoneIcon } from 'lucide-react'
import React from 'react'

export default function ContactSection() {
  return (
    <main className='max-w-7xl mx-auto p-8 border relative border-neutral-700 rounded-3xl w-full mt-8'>
        <div className='h-[92%] w-16 md:w-24 bg-red-600 text-white py-8 px-4  md:-ml-6  rounded-b-3xl rounded-tr-3xl absolute top-8 md:right-8 right-2'>
            <div className='h-12 w-12 md:top-24 md:right-24 right-16 top-[68px]  absolute bg-red-600 '>
                <div className='h-full w-full  absolute bg-[#121212] rounded-tr-2xl border-red-600'/>
            </div>
        </div>
       <div className='bg-red-600 text-white py-4 md:py-6 px-4 -ml-6 rounded-l-3xl rounded-tr-3xl'>

        <h2 className='text-start font-bold text-3xl md:text-5xl'>Get In Touch</h2>
       </div>
        <section className='flex flex-col gap-4 mt-8 max-w-[220px] sm:max-w-xl lg:max-w-2xl'>
            <div className='flex flex-col max-w-60 sm:max-w-full'>
                <h3 className='font-bold text-xl md:text-2xl'>OFFICE (INDIA):</h3>
                <p className='text-xs md:text-[15px] text-neutral-300'>OFFICE 1: 123, BUZZ BY SPACESHIP, NEAR THE HUB VIJAYANAGAR PART II, INDORE.</p>
            </div>
            <div className='flex flex-col max-w-60 md:max-w-full'>
                <h3 className='font-bold text-xl md:text-2xl'>OFFICE (USA):</h3>
                <p className='text-xs md:text-[15px] text-neutral-300'>OFFICE 2: PALO ALTO, SILICON VALLEY, UNITED STATES.</p>
            </div>
            <div className='flex flex-col max-w-60 md:max-w-full'>
                <h3 className='font-bold text-xl md:text-2xl'>PHONE:</h3>
                <p className='text-xs md:text-[15px] text-neutral-300 flex items-center gap-1'>INDIA: +91 9876543210 <PhoneIcon className='w-4 h-4 rotate-[270deg] text-neutral-300'/> </p>
                <p className='text-xs md:text-[15px] text-neutral-300 flex items-center gap-1'>USA: +1 1234567890 <PhoneIcon className='w-4 h-4 rotate-[270deg] text-neutral-300'/> </p>
            </div>
            <div className='flex flex-col max-w-60 md:max-w-full'>
                <h3 className='font-bold text-xl md:text-2xl'>EMAIL:</h3>
                <p className='text-xs md:text-xs md:text-[15px] text-neutral-300'>1. MARKETING@BADTALKS.IN</p>
                <p className='text-xs md:text-[15px] text-neutral-300'>2. OUTREACH@BADTALKS.IN</p>
            </div>

        </section>
    </main>
  )
}
