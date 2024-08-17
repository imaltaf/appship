// components/Card.js
import React from "react";
import { Meteors } from "../components/ui/meteors";

export default function MeteorsDemo({ title, description, link }) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative h-[250px] w-full max-w-sm overflow-hidden rounded-lg shadow-lg">
        {/* Card content */}
        <div className="relative h-full w-full border border-purple-500 rounded-lg bg-black dark:bg-white bg-grid-small-white/[0.2] dark:bg-grid-small-black/[0.2] overflow-hidden">
          {/* Background gradient inside the border */}
          <div className="absolute inset-0 blur-3xl" />
          
          {/* Content container */}
          <div className="relative h-full w-full px-4 py-8 flex flex-col justify-end items-start backdrop-filter backdrop-blur-lg">
            <div className="h-5 w-5 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-2 w-2 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-purple-500 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-200 dark:text-gray-300 mb-4">{description}</p>
            <a href={link} className="text-purple-500 hover:text-purple-600 transition-colors duration-300">
              Open App
            </a>
            {/* Meteor effect */}
            <Meteors number={20} />
          </div>
        </div>
      </div>
    </div>
  );
}