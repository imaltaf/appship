import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray border border-purple-500 rounded-lg shadow-lg bg-opacity-10 backdrop-filter backdrop-blur-lg fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center space-x-2">
              
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-extrabold text-xl tracking-tight">
                  AppShip
                </span>
              </div>
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-purple-300 focus:outline-none focus:text-purple-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg ring-1 ring-white ring-opacity-20 transition-all duration-300 ease-in-out">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <Link href="/free-apps" className="block px-4 py-2 text-sm text-white hover:bg-white hover:bg-opacity-20 transition duration-300 ease-in-out">
              Free Apps
            </Link>
            <Link href="/cybersecurity-apps" className="block px-4 py-2 text-sm text-white hover:bg-white hover:bg-opacity-20 transition duration-300 ease-in-out">
              Cybersecurity Apps
            </Link>
            <Link href="/open-source-tools" className="block px-4 py-2 text-sm text-white hover:bg-white hover:bg-opacity-20 transition duration-300 ease-in-out">
              Open-Source Tools
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;