// src/components/FirstMeeting.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Heart } from 'lucide-react';
import { loveData } from '../data/loveData';
import './FirstMeeting.css';

export default function FirstMeeting() {
  const meeting = loveData.firstMeeting || {
    date: "[DATE]",
    location: "[LOCATION]",
    story: "[YOUR STORY]",
    image: "/photos/photo1.jpg"
  };

  return (
    <section className="first-meeting-section">
      <motion.div
        className="meeting-card glass-card"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="chapter-tag font-serif">Chapter 01</div>
        <h2 className="chapter-title font-serif text-gradient">The Beginning</h2>

        {/* Visual Structure: DATE -> LOCATION -> PHOTO -> STORY */}
        <motion.div
          className="meeting-date-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Calendar size={20} color="#FF4F81" />
          <span>{meeting.date}</span>
        </motion.div>

        <motion.div
          className="meeting-location font-serif"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <MapPin size={18} color="#FF6B9A" />
          <span>{meeting.location}</span>
        </motion.div>

        <motion.div
          className="meeting-photo-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <img
            src={meeting.image || "/photos/photo1.jpg"}
            alt="First Meeting"
            className="meeting-photo"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="photo-fallback" style={{ display: 'none' }}>
            <Heart size={42} color="#FF4F81" />
            <p>{meeting.location}</p>
          </div>
        </motion.div>

        <motion.p
          className="meeting-story-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {meeting.story}
        </motion.p>

        <motion.div
          className="meeting-footer-quotes font-serif"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="q1">Little did I know...</p>
          <p className="q2 text-gradient">...that this day would become so important to me.</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
