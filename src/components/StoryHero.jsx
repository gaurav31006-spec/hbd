// src/components/StoryHero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';
import { loveData } from '../data/loveData';
import './StoryHero.css';

export default function StoryHero() {
  const meetingData = loveData.firstMeeting || {};

  return (
    <section className="hero-section">
      <motion.div
        className="hero-container glass-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-badge font-serif">Chapter 00</div>
        
        <h1 className="hero-title font-serif text-gradient">Our Story</h1>
        
        <p className="hero-subtitle">
          It started with one meeting...
        </p>

        <p className="hero-quote">
          "...and somehow became one of my favorite parts of life."
        </p>

        <div className="hero-image-frame">
          <img
            src={meetingData.image || "/photos/photo1.jpg"}
            alt="Our Hero Moment"
            className="hero-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="photo-fallback" style={{ display: 'none' }}>
            <Heart size={48} color="#FF4F81" />
            <p>Our Special Moment ❤️</p>
          </div>
        </div>

        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <span>Scroll to continue</span>
          <ChevronDown size={20} color="#FF6B9A" />
        </motion.div>
      </motion.div>
    </section>
  );
}
