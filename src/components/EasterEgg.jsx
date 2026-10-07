// src/components/EasterEgg.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RefreshCw } from 'lucide-react';
import { playHeartClick, playCelebrateChime } from '../utils/soundEffects';
import './EasterEgg.css';

export default function EasterEgg({ onReplay, soundEnabled }) {
  const [eggClicks, setEggClicks] = useState(0);
  const [eggFound, setEggFound] = useState(false);

  const handleEggClick = () => {
    playHeartClick(soundEnabled);
    const next = eggClicks + 1;
    setEggClicks(next);
    if (next >= 7) {
      playCelebrateChime(soundEnabled);
      setEggFound(true);
    }
  };

  return (
    <footer className="easter-egg-footer glass-card">
      <div className="footer-content">
        <p className="footer-text font-serif">
          Made with every bit of my heart. Just for you. ❤️
        </p>

        {/* Hidden Easter Egg Heart */}
        <div className="egg-zone">
          <motion.button
            className="egg-heart-btn"
            onClick={handleEggClick}
            whileTap={{ scale: 0.8 }}
            title="Click me..."
            aria-label="Secret Easter Egg Heart"
          >
            <Heart
              size={eggFound ? 26 : 14}
              fill={eggClicks > 0 ? '#FF4F81' : 'transparent'}
              color={eggClicks > 0 ? '#FF4F81' : '#2D1824'}
              style={{ transition: 'all 0.3s ease' }}
            />
          </motion.button>

          {eggClicks > 0 && eggClicks < 7 && (
            <motion.span
              className="egg-counter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {eggClicks}/7
            </motion.span>
          )}
        </div>

        <AnimatePresence>
          {eggFound && (
            <motion.div
              className="egg-reveal glass-card"
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="egg-reveal-title font-serif text-gradient">You found the secret ❤️</h3>
              <p className="egg-reveal-sub">One more thing...</p>
              <p className="egg-reveal-punchline font-serif">
                You're stuck with me. 😌❤️
              </p>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Heart size={40} fill="#FF4F81" color="#FF4F81" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Replay Button */}
        <motion.button
          className="replay-btn"
          onClick={onReplay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw size={18} />
          <span>Replay Our Story ↻</span>
        </motion.button>
      </div>
    </footer>
  );
}
