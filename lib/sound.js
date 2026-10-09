// Web Audio API high-end tactile sound effects (crispy mechanical snap & satisfying clicks)

let audioCtx = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Auto-unlock Web Audio API context on user interaction anywhere
if (typeof window !== "undefined") {
  const unlockAudio = () => {
    try {
      const ctx = getAudioContext();
      if (ctx && ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
    } catch (e) {}
  };
  window.addEventListener("pointerdown", unlockAudio, { capture: true, passive: true });
  window.addEventListener("keydown", unlockAudio, { capture: true, passive: true });
  window.addEventListener("touchstart", unlockAudio, { capture: true, passive: true });
  window.addEventListener("click", unlockAudio, { capture: true, passive: true });
}

/**
 * Ultra-delicate glassy micro-tap for hover interactions
 */
export function playHoverSound() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem("sound_muted") === "true") return;
  // STRICT: Never play hover sounds on touch / mobile / tablet devices
  if (
    (window.matchMedia && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) ||
    ("ontouchstart" in window && navigator.maxTouchPoints > 0 && !window.matchMedia("(pointer: fine)").matches)
  ) {
    return;
  }

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2800, now);
    filter.Q.setValueAtTime(4.0, now);

    osc.type = "sine";
    osc.frequency.setValueAtTime(2200, now);
    osc.frequency.exponentialRampToValueAtTime(1100, now + 0.012);

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.013);
  } catch (e) {}
}

let lastClickSoundTime = 0;
let lastPlayClickUpTime = 0;

/**
 * Crispy, tactile mechanical downstroke / press pop & snap
 */
export function playClickDownSound(pitchFactor = 1) {
  if (typeof window === "undefined") return;
  if (localStorage.getItem("sound_muted") === "true") return;

  const nowMs = Date.now();
  if (nowMs - lastClickSoundTime < 60) return;
  lastClickSoundTime = nowMs;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    const now = ctx.currentTime;
    const freqMultiplier = typeof pitchFactor === "number" && pitchFactor > 100 ? pitchFactor / 750 : 1;

    // --- 1. Crisp Transient Snap (The sharp mechanical down-click) ---
    const snapOsc = ctx.createOscillator();
    const snapGain = ctx.createGain();
    const snapFilter = ctx.createBiquadFilter();

    snapFilter.type = "bandpass";
    snapFilter.frequency.setValueAtTime(2700 * freqMultiplier, now);
    snapFilter.Q.setValueAtTime(3.5, now);

    snapOsc.type = "triangle";
    snapOsc.frequency.setValueAtTime(2200 * freqMultiplier, now);
    snapOsc.frequency.exponentialRampToValueAtTime(3800 * freqMultiplier, now + 0.003);
    snapOsc.frequency.exponentialRampToValueAtTime(700, now + 0.014);

    snapGain.gain.setValueAtTime(0.32, now);
    snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.016);

    snapOsc.connect(snapFilter);
    snapFilter.connect(snapGain);
    snapGain.connect(ctx.destination);

    snapOsc.start(now);
    snapOsc.stop(now + 0.018);

    // --- 2. Tactile Body / Pop (Low-end mechanical resonance & substance) ---
    const bodyOsc = ctx.createOscillator();
    const bodyGain = ctx.createGain();

    bodyOsc.type = "sine";
    const baseFreq = typeof pitchFactor === "number" && pitchFactor > 100 ? pitchFactor : 820;
    bodyOsc.frequency.setValueAtTime(baseFreq, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(240, now + 0.024);

    bodyGain.gain.setValueAtTime(0.24, now);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.026);

    bodyOsc.connect(bodyGain);
    bodyGain.connect(ctx.destination);

    bodyOsc.start(now);
    bodyOsc.stop(now + 0.028);

    // --- 3. Micro Noise Burst (Satisfying "malutong" crisp mechanical texture) ---
    const bufferSize = Math.floor(ctx.sampleRate * 0.007); // 7ms crisp noise
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.28));
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "highpass";
    noiseFilter.frequency.setValueAtTime(3200, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.18, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.007);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    whiteNoise.start(now);
  } catch (e) {}
}

/**
 * Distinct, light & delicate mechanical upstroke / release return snap (no deep thud)
 */
export function playClickUpSound(pitchFactor = 1) {
  if (typeof window === "undefined") return;
  if (localStorage.getItem("sound_muted") === "true") return;

  const nowMs = Date.now();
  if (nowMs - lastPlayClickUpTime < 50) return;
  lastPlayClickUpTime = nowMs;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    const now = ctx.currentTime;
    const freqMultiplier = typeof pitchFactor === "number" && pitchFactor > 100 ? pitchFactor / 750 : 1;

    // --- 1. Delicate High Release Snap (Light mechanical spring tick) ---
    const upOsc = ctx.createOscillator();
    const upGain = ctx.createGain();
    const upFilter = ctx.createBiquadFilter();

    upFilter.type = "bandpass";
    upFilter.frequency.setValueAtTime(3600 * freqMultiplier, now);
    upFilter.Q.setValueAtTime(4.5, now);

    upOsc.type = "triangle";
    upOsc.frequency.setValueAtTime(3400 * freqMultiplier, now);
    upOsc.frequency.exponentialRampToValueAtTime(4800 * freqMultiplier, now + 0.004);
    upOsc.frequency.exponentialRampToValueAtTime(1400, now + 0.010);

    upGain.gain.setValueAtTime(0.18, now);
    upGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.011);

    upOsc.connect(upFilter);
    upFilter.connect(upGain);
    upGain.connect(ctx.destination);

    upOsc.start(now);
    upOsc.stop(now + 0.012);

    // --- 2. High-Frequency Micro Release Texture (Airy micro click) ---
    const bufferSize = Math.floor(ctx.sampleRate * 0.004); // 4ms micro release noise
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.22));
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "highpass";
    noiseFilter.frequency.setValueAtTime(4500, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.12, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.004);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    whiteNoise.start(now);
  } catch (e) {}
}

