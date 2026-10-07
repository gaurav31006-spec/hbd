// src/components/DateUnlock.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Lock, Unlock, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { loveData } from '../data/loveData';
import { playHeartClick, playCelebrateChime } from '../utils/soundEffects';
import './DateUnlock.css';

const ERROR_MESSAGES = [
  "Hmm... that's not the right date hahahah 👀",
  "Think again! 🤭❤️",
  "Close... check your old chats hahahah 💖",
  "Come on, you know this date! 🤭"
];

export default function DateUnlock({ onNext, soundEnabled }) {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Parse secret date YYYY-MM-DD from config
  const secretParts = (loveData.secretDate || '2023-05-14').split('-');
  const secretYear = secretParts[0];
  const secretMonth = secretParts[1];
  const secretDay = secretParts[2];

  const handleSubmit = (e) => {
    e.preventDefault();
    playHeartClick(soundEnabled);

    const pad = (str) => (str.length === 1 ? '0' + str : str);
    const enteredDay = pad(day.trim());
    const enteredMonth = pad(month.trim());
    const enteredYear = year.trim();

    if (
      enteredDay === secretDay &&
      enteredMonth === secretMonth &&
      enteredYear === secretYear
    ) {
      setIsSuccess(true);
      setErrorMsg('');
      playCelebrateChime(soundEnabled);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF4F81', '#FF6B9A', '#FFB6C9', '#FFFFFF']
      });

      setTimeout(() => {
        onNext();
      }, 2000);
    } else {
      const nextErr = ERROR_MESSAGES[attempts % ERROR_MESSAGES.length];
      setErrorMsg(nextErr);
      setAttempts((prev) => prev + 1);
    }
  };

  return (
    <motion.div
      className="unlock-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.7 }}
    >
      <div className="unlock-card glass-card">
        <div className="lock-icon-badge">
          {isSuccess ? (
            <Unlock className="lock-icon unlocked" size={32} color="#FF4F81" />
          ) : (
            <Lock className="lock-icon" size={32} color="#FF6B9A" />
          )}
        </div>

        <h2 className="unlock-header font-serif text-gradient">Before you enter...</h2>

        <p className="unlock-prompt">
          There is one date I don't think either of us will ever forget.
        </p>

        <p style={{ color: '#FF6B9A', fontSize: '0.95rem', fontStyle: 'italic', margin: '0.4rem 0 1rem 0' }}>
          Hint: you see somthing first time hahahaha 🤭
        </p>

        {isSuccess ? (
          <motion.div
            className="success-banner"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Sparkles size={24} color="#FF4F81" />
            <span>You remembered... ❤️</span>
            <div className="heart-burst">
              <Heart className="flying-heart h1" size={20} fill="#FF4F81" />
              <Heart className="flying-heart h2" size={16} fill="#FF6B9A" />
              <Heart className="flying-heart h3" size={24} fill="#FFB6C9" />
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="date-form">
            <div className="inputs-row">
              <div className="input-group">
                <label>DD</label>
                <input
                  type="text"
                  maxLength={2}
                  placeholder="14"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  required
                />
              </div>

              <span className="slash">/</span>

              <div className="input-group">
                <label>MM</label>
                <input
                  type="text"
                  maxLength={2}
                  placeholder="05"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                />
              </div>

              <span className="slash">/</span>

              <div className="input-group year-input">
                <label>YYYY</label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="2023"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {errorMsg && (
                <motion.div
                  key={errorMsg}
                  className="error-message"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: [0, -8, 8, -5, 5, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" className="unlock-submit-btn">
              <span>Unlock Memory</span>
              <Calendar size={18} />
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}
