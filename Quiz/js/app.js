/* ============================================================
   The Big Quiz Show — app logic
   ============================================================ */

(function () {
  'use strict';

  const $ = function (id) { return document.getElementById(id); };
  const BEST_KEY = 'bq_best_v1';
  const WHATIF_KEY = 'bq_whatif_v1';

  const WHATIF_THEME_DEFS = {
    discipline: {
      accent: '#7c5cff', accentDark: '#5133d6', soft: '#efeaff',
      floaters: ['💭', '❓', '💡', '🎒', '📚', '✨', '🏫', '🤔']
    },
    waste: {
      accent: '#00b894', accentDark: '#00805f', soft: '#e2fbf4',
      floaters: ['💭', '❓', '💡', '♻️', '🍃', '🌍', '🗑️', '✨']
    },
    hygiene: {
      accent: '#0984e3', accentDark: '#0660a8', soft: '#e3f2ff',
      floaters: ['💭', '❓', '💡', '🧼', '💧', '🧴', '✨', '🫧']
    }
  };

  const PRAISE = ['Woohoo! 🎉', 'Brain power! 🧠✨', 'Nailed it! 🎯', 'High five! 🙌', 'You are on fire! 🔥', 'Superb! 🚀'];
  const OOPS = ['Good try! Now you know 💡', 'Oops — let\'s learn it together 🤝', 'Nearly! Read the tip 👉', 'No worries, mistakes help us grow 🌱'];
  const CHEERS = ['You\'ve got this! 💪', 'Read carefully, superstar ⭐', 'Think, then tap! 🧠', 'Let\'s gooo! 🚀', 'Take your time — you\'re doing great 🌈'];
  const GOOD_TITLES = ['Yes! ⭐', 'Brilliant! 🌟', 'You got it! 🎯', 'That\'s right! 🎉', 'Super! 🚀'];

  const TYPE_LABELS = {
    mc: 'Multiple choice',
    tf: 'True or false',
    discuss: 'What would you do?',
    fill: 'Fill in the blanks',
    match: 'Match the pairs',
    odd: 'Odd one out'
  };

  const PAIR_COLORS = ['#ff5f8d', '#7c5cff', '#00b894', '#f0a500', '#0984e3', '#e17055'];

  const DEFAULT_THEME = {
    accent: '#7c5cff',
    accentDark: '#5133d6',
    soft: '#efeaff',
    floaters: ['🎒', '♻️', '🧼', '🏆', '⭐', '📚', '🌱', '🧴', '✏️', '🌍', '🎈', '🍎']
  };

  let state = null;
  let modalAction = null;
  const wi = { order: [], list: [], i: 0, filter: 'all', lastTheme: null };

  /* ---------------- helpers ---------------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pick(arr) { return arr[(Math.random() * arr.length) | 0]; }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function getBest() {
    try { return JSON.parse(localStorage.getItem(BEST_KEY) || '{}') || {}; }
    catch (e) { return {}; }
  }
  function saveBest(id, score, total) {
    try {
      const best = getBest();
      if (!best[id] || score > best[id].score) {
        best[id] = { score: score, total: total };
        localStorage.setItem(BEST_KEY, JSON.stringify(best));
      }
    } catch (e) { /* storage may be blocked — no problem */ }
  }

  function getExplored() {
    try {
      const list = JSON.parse(localStorage.getItem(WHATIF_KEY) || '[]');
      return Array.isArray(list) ? list : [];
    } catch (e) { return []; }
  }
  function markExplored(id) {
    const list = getExplored();
    if (list.indexOf(id) !== -1) return false;
    list.push(id);
    try { localStorage.setItem(WHATIF_KEY, JSON.stringify(list)); } catch (e) { /* ignore */ }
    return true;
  }

  /* Build a fresh, shuffled question set for every session. */
  function buildSessionSteps(def) {
    const steps = JSON.parse(JSON.stringify(def.steps));

    function prep(step) {
      if (step.type === 'mc' || step.type === 'odd') {
        const right = step.options[step.a];
        step.options = shuffle(step.options);
        step.a = step.options.indexOf(right);
      } else if (step.type === 'match') {
        step.pairs = shuffle(step.pairs);
      } else if (step.type === 'fill') {
        step.items = shuffle(step.items);
        step.bank = shuffle(step.bank);
      }
      return step;
    }

    /* Keep the two structured Mixed Challenge parts first, then shuffle
       the odd-one-out questions. Theme quizzes shuffle every question. */
    if (def.id === 'mixed') {
      return steps.slice(0, 2).map(prep).concat(shuffle(steps.slice(2)).map(prep));
    }
    return shuffle(steps).map(prep);
  }

  /* ---------------- background / theme ---------------- */
  function renderFloaters(pool) {
    const wrap = $('floaters');
    wrap.innerHTML = '';
    const count = window.innerWidth < 600 ? 9 : 15;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.textContent = pool[i % pool.length];
      s.style.left = (Math.random() * 96) + '%';
      s.style.fontSize = (16 + Math.random() * 24) + 'px';
      s.style.animationDuration = (14 + Math.random() * 15) + 's';
      s.style.animationDelay = (-Math.random() * 24) + 's';
      wrap.appendChild(s);
    }
  }

  function setTheme(def) {
    const r = document.documentElement.style;
    r.setProperty('--accent', def.accent);
    r.setProperty('--accent-dark', def.accentDark);
    r.setProperty('--soft', def.soft);
    renderFloaters(def.floaters || DEFAULT_THEME.floaters);
  }

  /* ---------------- screens ---------------- */
  function show(name) {
    ['home', 'quiz', 'whatif', 'results'].forEach(function (id) { $(id).hidden = id !== name; });
    $('homeBtn').hidden = name === 'home';
    $('scorePill').hidden = name !== 'quiz';
    document.body.dataset.screen = name;
    document.body.classList.toggle('results-mode', name === 'results');
    document.body.classList.toggle('whatif-mode', name === 'whatif');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------------- home ---------------- */
  function renderHome() {
    const best = getBest();
    $('themeGrid').innerHTML = THEMES.concat([MIXED]).map(function (def) {
      const b = best[def.id];
      const bestTag = b ? '<span class="tc-best">⭐ ' + b.score + '/' + b.total + '</span>' : '';
      return '' +
        '<button class="theme-card' + (def.id === 'mixed' ? ' mixed' : '') + '" data-theme="' + def.id + '"' +
        ' style="--c:' + def.accent + ';--cd:' + def.accentDark + ';--cs:' + def.soft + '">' +
        bestTag +
        '<span class="tc-emoji" aria-hidden="true">' + def.emoji + '</span>' +
        '<span class="tc-name">' + esc(def.name) + '</span>' +
        '<span class="tc-desc">' + esc(def.desc) + '</span>' +
        '<span class="tc-meta">' + (def.id === 'mixed' ? '20 marks · big finale' : '20 questions · 18 marks') + '</span>' +
        '</button>';
    }).join('');

    $('themeGrid').querySelectorAll('.theme-card').forEach(function (btn) {
      btn.addEventListener('click', function () {
        Sound.sfx('click');
        startQuiz(btn.dataset.theme);
      });
    });

    const promo = $('wiPromoCount');
    if (promo) {
      const seen = getExplored().length;
      promo.textContent = seen
        ? '⭐ ' + seen + ' of 30 cards explored'
        : '30 situation cards';
    }

    renderReport();
  }

  function renderReport() {
    const best = getBest();
    const explored = getExplored();
    const order = ['discipline', 'waste', 'hygiene', 'mixed'];
    const played = order.filter(function (id) { return best[id]; });
    const totalScore = played.reduce(function (s, id) { return s + best[id].score; }, 0);

    const chips = order.map(function (id) {
      const q = ALL_QUIZZES[id];
      const b = best[id];
      return '<span class="report-chip' + (b ? ' done' : '') + '">' + q.emoji + ' ' + esc(q.name) +
        (b ? ' · ' + b.score + '/' + b.total : ' · not played yet') + '</span>';
    }).join('');

    let totalLine;
    if (played.length === 4) {
      const band = totalScore >= 66 ? 'Eco-Hygiene Hero 🏆'
        : totalScore >= 52 ? 'Great Learner 🌟'
        : totalScore >= 37 ? 'Getting there 🌱' : 'Keep trying 💪';
      totalLine = 'All four done! Total: <b>' + totalScore + ' / 74</b> — ' + band;
    } else {
      totalLine = 'Played <b>' + played.length + ' of 4</b>. Finish all four to unlock your total out of 74!';
    }

    $('report').innerHTML =
      '<h3>🏅 My Report Card</h3>' +
      '<p class="report-line">Your best scores and explored cards are saved on this device.</p>' +
      '<div class="report-chips">' + chips + '</div>' +
      '<div class="report-whatif">💭 <b>What If...?</b> cards explored: <b>' + explored.length + ' / 30</b>' +
        (explored.length === WHATIF_CARDS.length ? ' — all done! 🌟' : '') + '</div>' +
      '<div class="report-total">' + totalLine +
        (played.length || explored.length ? '<button class="reset-btn" id="resetBtn" type="button">🧹 Reset my progress</button>' : '') +
      '</div>';

    const resetBtn = $('resetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        openModal('Reset your progress?', 'This clears your saved best scores and explored What If cards on this device. You can play again to set new ones.', function () {
          try {
            localStorage.removeItem(BEST_KEY);
            localStorage.removeItem(WHATIF_KEY);
          } catch (e) {}
          renderHome();
        });
      });
    }
  }

  /* ---------------- quiz flow ---------------- */
  function startQuiz(id) {
    const def = ALL_QUIZZES[id];
    if (!def) return;
    Speech.stop();
    state = {
      def: def,
      steps: buildSessionSteps(def),
      idx: 0,
      earned: 0,
      total: def.marks,
      answered: false
    };
    wi.lastTheme = null;
    setTheme(def);
    Sound.setMood(def.id);
    show('quiz');
    renderStep();
    Sound.ensure();
    if (Sound.musicOn && !Sound.playing) Sound.startMusic();
  }

  function updateScore() {
    $('scoreNow').textContent = state.earned;
    $('scoreTotal').textContent = state.total;
    $('quizScore').textContent = state.earned;
  }

  function award(n) {
    if (!n) return;
    state.earned += n;
    updateScore();
    const pill = $('scorePill');
    pill.classList.remove('pop');
    void pill.offsetWidth;
    pill.classList.add('pop');
  }

  function setBubble(msg) {
    const b = $('bubble');
    b.textContent = msg;
    b.classList.remove('pop');
    void b.offsetWidth;
    b.classList.add('pop');
  }

  function bounceMascot() {
    const m = $('mascot');
    m.classList.remove('happy');
    void m.offsetWidth;
    m.classList.add('happy');
  }

  function showFeedback(ok, title, text) {
    const fb = $('feedback');
    fb.className = 'feedback ' + (ok ? 'good' : 'oops');
    fb.innerHTML = '<span class="fb-emoji" aria-hidden="true">' + (ok ? '🎉' : '💡') + '</span>' +
      '<div><strong>' + esc(title) + '</strong><p>' + esc(text) + '</p></div>';
    fb.hidden = false;
  }

  function readyNext(pulse) {
    const nb = $('nextBtn');
    nb.disabled = false;
    if (pulse !== false) nb.classList.add('ready');
    requestAnimationFrame(function () {
      const nb = $('nextBtn');
      if (nb.getBoundingClientRect().bottom > window.innerHeight - 6) {
        nb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  function updateProgress() {
    const pct = state.steps.length > 1 ? (state.idx / (state.steps.length - 1)) * 100 : 0;
    const pos = Math.max(1.5, Math.min(98.5, pct));
    $('progFill').style.width = pct + '%';
    $('rocket').style.left = pos + '%';
    $('progLabel').textContent = state.def.id === 'mixed'
      ? 'Step ' + (state.idx + 1) + ' of ' + state.steps.length
      : 'Question ' + (state.idx + 1) + ' of ' + state.steps.length;
  }

  function renderStep() {
    const step = state.steps[state.idx];
    state.answered = false;

    const card = $('qcard');
    card.classList.remove('enter');
    card.classList.remove('flash-good');
    void card.offsetWidth;
    card.classList.add('enter');

    $('qtype').textContent = TYPE_LABELS[step.type] || 'Question';
    $('qnum').textContent = (state.idx + 1) + ' / ' + state.steps.length;
    $('qtext').textContent = step.title || step.q || '';
    $('qbody').innerHTML = '';
    $('feedback').hidden = true;
    $('feedback').className = 'feedback';
    $('nextBtn').disabled = true;
    $('nextBtn').classList.remove('ready');
    $('nextBtn').textContent = state.idx === state.steps.length - 1 ? 'Finish 🏁' : 'Next ➜';
    $('readBtn').textContent = '🔈 Read aloud';

    updateProgress();
    updateScore();
    setBubble(pick(CHEERS));

    if (step.type === 'mc' || step.type === 'tf' || step.type === 'odd') renderChoice(step);
    else if (step.type === 'discuss') renderDiscuss(step);
    else if (step.type === 'fill') renderFill(step);
    else if (step.type === 'match') renderMatch(step);
  }

  /* ---------------- multiple choice / true-false / odd one out ---------------- */
  function renderChoice(step) {
    const isTF = step.type === 'tf';
    const opts = isTF ? ['True', 'False'] : step.options;
    const correctIndex = isTF ? (step.a ? 0 : 1) : step.a;
    const body = $('qbody');

    body.innerHTML = '<div class="options' + (isTF ? ' tf' : '') + '" role="group" aria-label="Answer options">' +
      opts.map(function (o, i) {
        const badge = isTF ? (i === 0 ? '✅' : '❌') : 'ABCD'[i];
        return '<button class="opt" type="button" data-i="' + i + '">' +
          '<span class="badge" aria-hidden="true">' + badge + '</span>' +
          '<span class="txt">' + esc(o) + '</span>' +
          '<span class="mark" aria-hidden="true"></span></button>';
      }).join('') + '</div>';

    body.querySelectorAll('.opt').forEach(function (btn, i) {
      btn.addEventListener('click', function () { chooseOption(step, i, correctIndex, btn); });
    });
  }

  function chooseOption(step, i, correctIndex, btn) {
    if (state.answered) return;
    state.answered = true;

    const ok = i === correctIndex;
    const all = Array.prototype.slice.call(btn.parentElement.querySelectorAll('.opt'));
    all.forEach(function (b, bi) {
      b.disabled = true;
      if (bi === correctIndex) b.classList.add('correct');
    });
    if (!ok) btn.classList.add('wrong');

    if (ok) {
      award(1);
      Sound.sfx('correct');
      burstAt(btn, 55);
      bounceMascot();
      setBubble(pick(PRAISE));
      const card = $('qcard');
      card.classList.remove('flash-good');
      void card.offsetWidth;
      card.classList.add('flash-good');
      showFeedback(true, pick(GOOD_TITLES), step.explain);
    } else {
      Sound.sfx('wrong');
      setBubble(pick(OOPS));
      showFeedback(false, 'Not quite — but now you know! 💡', step.explain);
    }
    readyNext();
  }

  /* ---------------- discussion ---------------- */
  function renderDiscuss(step) {
    const body = $('qbody');
    body.innerHTML =
      '<div class="discuss-box">' +
        '<p class="hint">💭 There is no wrong answer here. Think about it, say your idea out loud, or type it below.</p>' +
        '<textarea class="idea" maxlength="400" placeholder="My idea is... (optional)"></textarea>' +
        '<button class="check-btn" id="sampleBtn" type="button">🪄 Show a sample answer</button>' +
        '<div class="sample" id="sample" hidden>💡 ' + esc(step.sample) + '</div>' +
      '</div>';

    $('sampleBtn').addEventListener('click', function () {
      const s = $('sample');
      s.hidden = !s.hidden;
      this.textContent = s.hidden ? '🪄 Show a sample answer' : '🙈 Hide sample answer';
      Sound.sfx('pop');
    });

    state.answered = true;
    readyNext(false);
  }

  /* ---------------- fill in the blanks ---------------- */
  function blankify(text, i) {
    const parts = String(text).split('___');
    let out = '';
    parts.forEach(function (p, idx) {
      out += esc(p);
      if (idx < parts.length - 1) {
        out += '<button class="blank" type="button" data-b="' + i + '" aria-label="Blank ' + (i + 1) + '">?</button>';
      }
    });
    return out;
  }

  function renderFill(step) {
    const answers = new Array(step.items.length).fill(null);
    let active = 0;
    const body = $('qbody');

    body.innerHTML =
      '<p class="hint">Tap a word from the word bank, then tap the blank where it belongs. Tap a filled blank to take the word back.</p>' +
      '<div class="bank" id="bank" aria-label="Word bank">' +
        step.bank.map(function (w) {
          return '<button class="word" type="button" data-w="' + esc(w) + '">' + esc(w) + '</button>';
        }).join('') +
      '</div>' +
      '<ol class="fill-list">' +
        step.items.map(function (it, i) {
          return '<li data-i="' + i + '"><span class="fill-line">' + blankify(it.text, i) + '</span></li>';
        }).join('') +
      '</ol>' +
      '<button class="check-btn" id="checkFill" type="button">Check my answers ✅</button>';

    function paint() {
      const used = answers.filter(Boolean);
      body.querySelectorAll('.word').forEach(function (w) {
        const isUsed = used.indexOf(w.dataset.w) !== -1;
        w.classList.toggle('used', isUsed);
        w.disabled = isUsed || state.answered;
      });
      body.querySelectorAll('.blank').forEach(function (b) {
        const i = +b.dataset.b;
        b.textContent = answers[i] || '?';
        b.classList.toggle('filled', !!answers[i]);
        b.classList.toggle('active', active === i && !state.answered);
        b.disabled = state.answered;
      });
    }

    body.querySelectorAll('.word').forEach(function (w) {
      w.addEventListener('click', function () {
        if (state.answered) return;
        let i = active;
        if (i === null || answers[i]) i = answers.indexOf(null);
        if (i === -1) return;
        answers[i] = w.dataset.w;
        active = answers.indexOf(null);
        if (active === -1) active = null;
        Sound.sfx('click');
        paint();
      });
    });

    body.querySelectorAll('.blank').forEach(function (b) {
      b.addEventListener('click', function () {
        if (state.answered) return;
        const i = +b.dataset.b;
        answers[i] = null;
        active = i;
        Sound.sfx('click');
        paint();
      });
    });

    $('checkFill').addEventListener('click', function () {
      if (state.answered) return;
      state.answered = true;
      let correct = 0;

      step.items.forEach(function (it, i) {
        const li = body.querySelector('li[data-i="' + i + '"]');
        const good = answers[i] === it.answer;
        li.classList.add(good ? 'good' : 'bad');
        if (good) {
          correct++;
        } else {
          const fix = document.createElement('span');
          fix.className = 'fix';
          fix.textContent = '→ ' + it.answer;
          li.querySelector('.fill-line').appendChild(fix);
        }
      });

      paint();
      this.disabled = true;
      this.textContent = 'Checked ✔';
      award(correct);

      const perfect = correct === step.items.length;
      if (perfect) {
        Sound.sfx('correct');
        Confetti.burst(window.innerWidth * 0.5, window.innerHeight * 0.3, 90);
        bounceMascot();
        setBubble('PERFECT! 🌟🌟');
      } else if (correct >= step.items.length / 2) {
        Sound.sfx('pop');
        setBubble('Great effort! 💪');
      } else {
        Sound.sfx('wrong');
        setBubble(pick(OOPS));
      }

      showFeedback(perfect, perfect ? 'Perfect! 🌟' : 'You got ' + correct + ' of ' + step.items.length + '! 💪',
        perfect ? 'Every blank is correct. Amazing work!'
          : 'The right words are shown next to the blanks. Read them once more and they will stick!');
      readyNext();
    });

    paint();
  }

  /* ---------------- matching ---------------- */
  function renderMatch(step) {
    const letters = 'ABCDEF';
    const rights = shuffle(step.pairs.map(function (p, i) { return { id: i, label: p.right }; }));
    rights.forEach(function (r, i) { r.letter = letters[i]; });

    const pairOf = {};
    let sel = null;
    const body = $('qbody');

    body.innerHTML =
      '<p class="hint">Tap an item on the left, then tap where it belongs on the right.</p>' +
      '<div class="match">' +
        '<div class="mcol"><h4>🗑️ The waste</h4>' +
          step.pairs.map(function (p, i) {
            return '<button class="m-item left" type="button" data-left="' + i + '">' +
              '<span class="num" aria-hidden="true">' + (i + 1) + '</span>' +
              '<span class="m-label">' + esc(p.left) + '</span>' +
              '<span class="tag" aria-hidden="true"></span></button>';
          }).join('') +
        '</div>' +
        '<div class="mcol"><h4>📍 Where it belongs</h4>' +
          rights.map(function (r) {
            return '<button class="m-item right" type="button" data-right="' + r.id + '">' +
              '<span class="letter" aria-hidden="true">' + r.letter + '</span>' +
              '<span class="m-label">' + esc(r.label) + '</span>' +
              '<span class="tag" aria-hidden="true"></span></button>';
          }).join('') +
        '</div>' +
      '</div>' +
      '<button class="check-btn" id="checkMatch" type="button">Check my matches ✅</button>';

    const lefts = Array.prototype.slice.call(body.querySelectorAll('.m-item.left'));
    const rts = Array.prototype.slice.call(body.querySelectorAll('.m-item.right'));

    function paint() {
      lefts.forEach(function (l, li) {
        const rid = pairOf[li];
        const has = rid !== undefined;
        l.classList.toggle('sel', sel === li && !state.answered);
        l.classList.toggle('paired', has);
        if (has) l.style.setProperty('--pc', PAIR_COLORS[li % PAIR_COLORS.length]);
        else l.style.removeProperty('--pc');
        l.querySelector('.tag').textContent = has ? rights.filter(function (r) { return r.id === rid; })[0].letter : '';
      });
      rts.forEach(function (r) {
        const rid = +r.dataset.right;
        let owner = null;
        Object.keys(pairOf).forEach(function (k) {
          if (pairOf[k] === rid) owner = +k;
        });
        r.classList.toggle('paired', owner !== null);
        if (owner !== null) r.style.setProperty('--pc', PAIR_COLORS[owner % PAIR_COLORS.length]);
        else r.style.removeProperty('--pc');
        r.querySelector('.tag').textContent = owner !== null ? String(owner + 1) : '';
      });
    }

    lefts.forEach(function (l) {
      l.addEventListener('click', function () {
        if (state.answered) return;
        const li = +l.dataset.left;
        sel = (sel === li) ? null : li;
        Sound.sfx('click');
        paint();
      });
    });

    rts.forEach(function (r) {
      r.addEventListener('click', function () {
        if (state.answered) return;
        const rid = +r.dataset.right;
        let owner = null;
        Object.keys(pairOf).forEach(function (k) { if (pairOf[k] === rid) owner = +k; });

        if (owner !== null) {
          delete pairOf[owner];
          paint();
          Sound.sfx('click');
          return;
        }
        if (sel === null) {
          setBubble('Pick an item on the left first! 👈');
          Sound.sfx('pop');
          return;
        }
        pairOf[sel] = rid;
        sel = null;
        Sound.sfx('click');
        paint();
      });
    });

    $('checkMatch').addEventListener('click', function () {
      if (state.answered) return;
      state.answered = true;
      sel = null;

      let correct = 0;
      lefts.forEach(function (l, li) {
        const ok = pairOf[li] === li;
        l.classList.add(ok ? 'good' : 'bad');
        if (ok) {
          correct++;
        } else {
          const fix = document.createElement('span');
          fix.className = 'fix';
          fix.textContent = '→ ' + step.pairs[li].right;
          l.appendChild(fix);
        }
        l.disabled = true;
      });
      rts.forEach(function (r) { r.disabled = true; });

      paint();
      this.disabled = true;
      this.textContent = 'Checked ✔';
      award(correct);

      const perfect = correct === step.pairs.length;
      if (perfect) {
        Sound.sfx('correct');
        Confetti.burst(window.innerWidth * 0.5, window.innerHeight * 0.3, 90);
        bounceMascot();
        setBubble('PERFECT MATCH! 🎉');
      } else if (correct > 0) {
        Sound.sfx('pop');
        setBubble('Good job — check the fixes! 💡');
      } else {
        Sound.sfx('wrong');
        setBubble(pick(OOPS));
      }

      showFeedback(perfect, perfect ? 'Perfect match! 🌟' : 'You matched ' + correct + ' of ' + step.pairs.length + '! 💪',
        perfect ? 'Every piece of waste found its right home. Earth says thank you! 🌍'
          : 'The correct pair is shown next to any item you missed. Try saying them out loud!');
      readyNext();
    });

    paint();
  }

  /* ---------------- confetti helper ---------------- */
  function burstAt(el, count) {
    const r = el.getBoundingClientRect();
    Confetti.burst(r.left + r.width / 2, r.top + r.height / 2, count || 45);
  }

  /* ---------------- results ---------------- */
  function finish() {
    Speech.stop();
    const earned = state.earned;
    const total = state.total;
    const pct = total ? earned / total : 0;
    const stars = pct >= 0.89 ? 3 : pct >= 0.66 ? 2 : pct >= 0.5 ? 1 : 0;

    saveBest(state.def.id, earned, total);

    const info = [
      { t: 'Keep going!', e: '🌱', m: 'Every try makes you smarter. Read the answers and play again — you will improve fast!' },
      { t: 'Nice effort!', e: '💪', m: 'You are getting there! A little more practice and you will zoom ahead.' },
      { t: 'Great job!', e: '🌟', m: 'Super work! You know a lot about this theme. Can you reach champion level?' },
      { t: 'Quiz Champion!', e: '🏆', m: 'Fantastic! You are a superstar. Try another theme and collect all the stars!' }
    ][stars];

    $('trophy').textContent = info.e;
    $('resTitle').textContent = info.t;
    $('resStars').innerHTML = [0, 1, 2].map(function (i) {
      return '<span class="' + (i < stars ? 'on' : '') + '" style="--sd:' + (i * 0.18) + 's">⭐</span>';
    }).join('');
    $('resScore').textContent = earned;
    $('resTotal').textContent = total;
    $('resMsg').textContent = info.m;

    Sound.setMood('results');
    show('results');
    renderHome();

    Sound.sfx('win');
    if (stars > 0) {
      Confetti.burst(window.innerWidth * 0.5, window.innerHeight * 0.32, 80);
      setTimeout(function () { Confetti.rain(); }, 700);
    }
  }

  function goHome() {
    Speech.stop();
    state = null;
    wi.lastTheme = null;
    setTheme(DEFAULT_THEME);
    Sound.setMood('home');
    show('home');
    renderHome();
  }

  /* ---------------- what if cards ---------------- */
  function setWhatIfTheme(themeId) {
    if (wi.lastTheme === themeId) return;
    const def = WHATIF_THEME_DEFS[themeId] || WHATIF_THEME_DEFS.discipline;
    setTheme(def);
    wi.lastTheme = themeId;
  }

  function applyWiFilter(filter) {
    wi.filter = filter;
    wi.list = filter === 'all'
      ? wi.order.slice()
      : wi.order.filter(function (c) { return c.theme === filter; });
    if (!wi.list.length) {
      wi.filter = 'all';
      wi.list = wi.order.slice();
    }
    const filters = document.querySelectorAll('#wiFilters .wi-filter');
    Array.prototype.forEach.call(filters, function (b) {
      b.classList.toggle('on', b.dataset.f === wi.filter);
    });
    $('wiSub').textContent = wi.filter === 'all'
      ? 'Stop · Think · Choose'
      : WHATIF_THEMES[wi.filter].emoji + ' ' + WHATIF_THEMES[wi.filter].name;
  }

  function renderWhatIf() {
    if (!wi.list.length) return;
    Speech.stop();

    const card = wi.list[wi.i];
    const type = WHATIF_TYPES[card.type] || WHATIF_TYPES.dilemma;
    const theme = WHATIF_THEMES[card.theme] || WHATIF_THEMES.discipline;
    const firstTime = markExplored(card.id);

    setWhatIfTheme(card.theme);

    const el = $('wiCard');
    el.className = 'wi-card';
    void el.offsetWidth;
    el.classList.add('enter');

    el.innerHTML =
      '<div class="wi-head">' +
        '<span class="wi-theme-chip">' + theme.emoji + ' ' + esc(theme.name) + '</span>' +
        '<span class="wi-type ' + type.className + '">' + type.emoji + ' ' + esc(type.label) + '</span>' +
      '</div>' +
      '<h3 class="wi-card-title">' + esc(card.title) + '<span class="wi-id">· #' + card.id + '</span></h3>' +
      '<p class="wi-situation">' + esc(card.situation) + '</p>' +
      '<div class="wi-ask">' +
        '<span class="wi-ask-label">What if...</span>' +
        '<p>' + esc(card.ask) + '</p>' +
      '</div>' +
      '<div class="wi-routine" aria-label="Stop, think, choose">' +
        '<span class="wi-step"><b><span>1</span>Stop</b><small>What is happening?</small></span>' +
        '<span class="wi-step"><b><span>2</span>Think</b><small>Who is affected?</small></span>' +
        '<span class="wi-step"><b><span>3</span>Choose</b><small>What is kind and fair?</small></span>' +
      '</div>' +
      '<button class="wi-reveal-btn" id="wiRevealBtn" type="button">💡 Reveal thinking prompts</button>' +
      '<div class="wi-reveal" id="wiRevealBox" hidden>' +
        '<h4>🔍 Think about this</h4>' +
        '<ul>' + card.think.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
        '<div class="wi-note">🌱 <b>Kind idea:</b> ' + esc(card.note) + '</div>' +
      '</div>' +
      '<div class="wi-card-foot">' +
        '<button class="read-btn" id="wiReadBtn" type="button">🔈 Read aloud</button>' +
        '<span class="wi-badge' + (firstTime ? '' : ' seen') + '">' +
          (firstTime ? '✨ New card' : '✔ Seen before') + '</span>' +
      '</div>';

    $('wiRevealBtn').addEventListener('click', function () {
      const box = $('wiRevealBox');
      box.hidden = !box.hidden;
      this.textContent = box.hidden ? '💡 Reveal thinking prompts' : '🙈 Hide thinking prompts';
      if (box.hidden) {
        Sound.sfx('click');
      } else {
        Sound.sfx('pop');
        Confetti.burst(window.innerWidth * 0.5, window.innerHeight * 0.32, 24);
      }
    });

    $('wiReadBtn').addEventListener('click', function () {
      let text = card.title + '. ' + card.situation + ' ' + card.ask;
      if (!$('wiRevealBox').hidden) {
        text += ' Think about this. ' + card.think.join(' ');
      }
      if (!Speech.say(text)) {
        const btn = this;
        btn.textContent = 'Read aloud not available 😅';
        setTimeout(function () { btn.textContent = '🔈 Read aloud'; }, 2000);
      }
    });

    $('wiPos').textContent = wi.i + 1;
    $('wiTotal').textContent = wi.list.length;
    const seen = getExplored().length;
    $('wiSeenTotal').textContent = '⭐ ' + seen + '/30';
  }

  function openWhatIf(filter) {
    Speech.stop();
    wi.order = shuffle(WHATIF_CARDS);
    wi.i = 0;
    wi.lastTheme = null;
    applyWiFilter(filter || 'all');
    show('whatif');
    Sound.setMood('whatif');
    renderWhatIf();
    Sound.sfx('pop');
  }

  function wiStep(delta) {
    if (!wi.list.length) return;
    wi.i = (wi.i + delta + wi.list.length) % wi.list.length;
    Sound.sfx('click');
    renderWhatIf();
  }

  function shuffleWhatIf() {
    wi.order = shuffle(WHATIF_CARDS);
    applyWiFilter(wi.filter);
    wi.i = 0;
    renderWhatIf();
    Sound.sfx('pop');
  }

  /* ---------------- modal ---------------- */
  function openModal(title, text, action) {
    $('modalTitle').textContent = title;
    $('modalText').textContent = text;
    $('modal').hidden = false;
    modalAction = action || null;
  }
  function closeModal() {
    $('modal').hidden = true;
    modalAction = null;
  }

  /* ---------------- sound buttons ---------------- */
  function updateSoundButtons() {
    const m = $('musicBtn');
    const s = $('sfxBtn');
    m.textContent = Sound.musicOn ? '🎵' : '🔇';
    m.classList.toggle('off', !Sound.musicOn);
    m.title = Sound.musicOn ? 'Music on' : 'Music off';
    s.textContent = Sound.sfxOn ? '🔊' : '🔈';
    s.classList.toggle('off', !Sound.sfxOn);
    s.title = Sound.sfxOn ? 'Sound effects on' : 'Sound effects off';
  }

  /* ---------------- read aloud ---------------- */
  function readCurrent() {
    if (!state) return;
    const step = state.steps[state.idx];
    let text = step.title || step.q || '';

    if (step.type === 'mc' || step.type === 'odd') {
      text += '. ' + step.options.map(function (o, i) { return 'ABCD'[i] + '. ' + o; }).join('. ');
    } else if (step.type === 'tf') {
      text += ' True or false?';
    } else if (step.type === 'fill') {
      text = step.title + '. Word bank: ' + step.bank.join(', ') + '. ' +
        step.items.map(function (it) { return it.text.replace('___', 'blank'); }).join(' ');
    } else if (step.type === 'match') {
      text = step.title + '. Match each waste item with the place where it belongs.';
    }

    const started = Speech.say(text);
    if (!started) setBubble('Read aloud is not available in this browser 😅');
  }

  /* ---------------- init ---------------- */
  function init() {
    /* animated hero title */
    const titleEl = $('bigTitle');
    const titleText = titleEl.textContent;
    titleEl.innerHTML = Array.from(titleText).map(function (ch, i) {
      return ch === ' '
        ? '<span class="gap">&nbsp;</span>'
        : '<span style="animation-delay:' + (i * 0.06).toFixed(2) + 's">' + esc(ch) + '</span>';
    }).join('');

    setTheme(DEFAULT_THEME);
    Sound.setMood('home');
    renderHome();
    updateSoundButtons();
    show('home');

    /* music can only begin after a user gesture */
    if (Sound.musicOn) $('musicBtn').classList.add('pulse');
    document.addEventListener('pointerdown', function () {
      $('musicBtn').classList.remove('pulse');
      Sound.ensure();
      if (Sound.musicOn) Sound.startMusic();
    }, { once: true });

    $('homeBtn').addEventListener('click', function () {
      if (!$('quiz').hidden) {
        openModal('Leave the quiz?', 'Your stars for this quiz will not be saved.', goHome);
      } else {
        goHome();
      }
    });
    $('homeBtn2').addEventListener('click', goHome);

    /* what if card deck */
    $('whatifBtn').addEventListener('click', function () {
      Sound.sfx('click');
      openWhatIf();
    });
    $('wiBack').addEventListener('click', function () {
      Sound.sfx('click');
      goHome();
    });
    $('wiShuffle').addEventListener('click', shuffleWhatIf);
    $('wiPrev').addEventListener('click', function () { wiStep(-1); });
    $('wiNext').addEventListener('click', function () { wiStep(1); });
    $('wiFilters').addEventListener('click', function (e) {
      const btn = e.target.closest ? e.target.closest('.wi-filter') : null;
      if (!btn) return;
      Sound.sfx('click');
      applyWiFilter(btn.dataset.f);
      wi.i = 0;
      renderWhatIf();
    });

    $('musicBtn').addEventListener('click', function () {
      Sound.musicOn = !Sound.musicOn;
      localStorage.setItem('bq_music', Sound.musicOn ? '1' : '0');
      if (Sound.musicOn) {
        Sound.ensure();
        Sound.startMusic();
      } else {
        Sound.stopMusic();
      }
      updateSoundButtons();
    });

    $('sfxBtn').addEventListener('click', function () {
      Sound.sfxOn = !Sound.sfxOn;
      localStorage.setItem('bq_sfx', Sound.sfxOn ? '1' : '0');
      if (Sound.sfxOn) Sound.sfx('pop');
      updateSoundButtons();
    });

    $('nextBtn').addEventListener('click', function () {
      if (!state) return;
      Sound.sfx('click');
      if (state.idx < state.steps.length - 1) {
        state.idx++;
        renderStep();
      } else {
        finish();
      }
    });

    $('quitBtn').addEventListener('click', function () {
      openModal('Leave the quiz?', 'Your stars for this quiz will not be saved.', goHome);
    });

    $('readBtn').addEventListener('click', readCurrent);

    $('modalNo').addEventListener('click', closeModal);
    $('modalYes').addEventListener('click', function () {
      const action = modalAction;
      closeModal();
      if (action) action();
    });
    $('modal').addEventListener('click', function (e) {
      if (e.target === $('modal')) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !$('modal').hidden) {
        closeModal();
        return;
      }
      if (!$('whatif').hidden && $('modal').hidden) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          wiStep(1);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          wiStep(-1);
        }
      }
    });

    $('againBtn').addEventListener('click', function () {
      if (state) startQuiz(state.def.id);
      else goHome();
    });
    $('nextThemeBtn').addEventListener('click', goHome);

    window.addEventListener('resize', function () {
      if (window.innerWidth < 600 && document.querySelectorAll('#floaters span').length > 9) {
        const pool = state
          ? state.def.floaters
          : (!$('whatif').hidden && wi.lastTheme)
            ? WHATIF_THEME_DEFS[wi.lastTheme].floaters
            : DEFAULT_THEME.floaters;
        renderFloaters(pool || DEFAULT_THEME.floaters);
      }
    });

    /* optional deep links: #waste, #hygiene, #mixed, #whatif, #whatif-waste */
    const hash = location.hash.replace(/^#\/?/, '');
    if (hash === 'whatif' || hash.indexOf('whatif-') === 0) {
      const filter = hash === 'whatif' ? 'all' : hash.replace('whatif-', '');
      openWhatIf(filter);
    } else if (hash && ALL_QUIZZES[hash]) {
      startQuiz(hash);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
