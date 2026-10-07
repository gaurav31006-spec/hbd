// src/components/WelcomeScreen.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { playHeartClick } from '../utils/soundEffects';
import './WelcomeScreen.css';

export default function WelcomeScreen({ onNext, soundEnabled }) {
  const [isExpanding, setIsExpanding] = useState(false);

  const handleEnter = () => {
    playHeartClick(soundEnabled);
    setIsExpanding(true);
    setTimeout(() => {
      onNext();
    }, 900);
  };

  return (
    <motion.div
      className="welcome-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: isExpanding ? 1.4 : 1 }}
      exit={{ opacity: 0, scale: 2 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
    >
      <div className="ambient-glow" />
      <div className="ambient-glow secondary" />

      <div className="welcome-content glass-card">
        <motion.div
          className="heart-wrapper"
          animate={{ scale: isExpanding ? 8 : [1, 1.12, 1] }}
          transition={{
            scale: isExpanding
              ? { duration: 0.8, ease: 'easeIn' }
              : { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }
          }}
        >
          <Heart className="glowing-heart-icon" size={64} fill="#FF4F81" color="#FF4F81" />
        </motion.div>

        <motion.h1
          className="welcome-title font-serif text-gradient"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Only For You        </motion.h1>

        <motion.p
          className="welcome-subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          I made something special just for you... 🎉
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <button className="enter-btn" onClick={handleEnter} disabled={isExpanding}>
            <span>Enter Our Little World</span>
            <ArrowRight size={18} className="btn-icon" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
