// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

import { loveData } from './data/loveData';
import {
  unlockAudio,
  startAmbientMusic,
  stopAmbientMusic,
  setAmbientVolume,
  isAmbientPlaying
} from './utils/soundEffects';

import ParticleBackground from './components/ParticleBackground';
import WelcomeScreen from './components/WelcomeScreen';
import DateUnlock from './components/DateUnlock';
import TypingChallenge from './components/TypingChallenge';
import CinematicLoading from './components/CinematicLoading';
import StoryHero from './components/StoryHero';
// FirstMeeting removed — showing as data-only in timeline
import ChatStory from './components/ChatStory';
import PhotoGallery from './components/PhotoGallery';
import Timeline from './components/Timeline';
import TaskSection from './components/TaskSection';
import HeartGame from './components/HeartGame';
import MusicPlayer from './components/MusicPlayer';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';
import LoveLetter from './components/LoveLetter';
import BirthdayCountdown from './components/BirthdayCountdown';
import BirthdayReveal from './components/BirthdayReveal';
import EasterEgg from './components/EasterEgg';

import './index.css';

// ── Screens ──────────────────────────────────────────────────────────────────
const SCREENS = {
  WELCOME: 'welcome',
  DATE_UNLOCK: 'date_unlock',
  TYPING: 'typing',
  LOADING: 'loading',
  MAIN_STORY: 'main_story',
  BIRTHDAY_REVEAL: 'birthday_reveal',
};

