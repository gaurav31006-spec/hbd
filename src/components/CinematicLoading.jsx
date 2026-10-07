// src/components/CinematicLoading.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import './CinematicLoading.css';

const LOADING_STEPS = [
  "Loading memories...",
  "Finding our first smile...",
  "Remembering our little moments...",
  "Putting our story together...",
  "Almost there...",
  "Welcome to our story ❤️"
];

export default function CinematicLoading({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < LOADING_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 1200);
          return prev;
        }
      });
    }, 900);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="loading-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      <div className="loading-content">
        <motion.div
          className="loading-heart-wrapper"
          animate={{ scale: [1, 1.25, 1], rotate: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        >
          <Heart size={80} fill="#FF4F81" color="#FF4F81" className="beating-heart" />
        </motion.div>

        <div className="loading-text-box">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStep}
              className="loading-line font-serif"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {LOADING_STEPS[currentStep]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="progress-bar-track">
          <motion.div
            className="progress-bar-fill"
            animate={{ width: `${((currentStep + 1) / LOADING_STEPS.length) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
