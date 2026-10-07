import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, ListMusic } from 'lucide-react';
import { loveData } from '../data/loveData';
import './MusicPlayer.css';

export default function MusicPlayer({
  isPlaying,
  currentTrackIndex,
  currentTime,
  duration,
  volume,
  isMuted,
  onPlayPause,
  onPrev,
  onNext,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onSelectTrack
}) {
  const playlist = loveData.songs || [];
  const currentSong = playlist[currentTrackIndex] || {
    title: "Our Song",
    artist: "Us ❤️",
    cover: "https://img.sanishtech.com/u/939e1fbffcad6bf66d4d59144580a1ab.jpg"
  };

  const formatTime = (timeInSec) => {
    if (isNaN(timeInSec) || !isFinite(timeInSec)) return "0:00";
    const minutes = Math.floor(timeInSec / 60);
    const seconds = Math.floor(timeInSec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <section className="music-section">
      <motion.div
        className="music-card glass-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="music-header">
          <div className="music-badge font-serif">Playlist</div>
          <h2 className="music-title font-serif text-gradient">Our Soundtrack 🎵</h2>
          <p className="music-subtitle">
            {!isPlaying ? "Press play when you're ready 🎵" : "Playing our memory tunes ❤️"}
          </p>
        </div>

        <div className="player-main font-sans">
          {/* Album Cover */}
          <div className="album-cover-frame">
            <img
              src={currentSong.cover || "https://img.sanishtech.com/u/939e1fbffcad6bf66d4d59144580a1ab.jpg"}
              alt={currentSong.title}
              className={`album-cover ${isPlaying ? 'spin-cover' : ''}`}
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="photo-fallback" style={{ display: 'none' }}>
              <Music size={48} color="#FF4F81" />
            </div>

            {/* Equalizer overlay */}
            {isPlaying && (
              <div className="equalizer-bars">
                <span className="eq-bar b1"></span>
                <span className="eq-bar b2"></span>
                <span className="eq-bar b3"></span>
                <span className="eq-bar b4"></span>
              </div>
            )}
          </div>

          {/* Track Meta */}
          <div className="track-meta">
            <h3 className="track-title">{currentSong.title}</h3>
            <p className="track-artist">{currentSong.artist}</p>
          </div>

          {/* Progress Bar */}
          <div className="progress-container">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime || 0}
              onChange={onSeek}
              className="progress-range"
            />
            <div className="time-display">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Player Controls */}
          <div className="player-controls">
            <button className="ctrl-btn" onClick={onPrev} title="Previous Song">
              <SkipBack size={22} />
            </button>

            <button className="play-btn" onClick={onPlayPause} title={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause size={28} fill="#FFF" /> : <Play size={28} fill="#FFF" style={{ marginLeft: 3 }} />}
            </button>

            <button className="ctrl-btn" onClick={onNext} title="Next Song">
              <SkipForward size={22} />
            </button>
          </div>

          {/* Volume Control */}
          <div className="volume-row">
            <button className="vol-btn" onClick={onToggleMute}>
              {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={onVolumeChange}
              className="volume-range"
            />
          </div>

          {/* Playlist Track List */}
          {playlist.length > 0 && (
            <div className="playlist-tracks">
              <div className="playlist-tracks-header">
                <ListMusic size={16} color="#FF4F81" />
                <span>Select a Song</span>
              </div>
              <div className="playlist-track-list">
                {playlist.map((song, idx) => (
                  <button
                    key={song.id || idx}
                    className={`track-item ${idx === currentTrackIndex ? 'active' : ''}`}
                    onClick={() => onSelectTrack && onSelectTrack(idx)}
                  >
                    <span className="track-item-num">{idx === currentTrackIndex && isPlaying ? "▶" : idx + 1}</span>
                    <div className="track-item-info">
                      <span className="track-item-title">{song.title}</span>
                      <span className="track-item-artist">{song.artist}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
