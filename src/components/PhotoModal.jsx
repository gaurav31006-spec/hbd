// src/components/PhotoModal.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import './PhotoGallery.css';

export default function PhotoModal({ photo, onClose }) {
  if (!photo) return null;

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content glass-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close photo">
          <X size={24} color="#FFF" />
        </button>

        <div className="modal-image-container">
          <img
            src={photo.image}
            alt={photo.caption}
            className="modal-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="photo-fallback" style={{ display: 'none' }}>
            <Heart size={60} color="#FF4F81" />
            <p>{photo.caption}</p>
          </div>
        </div>

        <div className="modal-info">
          <h3 className="modal-caption font-handwriting">{photo.caption}</h3>
        </div>
      </motion.div>
    </motion.div>
  );
}
