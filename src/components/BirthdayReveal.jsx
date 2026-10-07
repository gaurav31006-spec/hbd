// src/components/BirthdayReveal.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { loveData } from '../data/loveData';
import { playCelebrateChime } from '../utils/soundEffects';
import './BirthdayReveal.css';

export default function BirthdayReveal({ soundEnabled }) {
  const photos = loveData.photos || [];

  useEffect(() => {
    // Trigger confetti burst
    const fire = (particleRatio, opts) => {
      confetti({
        origin: { y: 0.7 },
        ...opts,
        particleCount: Math.floor(200 * particleRatio),
        colors: ['#FF4F81', '#FF6B9A', '#FFB6C9', '#FFFFFF', '#FF8FAB']
      });
    };

    const burst = () => {
      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    };

    burst();
    setTimeout(burst, 1500);
    playCelebrateChime(soundEnabled);
  }, [soundEnabled]);

  return (
    <div className="birthday-reveal-container">
      {/* Floating background photo collage */}
      <div className="floating-collage" aria-hidden="true">
        {photos.map((photo, idx) => (
          <div
            key={idx}
            className="collage-photo"
            style={{
              '--delay': `${idx * 0.7}s`,
              '--x': `${(idx % 3) * 33 + Math.random() * 15}%`,
              '--y': `${Math.floor(idx / 3) * 35 + 10}%`,
              '--rotate': `${(idx % 2 === 0 ? 1 : -1) * (5 + idx % 8)}deg`,
              '--size': `${130 + (idx % 3) * 30}px`
            }}
          >
            <img
              src={photo.image}
              alt=""
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        ))}
      </div>

      {/* Main Birthday Content */}
      <div className="reveal-content">

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
          className="birthday-main-card glass-card"
        >
          <motion.div
            className="birthday-sparkles"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          >
            <Sparkles size={28} color="#FFB6C9" />
          </motion.div>

          <motion.h1
            className="happy-birthday-text font-serif text-gradient"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            HAPPY BIRTHDAY ❤️
          </motion.h1>

          <motion.h2
            className="my-love-text font-serif"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.8 }}
          >
            MY BESTIE 🎉
          </motion.h2>

          <motion.div
            className="heart-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                size={28}
                fill="#FF4F81"
                color="#FF4F81"
                style={{ animationDelay: `${i * 0.2}s` }}
                className="reveal-heart-icon animate-heart-pulse"
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Final Love Message */}
        <motion.div
          className="final-message-card glass-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="final-messages font-serif">
            {[
              "Today isn't just about your birthday.",
              "It's about celebrating you.",
              "Your smile.",
              "Your energy.",
              "Your laugh that's honestly contagious.",
              "Your kindness.",
              "And every little thing that makes you... you.",
              "Here's to more memories.",
              "More adventures.",
              "More laughs.",
              "More stupid conversations.",
              "And a lot more of this beautiful friendship."
            ].map((line, idx) => (
              <motion.p
                key={idx}
                className="final-line"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + idx * 0.18, duration: 0.4 }}
              >
                {line}
              </motion.p>
            ))}

            <motion.p
              className="final-love-sign text-gradient"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 4.2, duration: 0.6 }}
            >
              Happy Birthday, bestie! ❤️🎉
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
