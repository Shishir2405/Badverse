import React, { useState } from 'react'
import { logo } from "../../assets"
import { MenuIcon, X } from 'lucide-react'

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className='w-full fixed top-0 left-0 right-0 h-16 bg-black/10 rounded-b-xl overflow-hidden backdrop-blur-sm z-50 py-2 px-4'>
        <div className='w-full h-full flex items-center justify-between'>
          <img src={logo} alt="logo" className='w-12 h-12 rounded-full' />
          <MenuIcon 
            className='w-6 h-6 text-white cursor-pointer' 
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
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <X 
            className="w-6 h-6 text-white cursor-pointer" 
            onClick={() => setIsOpen(false)}
          />
        </div>
        
        {/* Sidebar content */}
        <div className="px-4">
          <ul className="space-y-4">
            <li>
              <a href="/" className="text-white hover:text-gray-300 cursor-pointer block w-full p-2 hover:bg-white/10 rounded-lg transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-white hover:text-gray-300 cursor-pointer block w-full p-2 hover:bg-white/10 rounded-lg transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="/services" className="text-white hover:text-gray-300 cursor-pointer block w-full p-2 hover:bg-white/10 rounded-lg transition-colors">
                Team
              </a>
            </li>
            <li>
              <a href="/contact" className="text-white hover:text-gray-300 cursor-pointer block w-full p-2 hover:bg-white/10 rounded-lg transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
