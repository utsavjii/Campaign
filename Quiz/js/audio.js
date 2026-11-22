/* ============================================================
   Sound: cheerful background music + game sound effects
   Everything is synthesised in the browser (no audio files).
   ============================================================ */

const Sound = {
  ctx: null,
  master: null,
  musicGain: null,
  sfxGain: null,
  musicOn: localStorage.getItem('bq_music') !== '0',
  sfxOn: localStorage.getItem('bq_sfx') !== '0',
  playing: false,
  timer: null,
  step: 0,
  nextTime: 0,
  stepDur: 60 / 108 / 2,          /* 108 BPM, eighth notes */

  ensure: function () {
    try {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        this.ctx = new AC();
        const comp = this.ctx.createDynamicsCompressor();
        comp.threshold.value = -18;
        comp.knee.value = 24;
        comp.ratio.value = 6;
        this.master = this.ctx.createGain();
        this.master.gain.value = 0.9;
        this.master.connect(comp);
        comp.connect(this.ctx.destination);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.value = 0.38;
        this.musicGain.connect(this.master);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.value = 0.5;
        this.sfxGain.connect(this.master);
      }
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return this.ctx;
    } catch (e) {
      return null;
    }
  },

  freq: function (midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  },

  tone: function (f, time, dur, type, vol, dest) {
    if (!this.ctx) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type || 'triangle';
    o.frequency.setValueAtTime(f, time);
    g.gain.setValueAtTime(0.0001, time);
    g.gain.linearRampToValueAtTime(vol, time + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    o.connect(g);
    g.connect(dest || this.sfxGain);
    o.start(time);
    o.stop(time + dur + 0.04);
  },

  /* short filtered noise click for sparkle / percussion */
  tick: function (time, vol) {
    if (!this.ctx) return;
    if (!this._noise) {
      const len = Math.floor(this.ctx.sampleRate * 0.2);
      const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      this._noise = buf;
    }
    const src = this.ctx.createBufferSource();
    src.buffer = this._noise;
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 6500;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, time);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.06);
    src.connect(hp); hp.connect(g); g.connect(this.musicGain);
    src.start(time);
    src.stop(time + 0.08);
  },

  sfx: function (name) {
    if (!this.sfxOn) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const t = ctx.currentTime + 0.01;
    if (name === 'click') {
      this.tone(880, t, 0.07, 'square', 0.05);
    } else if (name === 'hover') {
      this.tone(1200, t, 0.04, 'sine', 0.025);
    } else if (name === 'correct') {
      [0, 4, 7, 12].forEach((n, i) => {
        this.tone(this.freq(72 + n), t + i * 0.065, 0.22, 'triangle', 0.13);
      });
      this.tone(this.freq(84), t + 0.26, 0.3, 'sine', 0.06);
    } else if (name === 'wrong') {
      this.tone(this.freq(59), t, 0.16, 'sine', 0.16);
      this.tone(this.freq(52), t + 0.14, 0.24, 'sine', 0.14);
    } else if (name === 'win') {
      const seq = [60, 64, 67, 72, 76, 79, 84];
      seq.forEach((n, i) => {
        this.tone(this.freq(n), t + i * 0.11, 0.35, 'triangle', 0.12);
      });
      [60, 64, 67, 72].forEach((n) => {
        this.tone(this.freq(n), t + 0.8, 1.1, 'sine', 0.07);
      });
    } else if (name === 'pop') {
      this.tone(this.freq(79), t, 0.08, 'triangle', 0.08);
    }
  },

  startMusic: function () {
    if (!this.musicOn) return;
    const ctx = this.ensure();
    if (!ctx || this.playing) return;
    this.playing = true;
    this.step = 0;
    this.nextTime = ctx.currentTime + 0.15;
    this.schedule();
    this.timer = setInterval(() => this.schedule(), 60);
  },

  stopMusic: function () {
    this.playing = false;
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  },

  schedule: function () {
    if (!this.ctx || !this.playing) return;
    while (this.nextTime < this.ctx.currentTime + 0.4) {
      this.playStep(this.step, this.nextTime);
      this.nextTime += this.stepDur;
      this.step = (this.step + 1) % 64;
    }
  },

  playStep: function (stepNo, t) {
    const CHORDS = [
      [60, 64, 67],   /* C  */
      [57, 60, 64],   /* Am */
      [53, 57, 60],   /* F  */
      [55, 59, 62]    /* G  */
    ];
    const PATTERNS = [
      [0, 1, 2, 1, 3, 2, 1, 2],
      [1, 2, 3, 2, 1, 0, 1, 2],
      [2, 1, 0, 1, 2, 3, 2, 1],
      [0, 2, 1, 2, 3, 1, 2, 0]
    ];
    const bar = Math.floor(stepNo / 8) % 4;
    const within = stepNo % 8;
    const chord = CHORDS[bar];
    const lead = [chord[0] + 12, chord[1] + 12, chord[2] + 12, chord[0] + 24];
    const note = lead[PATTERNS[bar][within]];

    /* melody */
    this.tone(this.freq(note), t, 0.24, 'triangle', 0.085, this.musicGain);

    /* bass */
    if (within % 2 === 0) {
      this.tone(this.freq(chord[0] - 12), t, 0.32, 'sine', 0.14, this.musicGain);
    }
    if (within === 4) {
      this.tone(this.freq(chord[2] - 12), t, 0.24, 'sine', 0.07, this.musicGain);
    }

    /* light percussion */
    if (within % 2 === 1) this.tick(t, 0.07);
    if (within === 0 || within === 4) this.tick(t, 0.12);
  },

  duck: function (on) {
    if (!this.ctx || !this.musicGain) return;
    const now = this.ctx.currentTime;
    this.musicGain.gain.cancelScheduledValues(now);
    this.musicGain.gain.setTargetAtTime(on ? 0.07 : 0.38, now, 0.12);
  }
};

