// src/components/PhotoGallery.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Maximize2 } from 'lucide-react';
import { loveData } from '../data/loveData';
import PhotoModal from './PhotoModal';
import './PhotoGallery.css';

// Random slight rotations for physical polaroid card feel
const ROTATIONS = [-4, 3, -2, 5, -3, 4, -5, 2];

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const photos = loveData.photos || [];

  return (
    <section className="gallery-section">
      <motion.div
        className="gallery-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="gallery-badge">
          <Sparkles size={16} color="#FF4F81" />
          <span>Photo Memories</span>
        </div>
        <h2 className="gallery-title font-serif text-gradient">
          Our Little Universe ❤️
        </h2>
        <p className="gallery-subtitle">
          Every picture holds a thousand words... and a million feelings.
        </p>
      </motion.div>

      <div className="gallery-grid">
        {photos.map((item, index) => {
          const rot = ROTATIONS[index % ROTATIONS.length];
          return (
            <motion.div
              key={item.id || index}
              className="polaroid-card"
              style={{ '--rotation': `${rot}deg` }}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ rotate: 0, y: -10, scale: 1.04, zIndex: 10 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPhoto(item)}
            >
              <div className="polaroid-photo-wrapper">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="polaroid-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="photo-fallback" style={{ display: 'none' }}>
                  <Heart size={36} color="#FF4F81" />
                  <p>{item.caption}</p>
                </div>
                <div className="photo-overlay">
                  <Maximize2 size={24} color="#FFF" />
                </div>
              </div>

              <div className="polaroid-details">
                <p className="polaroid-caption font-handwriting">{item.caption}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <PhotoModal
            photo={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
