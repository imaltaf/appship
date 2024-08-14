// components/Footer.js
import React from 'react';

export default function Footer() {
  return (
    <footer className=" py-6 mt-10">
      <div className="text-center text-gray-500 dark:text-gray-400">
        <p>&copy; 2024 AppShip. All rights reserved.</p>
        <div className="mt-4">
          <a href="https://contact.codesec.me/privacy-policy  " className="hover:underline mx-2">Privacy Policy</a>
          <a href="https://contact.codesec.me/terms-and-conditions" className="hover:underline mx-2">Terms of Service</a>
          <a href="https://contact.codesec.me" className="hover:underline mx-2">Contact</a>
        </div>
      </div>
    </footer>
  );
}