/* ============================================================
   Read-aloud helper
   ============================================================ */
const Speech = {
  say: function (text) {
    if (!('speechSynthesis' in window)) return false;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.94;
      u.pitch = 1.15;
      u.lang = 'en-IN';
      Sound.duck(true);
      u.onend = u.onerror = function () { Sound.duck(false); };
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) {
      Sound.duck(false);
      return false;
    }
  },
  stop: function () {
    if ('speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
    Sound.duck(false);
  }
};

/* ============================================================
   Confetti
   ============================================================ */
const Confetti = (function () {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  const COLORS = ['#ff5f8d', '#ffd23f', '#4ad6a4', '#5b8cff', '#b06bff', '#ff8a3d', '#42d7f5'];
  const EMOJI = ['⭐', '✨', '🎉', '💫'];
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let parts = [];
  let raf = null;
  let dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  function burst(x, y, count) {
    if (reduce) return;
    count = count || 55;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 9;
      parts.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3.5,
        g: 0.33,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.32,
        w: 6 + Math.random() * 8,
        h: 8 + Math.random() * 10,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        life: 1,
        decay: 0.006 + Math.random() * 0.009,
        emoji: Math.random() < 0.12 ? EMOJI[(Math.random() * EMOJI.length) | 0] : null
      });
    }
    if (!raf) raf = requestAnimationFrame(loop);
  }

  function rain() {
    if (reduce) return;
    for (let i = 0; i < 4; i++) {
      burst(40 + Math.random() * (window.innerWidth - 80), -20, 6);
    }
  }

  function loop() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      p.vy += p.g;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.995;
      p.rot += p.vr;
      p.life -= p.decay;
      ctx.save();
      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      if (p.emoji) {
        ctx.font = (p.w + 9) + 'px serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.emoji, 0, 0);
      } else {
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      ctx.restore();
    }
    parts = parts.filter(function (p) { return p.life > 0 && p.y < window.innerHeight + 100; });
    if (parts.length) {
      raf = requestAnimationFrame(loop);
    } else {
      raf = null;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  return { burst: burst, rain: rain };
})();
