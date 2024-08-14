// components/Card.js
import React from 'react';

export default function Card({ title, description, link }) {
  return (
    <div className="max-w-sm dark:bg-white bg-black  dark:bg-grid-small-black/[0.2] bg-grid-small-white/[0.2]  backdrop-filter backdrop-blur-lg border border-purple-500 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-300 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-200 dark:text-gray-300 mb-4">{description}</p>
        <a href={link} className="text-purple-500 hover:text-purple-600 transition-colors duration-300">
          Open App
        </a>
      </div>
    </div>
  );
}