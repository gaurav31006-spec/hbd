// src/components/FloatingMusicPlayer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music } from 'lucide-react';
import { loveData } from '../data/loveData';
import './MusicPlayer.css';

export default function FloatingMusicPlayer({ isPlaying, currentTrackIndex, onPlayPause }) {
  const playlist = loveData.songs || [];
  const currentSong = playlist[currentTrackIndex] || {
    title: "Our Song",
    artist: "Us ❤️"
  };

  return (
    <motion.div
      className="floating-player-widget glass-card"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="mini-equalizer">
        {isPlaying ? (
          <div className="mini-eq-bars">
            <span className="mb1"></span>
            <span className="mb2"></span>
            <span className="mb3"></span>
          </div>
        ) : (
          <Music size={18} color="#FF4F81" />
        )}
      </div>

      <div className="widget-info">
        <span className="widget-title">{currentSong.title}</span>
        <span className="widget-artist">{currentSong.artist}</span>
      </div>

      <button className="widget-play-btn" onClick={onPlayPause} aria-label="Toggle Play">
        {isPlaying ? <Pause size={16} fill="#FFF" /> : <Play size={16} fill="#FFF" style={{ marginLeft: 2 }} />}
      </button>
    </motion.div>
  );
}