/**
 * Default click action (plays downstroke click sound)
 */
export function playClickSound(pitchFactor = 1) {
  playClickDownSound(pitchFactor);
}

/**
 * Deep, satisfying mechanical spacebar "THOCK" (stabilizer wire tick + hollow cavity bottom-out)
 */
export function playSpacebarSound() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem("sound_muted") === "true") return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    const now = ctx.currentTime;

    // --- 1. Deep Hollow Resonant Body (Low-end spacebar cavity) ---
    const bodyOsc = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    const bodyFilter = ctx.createBiquadFilter();

    bodyFilter.type = "lowpass";
    bodyFilter.frequency.setValueAtTime(950, now);

    bodyOsc.type = "triangle";
    bodyOsc.frequency.setValueAtTime(320, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(110, now + 0.035);

    bodyGain.gain.setValueAtTime(0.32, now);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);

    bodyOsc.connect(bodyFilter);
    bodyFilter.connect(bodyGain);
    bodyGain.connect(ctx.destination);

    bodyOsc.start(now);
    bodyOsc.stop(now + 0.04);

    // --- 2. Stabilizer Wire Metallic Tick ---
    const wireOsc = ctx.createOscillator();
    const wireGain = ctx.createGain();
    const wireFilter = ctx.createBiquadFilter();

    wireFilter.type = "bandpass";
    wireFilter.frequency.setValueAtTime(1650, now);
    wireFilter.Q.setValueAtTime(3.5, now);

    wireOsc.type = "triangle";
    wireOsc.frequency.setValueAtTime(1800, now);
    wireOsc.frequency.exponentialRampToValueAtTime(550, now + 0.012);

    wireGain.gain.setValueAtTime(0.22, now);
    wireGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.013);

    wireOsc.connect(wireFilter);
    wireFilter.connect(wireGain);
    wireGain.connect(ctx.destination);

    wireOsc.start(now);
    wireOsc.stop(now + 0.015);

    // --- 3. Heavy Bottom-out Texture ---
    const bufferSize = Math.floor(ctx.sampleRate * 0.01);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.setValueAtTime(1800, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.01);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    whiteNoise.start(now);
  } catch (e) {}
}

/**
 * Snappy, distinct mechanical backspace delete "PLINK / TICK"
 */
export function playBackspaceSound() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem("sound_muted") === "true") return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    const now = ctx.currentTime;

    // --- 1. Sharp High-Frequency Reverse Snap ---
    const snapOsc = ctx.createOscillator();
    const snapGain = ctx.createGain();
    const snapFilter = ctx.createBiquadFilter();

    snapFilter.type = "bandpass";
    snapFilter.frequency.setValueAtTime(3200, now);
    snapFilter.Q.setValueAtTime(4.0, now);

    snapOsc.type = "triangle";
    snapOsc.frequency.setValueAtTime(1600, now);
    snapOsc.frequency.exponentialRampToValueAtTime(450, now + 0.016);

    snapGain.gain.setValueAtTime(0.28, now);
    snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

    snapOsc.connect(snapFilter);
    snapFilter.connect(snapGain);
    snapGain.connect(ctx.destination);

    snapOsc.start(now);
    snapOsc.stop(now + 0.02);

    // --- 2. Light Hollow Key Return Pop ---
    const popOsc = ctx.createOscillator();
    const popGain = ctx.createGain();

    popOsc.type = "sine";
    popOsc.frequency.setValueAtTime(980, now);
    popOsc.frequency.exponentialRampToValueAtTime(350, now + 0.014);

    popGain.gain.setValueAtTime(0.18, now);
    popGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

    popOsc.connect(popGain);
    popGain.connect(ctx.destination);

    popOsc.start(now);
    popOsc.stop(now + 0.016);
  } catch (e) {}
}

/**
 * Mechanical Keyboard Clack for interactive typing
 */
export function playKeyClackSound(key = "") {
  if (key === " " || key === "Space" || key === "Spacebar") {
    playSpacebarSound();
    return;
  }
  if (key === "backspace" || key === "Backspace" || key === "Delete") {
    playBackspaceSound();
    return;
  }

  if (typeof window === "undefined") return;
  if (localStorage.getItem("sound_muted") === "true") return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    const now = ctx.currentTime;
    const baseFreq = 840 + Math.random() * 180;

    // Click transient
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2800, now);
    filter.Q.setValueAtTime(3.2, now);

    osc.type = "triangle";
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.018);

    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.019);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.02);

    // Micro mechanical texture
    const bufferSize = Math.floor(ctx.sampleRate * 0.005);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "highpass";
    noiseFilter.frequency.setValueAtTime(3600, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.12, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.005);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    whiteNoise.start(now);
  } catch (e) {}
}

export function playTypingErrorSound() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem("sound_muted") === "true") return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(95, now + 0.045);

    gain.gain.setValueAtTime(0.13, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.045);
  } catch (e) {}
}

export function playUnmuteSound() {
  if (typeof window === "undefined") return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(700, now);
    osc.frequency.setValueAtTime(1050, now + 0.035);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.07);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch (e) {}
}

export function playMuteSound() {
  if (typeof window === "undefined") return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(850, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.035);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.035);
  } catch (e) {}
}
