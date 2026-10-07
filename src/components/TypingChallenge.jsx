// src/components/TypingChallenge.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, KeyRound, Sparkles } from 'lucide-react';
import { loveData } from '../data/loveData';
import { playKeyPop, playHeartClick, playCelebrateChime } from '../utils/soundEffects';
import './TypingChallenge.css';

export default function TypingChallenge({ onNext, soundEnabled }) {
  const [typedText, setTypedText] = useState('');
  const targetWord = (loveData.secretWord || 'EVERYTHING').toUpperCase();
  const isMatched = typedText.trim().toUpperCase() === targetWord;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setTypedText(val);
    playKeyPop(soundEnabled);
  };

  const handleUnlock = () => {
    playHeartClick(soundEnabled);
    playCelebrateChime(soundEnabled);
    setIsSubmitted(true);
    setTimeout(() => {
      onNext();
    }, 1200);
  };

  return (
    <motion.div
      className="typing-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: isSubmitted ? 1.2 : 1 }}
      exit={{ opacity: 0, scale: 1.5 }}
      transition={{ duration: 0.8 }}
    >
      <div className={`typing-card glass-card ${isSubmitted ? 'submitted-glow' : ''}`}>
        <motion.div
          className="heart-icon-badge"
          animate={{ scale: isMatched ? [1, 1.2, 1] : 1 }}
          transition={{ repeat: isMatched ? Infinity : 0, duration: 1.5 }}
        >
          <Heart
            size={42}
            fill={isMatched ? '#FF4F81' : 'none'}
            color={isMatched ? '#FF4F81' : '#FFB6C9'}
          />
        </motion.div>

        <h2 className="typing-header font-serif text-gradient">Okay... one more test</h2>

        <p className="typing-prompt">
          Type the secret word... ❤️
        </p>
        <div style={{ fontSize: '1.1rem', marginBottom: '0.8rem', color: '#FF6B9A' }}>
          Hint: you call me everytime 🐒
        </div>

        {!isSubmitted && (
          <div className="typing-input-wrapper">
            <input
              type="text"
              className="typing-input"
              placeholder="e.g. 🐒"
              value={typedText}
              onChange={handleInputChange}
              maxLength={targetWord.length + 5}
              autoFocus
            />
            {typedText.length > 0 && <span className="typing-heart-indicator">❤️</span>}
          </div>
        )}

        {isMatched && !isSubmitted && (
          <motion.button
            className="unlock-heart-btn"
            onClick={handleUnlock}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Unlock My Heart ❤️</span>
            <Sparkles size={20} />
          </motion.button>
        )}

        {isSubmitted && (
          <motion.div
            className="expanding-heart-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Heart size={64} fill="#FF4F81" color="#FF4F81" className="giant-pulsing-heart" />
            <p>Unlocking our universe...</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