const getInitialScreen = () => {
  if (loveData.REQUIRE_UNLOCK_EVERY_TIME) return SCREENS.WELCOME;
  const unlocked = localStorage.getItem('birthdayUnlocked');
  return unlocked === 'true' ? SCREENS.MAIN_STORY : SCREENS.WELCOME;
};

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState(getInitialScreen());
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const stored = localStorage.getItem('soundEnabled');
    return stored === null ? true : stored === 'true';
  });

  // HTML5 Audio (for uploaded MP3 file)
  const audioRef = useRef(null);
  const [mp3Available, setMp3Available] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showFloatingPlayer, setShowFloatingPlayer] = useState(false);

  const playlist = loveData.songs || [];

  // ── Unlock AudioContext and start background music on first user interaction ──
  useEffect(() => {
    const unlock = () => {
      unlockAudio();
      const audio = audioRef.current;
      if (audio) {
        audio.playbackRate = 0.85;
      }
      document.removeEventListener('click', unlock);
      document.removeEventListener('touchstart', unlock);
      document.removeEventListener('keydown', unlock);
    };
    document.addEventListener('click', unlock, { once: true });
    document.addEventListener('touchstart', unlock, { once: true });
    document.addEventListener('keydown', unlock, { once: true });
    return () => {
      document.removeEventListener('click', unlock);
      document.removeEventListener('touchstart', unlock);
      document.removeEventListener('keydown', unlock);
    };
  }, []);

  // ── Persist sound preference ──
  useEffect(() => {
    localStorage.setItem('soundEnabled', soundEnabled);
  }, [soundEnabled]);

  // ── HTML5 Audio engine ──
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const song = playlist[currentTrackIndex];
    if (song?.file) {
      const srcUrl = new URL(song.file, window.location.href).href;
      if (audio.src !== srcUrl) {
        audio.src = song.file;
        audio.playbackRate = 0.85;
        audio.loop = true;
        if (isPlaying) {
          audio.play()
            .then(() => setMp3Available(true))
            .catch(() => {
              startAmbientMusic(soundEnabled);
            });
        }
      }
    }
    audio.playbackRate = 0.85;
    audio.volume = isMuted ? 0 : volume;
    if (isAmbientPlaying()) setAmbientVolume(isMuted ? 0 : volume);
  }, [currentTrackIndex, volume, isMuted, playlist, soundEnabled, isPlaying]);

  // ── Start music (called on initial user interaction or entering story) ──
  const startMusic = () => {
    if (!soundEnabled) return;
    unlockAudio();
    const song = playlist[currentTrackIndex] || playlist[0];

    const audio = audioRef.current;
    if (audio && song?.file) {
      const srcUrl = new URL(song.file, window.location.href).href;
      if (!audio.src || audio.src !== srcUrl) {
        audio.src = song.file;
      }
      audio.loop = true;
      audio.playbackRate = 0.85; // Play slowly
      audio.volume = isMuted ? 0 : volume;
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setShowFloatingPlayer(true);
          setMp3Available(true);
        })
        .catch(() => {
          // If MP3 fails or blocked, fallback to ambient music engine
          startAmbientMusic(soundEnabled);
          setIsPlaying(true);
          setShowFloatingPlayer(true);
        });
    } else {
      startAmbientMusic(soundEnabled);
      setIsPlaying(true);
      setShowFloatingPlayer(true);
    }
  };

  const handlePlayPause = () => {
    unlockAudio();
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      if (isAmbientPlaying()) stopAmbientMusic();
      setIsPlaying(false);
    } else {
      const audio = audioRef.current;
      const song = playlist[currentTrackIndex] || playlist[0];
      if (audio && song?.file) {
        const srcUrl = new URL(song.file, window.location.href).href;
        if (!audio.src || audio.src !== srcUrl) {
          audio.src = song.file;
        }
        audio.playbackRate = 0.85;
        audio.volume = isMuted ? 0 : volume;
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setMp3Available(true);
            setShowFloatingPlayer(true);
          })
          .catch(() => {
            startAmbientMusic(soundEnabled);
            setIsPlaying(true);
            setShowFloatingPlayer(true);
          });
      } else {
        startAmbientMusic(soundEnabled);
        setIsPlaying(true);
        setShowFloatingPlayer(true);
      }
    }
  };

  const handlePrev = () => {
    unlockAudio();
    setCurrentTrackIndex((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
  };

  const handleNext = () => {
    unlockAudio();
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const handleSelectTrack = (index) => {
    unlockAudio();
    setCurrentTrackIndex(index);
    const audio = audioRef.current;
    const song = playlist[index];
    if (audio && song?.file) {
      audio.src = song.file;
      audio.playbackRate = 0.85;
      audio.volume = isMuted ? 0 : volume;
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setMp3Available(true);
          setShowFloatingPlayer(true);
        })
        .catch(() => {
          startAmbientMusic(soundEnabled);
          setIsPlaying(true);
        });
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = parseFloat(e.target.value);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
  };

  const handleTimeUpdate = () => { setCurrentTime(audioRef.current?.currentTime || 0); };
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      audioRef.current.playbackRate = 0.85;
    }
    setDuration(audioRef.current?.duration || 0);
    setMp3Available(true);
  };
  const handleAudioEnd = () => { handleNext(); };

  // ── Toggle sound master switch ──
  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (!next && isAmbientPlaying()) stopAmbientMusic();
      if (next && isPlaying && !isAmbientPlaying() && !mp3Available) startAmbientMusic(true);
      return next;
    });
  };

  // ── Navigation ──
  const goToDateUnlock = () => setScreen(SCREENS.DATE_UNLOCK);
  const goToTyping = () => setScreen(SCREENS.TYPING);
  const goToLoading = () => setScreen(SCREENS.LOADING);

  const goToMainStory = () => {
    localStorage.setItem('birthdayUnlocked', 'true');
    setScreen(SCREENS.MAIN_STORY);
    // Start music after slight delay to allow state settle
    setTimeout(() => startMusic(), 700);
  };

  const goToBirthdayReveal = () => setScreen(SCREENS.BIRTHDAY_REVEAL);

  const handleReplay = () => {
    if (!loveData.REQUIRE_UNLOCK_EVERY_TIME) localStorage.removeItem('birthdayUnlocked');
    stopAmbientMusic();
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    setIsPlaying(false);
    setShowFloatingPlayer(false);
    setScreen(SCREENS.WELCOME);
    setStoryPhase('hero');
  };

  // ── Story phase state ──
  const [storyPhase, setStoryPhase] = useState('hero');
  const advanceStory = (next) => setStoryPhase(next);

  // ── Render ──
  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnd}
      />

      <ParticleBackground />

      {/* Sound toggle */}
      <button
        className="sound-toggle-btn"
        onClick={handleToggleSound}
        aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
      >
        {soundEnabled ? <Volume2 size={16} color="#FF4F81" /> : <VolumeX size={16} color="#BFA9B1" />}
        <span>{soundEnabled ? 'Sound On' : 'Sound Off'}</span>
      </button>

      {/* Floating Music Player */}
      {showFloatingPlayer && screen === SCREENS.MAIN_STORY && storyPhase !== 'music' && (
        <FloatingMusicPlayer
          isPlaying={isPlaying}
          currentTrackIndex={currentTrackIndex}
          onPlayPause={handlePlayPause}
        />
      )}

      <AnimatePresence mode="wait">
        {screen === SCREENS.WELCOME && (
          <motion.div key="welcome" style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
            <WelcomeScreen onNext={goToDateUnlock} soundEnabled={soundEnabled} />
          </motion.div>
        )}

        {screen === SCREENS.DATE_UNLOCK && (
          <motion.div key="date" style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
            <DateUnlock onNext={goToTyping} soundEnabled={soundEnabled} />
          </motion.div>
        )}

        {screen === SCREENS.TYPING && (
          <motion.div key="typing" style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
            <TypingChallenge onNext={goToLoading} soundEnabled={soundEnabled} />
          </motion.div>
        )}

        {screen === SCREENS.LOADING && (
          <motion.div key="loading" style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
            <CinematicLoading onComplete={goToMainStory} />
          </motion.div>
        )}

        {screen === SCREENS.MAIN_STORY && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            style={{ position: 'relative', zIndex: 5 }}
          >
            <StoryHero />
            <ChatStory soundEnabled={soundEnabled} />
            <PhotoGallery />
            <Timeline />
            <TaskSection
              onAllTasksCompleted={() => advanceStory('game')}
              soundEnabled={soundEnabled}
            />

            {(storyPhase === 'game' || storyPhase === 'music' || storyPhase === 'letter' || storyPhase === 'countdown') && (
              <HeartGame onComplete={() => advanceStory('music')} soundEnabled={soundEnabled} />
            )}

            {(storyPhase === 'music' || storyPhase === 'letter' || storyPhase === 'countdown') && (
              <MusicPlayer
                isPlaying={isPlaying}
                currentTrackIndex={currentTrackIndex}
                currentTime={currentTime}
                duration={duration}
                volume={isMuted ? 0 : volume}
                isMuted={isMuted}
                onPlayPause={handlePlayPause}
                onPrev={handlePrev}
                onNext={handleNext}
                onSeek={handleSeek}
                onVolumeChange={handleVolumeChange}
                onToggleMute={() => setIsMuted((m) => !m)}
                onSelectTrack={handleSelectTrack}
              />
            )}

            {(storyPhase === 'letter' || storyPhase === 'countdown') && (
              <LoveLetter soundEnabled={soundEnabled} />
            )}

            {storyPhase === 'countdown' && (
              <BirthdayCountdown
                onCountdownComplete={goToBirthdayReveal}
                soundEnabled={soundEnabled}
              />
            )}

            {storyPhase === 'music' && (
              <AdvanceButton label="Open the Letter ❤️" onClick={() => advanceStory('letter')} />
            )}

            {storyPhase === 'letter' && (
              <AdvanceButton label="Continue to the Final Surprise →" onClick={() => advanceStory('countdown')} />
            )}

            {storyPhase !== 'countdown' && (
              <EasterEgg onReplay={handleReplay} soundEnabled={soundEnabled} />
            )}
          </motion.div>
        )}

        {screen === SCREENS.BIRTHDAY_REVEAL && (
          <motion.div
            key="birthday"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}
          >
            <BirthdayReveal soundEnabled={soundEnabled} />
            <EasterEgg onReplay={handleReplay} soundEnabled={soundEnabled} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function AdvanceButton({ label, onClick }) {
  return (
    <motion.div
      style={{ display: 'flex', justifyContent: 'center', padding: '2rem 1.5rem', zIndex: 10, position: 'relative' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <button
        onClick={onClick}
        style={{
          background: 'linear-gradient(135deg, #FF4F81, #FF6B9A)',
          color: '#FFF', border: 'none', padding: '16px 40px',
          fontSize: '1.1rem', fontWeight: 700, borderRadius: '50px',
          cursor: 'pointer', boxShadow: '0 10px 30px rgba(255,79,129,0.5)',
          transition: 'all 0.3s ease', fontFamily: 'Outfit, sans-serif'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = ''}
      >
        {label}
      </button>
    </motion.div>
  );
}
