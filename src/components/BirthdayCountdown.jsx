// src/components/BirthdayCountdown.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { playHeartbeat, playHeartClick } from '../utils/soundEffects';
import './BirthdayCountdown.css';

export default function BirthdayCountdown({ onCountdownComplete, soundEnabled }) {
  const [isReady, setIsReady] = useState(false);
  const [count, setCount] = useState(null);

  const handleStartCountdown = () => {
    playHeartClick(soundEnabled);
    setIsReady(true);
    setCount(3);
    playHeartbeat(soundEnabled);

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setTimeout(() => {
            onCountdownComplete();
          }, 800);
          return 0;
        }
        playHeartbeat(soundEnabled);
        return prev - 1;
      });
    }, 1200);
  };

  return (
    <section className="countdown-section">
      <div className="countdown-card glass-card">
        {!isReady ? (
          <motion.div
            className="suspense-intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles size={32} color="#FF4F81" />
            <h2 className="suspense-title font-serif">There's one last thing...</h2>
            <p className="suspense-sub">Are you ready?</p>

            <motion.button
              className="ready-btn"
              onClick={handleStartCountdown}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Yes ❤️</span>
            </motion.button>
          </motion.div>
        ) : (
          <div className="countdown-number-container">
            <AnimatePresence mode="wait">
              {count > 0 && (
                <motion.div
                  key={count}
                  className="huge-countdown-number font-serif text-gradient"
                  initial={{ scale: 2.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.3, opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  {count}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="heartbeat-pulse-bg">
              <Heart size={120} fill="#FF4F81" color="#FF4F81" className="giant-heartbeat" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
