// src/components/LoveLetter.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles } from 'lucide-react';
import { loveData } from '../data/loveData';
import { playHeartClick, playKeyPop } from '../utils/soundEffects';
import './LoveLetter.css';

export default function LoveLetter({ soundEnabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedLines, setDisplayedLines] = useState([]);
  
  const rawLetterText = loveData.loveLetter || `Dear ${loveData.girlfriendName || 'My Love'},\n\nI love you. ❤️`;
  const letterLines = rawLetterText
    .replace(/\[(HER_NAME|BESTIE_NAME)\]/g, loveData.girlfriendName || 'bestie')
    .split('\n');

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    playHeartClick(soundEnabled);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < letterLines.length) {
        setDisplayedLines((prev) => [...prev, letterLines[index]]);
        playKeyPop(soundEnabled);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [isOpen, rawLetterText, soundEnabled]);

  return (
    <section className="letter-section">
      <motion.div
        className="letter-wrapper glass-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="letter-header">
          <Sparkles size={20} color="#FF4F81" />
          <h2 className="letter-title font-serif text-gradient">A Letter For You</h2>
          <p className="letter-subtitle">
            {!isOpen ? "Tap the envelope to open my heart" : "Written with love ❤️"}
          </p>
        </div>

        {!isOpen ? (
          <motion.div
            className="envelope-container"
            onClick={handleOpenEnvelope}
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="envelope-body">
              <div className="envelope-flap" />
              <div className="envelope-seal">
                <Heart size={32} fill="#FF4F81" color="#FF4F81" />
              </div>
              <p className="envelope-label font-serif">For {loveData.girlfriendName || 'You'} ❤️</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="letter-paper font-handwriting"
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="paper-texture" />
            <div className="letter-text-content">
              {displayedLines.map((line, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="letter-line"
                >
                  {line === '' ? <br /> : line}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
