// src/components/Timeline.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart } from 'lucide-react';
import { loveData } from '../data/loveData';
import './Timeline.css';

export default function Timeline() {
  const items = loveData.timeline || [];

  if (items.length === 0) return null;

  return (
    <section className="timeline-section">
      <motion.div
        className="timeline-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="timeline-badge font-serif">Journey</div>
        <h2 className="timeline-title font-serif text-gradient">
          How We Became Us
        </h2>
        <p className="timeline-subtitle">
          Small steps, deep conversations, and moments that shaped our story.
        </p>
      </motion.div>

      <div className="timeline-container">
        <div className="timeline-line" />

        {items.map((item, idx) => {
          const isEven = idx % 2 === 0;
          const numStr = (idx + 1).toString().padStart(2, '0');

          return (
            <motion.div
              key={idx}
              className={`timeline-item ${isEven ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="timeline-node font-serif">
                <span>{numStr}</span>
              </div>

              <div className="timeline-card glass-card">
                <div className="timeline-date-row">
                  <Calendar size={15} color="#FF4F81" />
                  <span>{item.date}</span>
                </div>

                <h3 className="timeline-item-title font-serif text-gradient">
                  {item.title}
                </h3>

                <p className="timeline-item-desc">{item.description}</p>

                {item.image && (
                  <div className="timeline-photo-wrapper">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="timeline-photo"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="photo-fallback" style={{ display: 'none' }}>
                      <Heart size={32} color="#FF4F81" />
                      <p>{item.title}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
