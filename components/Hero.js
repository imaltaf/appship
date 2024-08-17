// components/Hero.js
import React from 'react';
import { LampContainer } from "../components/ui/lamp";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <LampContainer>
      <motion.div
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 text-center"
      >
        <h1 className="text-4xl md:text-7xl font-bold leading-none tracking-tight">
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-mono">
            &lt;Welcome
          </span>
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-mono">
            To
          </span>
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 font-mono">
            AppShip/&gt;
          </span>
        </h1>
        <div className="mt-4 text-xl md:text-2xl text-slate-400 font-semibold">
          Your Gateway to App Innovation
        </div>
      </motion.div>
    </LampContainer>
  );
}