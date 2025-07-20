import { motion } from "framer-motion";
import { useState } from "react";

interface BlogToggleProps {
  currentMode: "professional" | "personal";
  onModeChange: (mode: "professional" | "personal") => void;
}

export default function BlogToggle({ currentMode, onModeChange }: BlogToggleProps) {
  return (
    <div className="fixed top-20 right-4 z-50 bg-slate-800/90 backdrop-blur-sm rounded-full p-1 border border-slate-700">
      <div className="flex items-center space-x-1">
        <motion.button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            currentMode === "professional"
              ? "bg-primary text-white shadow-lg"
              : "text-slate-400 hover:text-white"
          }`}
          onClick={() => onModeChange("professional")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Professional
        </motion.button>
        <motion.button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            currentMode === "personal"
              ? "bg-secondary text-white shadow-lg"
              : "text-slate-400 hover:text-white"
          }`}
          onClick={() => onModeChange("personal")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Personal
        </motion.button>
      </div>
    </div>
  );
}