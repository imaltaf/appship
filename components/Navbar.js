import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray border border-purple-500 rounded-lg shadow-lg  bg-opacity-10 backdrop-filter backdrop-blur-lg fixed w-full z-10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-white font-bold text-xl">AppShip</span>
            </Link>
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