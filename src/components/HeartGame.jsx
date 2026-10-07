// src/components/HeartGame.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Trophy } from 'lucide-react';
import { playHeartCatchSound, playCelebrateChime } from '../utils/soundEffects';
import './HeartGame.css';

export default function HeartGame({ onComplete, soundEnabled }) {
  const [score, setScore] = useState(0);
  const [heartsList, setHeartsList] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [punchlineStage, setPunchlineStage] = useState(0);

  // Spawn falling hearts
  useEffect(() => {
    if (score >= 10) return;

    const interval = setInterval(() => {
      setHeartsList((prev) => {
        if (prev.length >= 6) return prev;
        const newHeart = {
          id: Date.now() + Math.random(),
          x: Math.random() * 85 + 5, // 5% to 90% horizontal position
          size: Math.floor(Math.random() * 20) + 32, // 32px to 52px
          duration: Math.random() * 3 + 3.5 // 3.5s to 6.5s fall time
        };
        return [...prev, newHeart];
      });
    }, 700);

    return () => clearInterval(interval);
  }, [score]);

  // Handle heart tap
  const handleCatchHeart = (id) => {
    playHeartCatchSound(soundEnabled);
    setHeartsList((prev) => prev.filter((h) => h.id !== id));

    setScore((prevScore) => {
      const nextScore = prevScore + 1;
      if (nextScore >= 10 && !isGameOver) {
        setIsGameOver(true);
        playCelebrateChime(soundEnabled);
        triggerPunchlineSequence();
      }
      return nextScore;
    });
  };

  const triggerPunchlineSequence = () => {
    setTimeout(() => setPunchlineStage(1), 1200); // "10 hearts..."
    setTimeout(() => setPunchlineStage(2), 2600); // "But I only need one."
    setTimeout(() => setPunchlineStage(3), 4200); // "You ❤️"
    setTimeout(() => onComplete(), 5800);
  };

  return (
    <section className="heart-game-section">
      <motion.div
        className="game-card glass-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {!isGameOver ? (
          <>
            <div className="game-header">
              <Sparkles size={20} color="#FF4F81" />
              <h2 className="game-title font-serif text-gradient">Catch Some Love ❤️</h2>
              <div className="game-score-badge">
                <Heart size={16} fill="#FF4F81" color="#FF4F81" />
                <span>{score} / 10</span>
              </div>
            </div>

            <p className="game-instruction">Tap the falling hearts to catch my love!</p>

            <div className="falling-area">
              <AnimatePresence>
                {heartsList.map((h) => (
                  <motion.div
                    key={h.id}
                    className="falling-heart-item"
                    style={{ left: `${h.x}%` }}
                    initial={{ y: -50, opacity: 0.9 }}
                    animate={{ y: 320, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: h.duration, ease: 'linear' }}
                    onClick={() => handleCatchHeart(h.id)}
                    onAnimationComplete={() => {
                      setHeartsList((prev) => prev.filter((item) => item.id !== h.id));
                    }}
                  >
                    <Heart size={h.size} fill="#FF4F81" color="#FF6B9A" className="falling-heart-icon" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <div className="game-punchline-container font-serif">
            {punchlineStage >= 1 && (
              <motion.p
                key="p1"
                className="punchline p1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
              >
                10 hearts...
              </motion.p>
            )}

            {punchlineStage >= 2 && (
              <motion.p
                key="p2"
                className="punchline p2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ...but I only need one.
              </motion.p>
            )}

            {punchlineStage >= 3 && (
              <motion.h1
                key="p3"
                className="punchline p3 text-gradient"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.15, opacity: 1 }}
              >
                You ❤️
              </motion.h1>
            )}
          </div>
        )}
      </motion.div>
    </section>
  );
}
