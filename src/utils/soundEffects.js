// src/utils/soundEffects.js
// Web Audio API - synthetic sounds + ambient music engine

let audioCtx = null;
let ambientPlaying = false;
let ambientNodes = [];

export const getAudioContext = () => {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  return audioCtx;
};

// ─── UNLOCK: Call on first user gesture ────────────────────────────────────
export const unlockAudio = () => {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
};

// ─── KEY POP (typing) ────────────────────────────────────────────────────────
export const playKeyPop = (soundEnabled = true) => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440 + Math.random() * 120, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {}
};

// ─── HEART CLICK ────────────────────────────────────────────────────────────
export const playHeartClick = (soundEnabled = true) => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.14);
  } catch (e) {}
};

// ─── HEART CATCH (game) ──────────────────────────────────────────────────────
export const playHeartCatchSound = (soundEnabled = true) => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const freqs = [587.33, 739.99, 880];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.04);
      gain.gain.setValueAtTime(0.14, ctx.currentTime + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.04 + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.04);
      osc.stop(ctx.currentTime + idx * 0.04 + 0.18);
    });
  } catch (e) {}
};

// ─── HEARTBEAT ───────────────────────────────────────────────────────────────
export const playHeartbeat = (soundEnabled = true) => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(70, now);
    osc1.frequency.exponentialRampToValueAtTime(45, now + 0.08);
    gain1.gain.setValueAtTime(0.45, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc1.connect(gain1); gain1.connect(ctx.destination);
    osc1.start(now); osc1.stop(now + 0.09);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(85, now + 0.12);
    osc2.frequency.exponentialRampToValueAtTime(50, now + 0.2);
    gain2.gain.setValueAtTime(0.38, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.21);
    osc2.connect(gain2); gain2.connect(ctx.destination);
    osc2.start(now + 0.12); osc2.stop(now + 0.21);
  } catch (e) {}
};

// ─── CELEBRATE CHIME ────────────────────────────────────────────────────────
export const playCelebrateChime = (soundEnabled = true) => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((note, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, ctx.currentTime + i * 0.06);
      gain.gain.setValueAtTime(0.18, ctx.currentTime + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.06 + 0.9);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.06);
      osc.stop(ctx.currentTime + i * 0.06 + 0.9);
    });
  } catch (e) {}
};

// ─── AMBIENT ROMANTIC MUSIC ENGINE ──────────────────────────────────────────
// Plays a gentle, looping romantic ambient soundtrack using pure Web Audio API.
// Works with zero external files.

let masterGain = null;
let ambientInterval = null;

// Romantic chord progression in A minor / C major pentatonic
const CHORD_PROGRESSION = [
  [220.00, 261.63, 329.63], // Am (A3 C4 E4)
  [196.00, 246.94, 293.66], // Gm (G3 B3 D4)
  [174.61, 220.00, 261.63], // Fm (F3 A3 C4)
  [220.00, 277.18, 329.63], // Am7 (A3 C#4 E4)
];

const playChord = (ctx, freqs, time, duration, vol = 0.06) => {
  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = idx === 0 ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(vol, time + 0.4);
    gain.gain.setValueAtTime(vol, time + duration - 0.5);
    gain.gain.linearRampToValueAtTime(0, time + duration);

    osc.connect(gain);
    gain.connect(masterGain || ctx.destination);

    osc.start(time);
    osc.stop(time + duration + 0.1);
  });
};

const playMelodyNote = (ctx, freq, time, duration, vol = 0.05) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, time);
  osc.frequency.setValueAtTime(freq * 1.003, time + duration * 0.5); // slight vibrato

  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(vol, time + 0.1);
  gain.gain.setValueAtTime(vol, time + duration - 0.15);
  gain.gain.linearRampToValueAtTime(0, time + duration);

  osc.connect(gain);
  gain.connect(masterGain || ctx.destination);

  osc.start(time);
  osc.stop(time + duration + 0.1);
};

// High melody notes (romantic lead melody line)
const MELODY_STEPS = [
  523.25, 587.33, 659.25, 587.33,  // C5 D5 E5 D5
  523.25, 493.88, 440.00, 392.00,  // C5 B4 A4 G4
  440.00, 493.88, 523.25, 587.33,  // A4 B4 C5 D5
  659.25, 587.33, 523.25, 440.00,  // E5 D5 C5 A4
];

let melodyStep = 0;
let chordStep = 0;

export const startAmbientMusic = (soundEnabled = true) => {
  if (!soundEnabled || ambientPlaying) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().then(() => {
        ambientPlaying = false;
        startAmbientMusic(soundEnabled);
      }).catch(() => {});
      return;
    }

    ambientPlaying = true;
    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 3); // Fade in
    masterGain.connect(ctx.destination);

    const CHORD_DUR = 3.0;
    const NOTE_DUR = 0.55;

    let now = ctx.currentTime + 0.5;
    chordStep = 0;
    melodyStep = 0;

    // Schedule first batch
    const scheduleBatch = () => {
      if (!ambientPlaying) return;
      const batchSize = 8;
      let t = ctx.currentTime + 0.1;

      for (let i = 0; i < batchSize; i++) {
        const chord = CHORD_PROGRESSION[chordStep % CHORD_PROGRESSION.length];
        playChord(ctx, chord, t, CHORD_DUR, 0.055);

        // 4 melody notes per chord
        for (let m = 0; m < 4; m++) {
          const note = MELODY_STEPS[melodyStep % MELODY_STEPS.length];
          playMelodyNote(ctx, note, t + m * NOTE_DUR, NOTE_DUR * 0.9, 0.07);
          melodyStep++;
        }

        chordStep++;
        t += CHORD_DUR;
      }
    };

    scheduleBatch();
    // Re-schedule every ~22s (8 chords × 3s = 24s, with some overlap)
    ambientInterval = setInterval(scheduleBatch, 22000);
  } catch (e) {}
};

export const stopAmbientMusic = () => {
  ambientPlaying = false;
  if (ambientInterval) {
    clearInterval(ambientInterval);
    ambientInterval = null;
  }
  try {
    if (masterGain) {
      const ctx = getAudioContext();
      if (ctx) {
        masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
        setTimeout(() => {
          masterGain?.disconnect();
          masterGain = null;
        }, 2000);
      }
    }
  } catch (e) {}
};

export const setAmbientVolume = (vol) => {
  try {
    if (masterGain) {
      const ctx = getAudioContext();
      if (ctx) masterGain.gain.setValueAtTime(vol, ctx.currentTime);
    }
  } catch (e) {}
};

export const isAmbientPlaying = () => ambientPlaying;
