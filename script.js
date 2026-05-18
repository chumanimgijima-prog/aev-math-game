const app = document.getElementById("app");
const scoreboard = document.getElementById("scoreboard");
const popup = document.getElementById("popup");
const popupContent = document.getElementById("popupContent");
const popupClose = document.getElementById("popupClose");

// Replace these placeholder paths with your final files later.
const assets = {
  homeImage: "assets/images/home-placeholder.png",
  quizImage: "assets/images/quiz-placeholder.png",
  countdownImage: "assets/images/countdown-placeholder.png",
  snakesImage: "assets/images/snakes-placeholder.png",
  music: "assets/sounds/game-show-music.wav",
  victory: "assets/sounds/victory-fanfare.wav",
  dong: "assets/sounds/dong.mp3"
};

const teamData = [
  { key: "green", color: "Green", hex: "#18a957" },
  { key: "purple", color: "Purple", hex: "#8b5cf6" }
];

const vocabWords = [
  { word: "Equals", symbol: "=" },
  { word: "Plus", symbol: "+" },
  { word: "Minus", symbol: "-" },
  { word: "Divided by", symbol: "÷" },
  { word: "Times", symbol: "×" },
  { word: "Point", symbol: "." },
  { word: "Percent", symbol: "%" }
];

const sentenceExamples = [
  { label: "Plus", parts: ["__", "+", "__", "=", "__"], values: ["5", "5", "10"], spoken: "Five plus five equals ten." },
  { label: "Plus", parts: ["__", "+", "__", "=", "__"], values: ["10", "20", "30"], spoken: "Ten plus twenty equals thirty." },
  { label: "Plus", parts: ["__", "+", "__", "=", "__"], values: ["50", "50", "100"], spoken: "Fifty plus fifty equals one hundred." },
  { label: "Minus", parts: ["__", "-", "__", "=", "__"], values: ["10", "5", "5"], spoken: "Ten minus five equals five." },
  { label: "Minus", parts: ["__", "-", "__", "=", "__"], values: ["20", "10", "10"], spoken: "Twenty minus ten equals ten." },
  { label: "Minus", parts: ["__", "-", "__", "=", "__"], values: ["100", "50", "50"], spoken: "One hundred minus fifty equals fifty." },
  { label: "Times", parts: ["__", "×", "__", "=", "__"], values: ["2", "5", "10"], spoken: "Two times five equals ten." },
  { label: "Times", parts: ["__", "×", "__", "=", "__"], values: ["5", "5", "25"], spoken: "Five times five equals twenty-five." },
  { label: "Times", parts: ["__", "×", "__", "=", "__"], values: ["10", "10", "100"], spoken: "Ten times ten equals one hundred." },
  { label: "Divided by", parts: ["__", "÷", "__", "=", "__"], values: ["10", "2", "5"], spoken: "Ten divided by two equals five." },
  { label: "Divided by", parts: ["__", "÷", "__", "=", "__"], values: ["20", "5", "4"], spoken: "Twenty divided by five equals four." },
  { label: "Divided by", parts: ["__", "÷", "__", "=", "__"], values: ["100", "10", "10"], spoken: "One hundred divided by ten equals ten." },
  { label: "Point", parts: ["__", "+", "__", "=", "__"], values: ["7.5", "2.5", "10"], spoken: "Seven point five plus two point five equals ten." },
  { label: "Point", parts: ["__", "-", "__", "=", "__"], values: ["8.5", "4", "4.5"], spoken: "Eight point five minus four equals four point five." },
  { label: "Point", parts: ["__", "+", "__", "=", "__"], values: ["6.5", "3.5", "10"], spoken: "Six point five plus three point five equals ten." },
  { label: "Percent", parts: ["__", "is", "__", "of", "__"], values: ["25", "25%", "100"], spoken: "Twenty-five is twenty-five percent of one hundred." },
  { label: "Percent", parts: ["__", "is", "__", "of", "__"], values: ["50", "50%", "100"], spoken: "Fifty is fifty percent of one hundred." },
  { label: "Percent", parts: ["__", "is", "__", "of", "__"], values: ["10", "10%", "100"], spoken: "Ten is ten percent of one hundred." }
];

const practiceRounds = [
  { prompt: "8 + 7 = ?", wordPrompt: "Eight plus seven equals what?", answer: "15", answerLine: "8 + 7 = 15", spoken: "Eight plus seven equals fifteen." },
  { prompt: "20 - 9 = ?", wordPrompt: "Twenty minus nine equals what?", answer: "11", answerLine: "20 - 9 = 11", spoken: "Twenty minus nine equals eleven." },
  { prompt: "6 × 4 = ?", wordPrompt: "Six times four equals what?", answer: "24", answerLine: "6 × 4 = 24", spoken: "Six times four equals twenty-four." },
  { prompt: "36 ÷ 6 = ?", wordPrompt: "Thirty-six divided by six equals what?", answer: "6", answerLine: "36 ÷ 6 = 6", spoken: "Thirty-six divided by six equals six." },
  { prompt: "4.5 + 1.5 = ?", wordPrompt: "Four point five plus one point five equals what?", answer: "6", answerLine: "4.5 + 1.5 = 6", spoken: "Four point five plus one point five equals six." },
  { prompt: "9.5 - 2 = ?", wordPrompt: "Nine point five minus two equals what?", answer: "7.5", answerLine: "9.5 - 2 = 7.5", spoken: "Nine point five minus two equals seven point five." },
  { prompt: "25 is ___% of 100", wordPrompt: "Twenty-five is what percent of one hundred?", answer: "25%", answerLine: "25 is 25% of 100", spoken: "Twenty-five is twenty-five percent of one hundred." },
  { prompt: "12 + 8 = ?", wordPrompt: "Twelve plus eight equals what?", answer: "20", answerLine: "12 + 8 = 20", spoken: "Twelve plus eight equals twenty." }
];

const quizRounds = [
  {
    quick: [
      { prompt: "Write this symbol in words.", display: "+", answer: "Plus" },
      { prompt: "Write this symbol in words.", display: "=", answer: "Equals" }
    ],
    sentence: {
      display: "5 + 5 = 10",
      answer: "Five plus five equals ten."
    }
  },
  {
    quick: [
      { prompt: "Write this symbol in words.", display: "-", answer: "Minus" },
      { prompt: "Write this symbol in words.", display: "×", answer: "Times" }
    ],
    sentence: {
      display: "10 - 5 = 5",
      answer: "Ten minus five equals five."
    }
  },
  {
    quick: [
      { prompt: "Write this symbol in words.", display: "÷", answer: "Divided by" },
      { prompt: "Write this symbol in words.", display: ".", answer: "Point" }
    ],
    sentence: {
      display: "10 ÷ 2 = 5",
      answer: "Ten divided by two equals five."
    }
  },
  {
    quick: [
      { prompt: "Write this symbol in words.", display: "%", answer: "Percent" },
      { prompt: "Write this symbol in words.", display: "+", answer: "Plus" }
    ],
    sentence: {
      display: "25 is 25% of 100",
      answer: "Twenty-five is twenty-five percent of one hundred."
    }
  },
  {
    quick: [
      { prompt: "Write this symbol in words.", display: "=", answer: "Equals" },
      { prompt: "Write this symbol in words.", display: "-", answer: "Minus" }
    ],
    sentence: {
      display: "7.5 + 2.5 = 10",
      answer: "Seven point five plus two point five equals ten."
    }
  },
  {
    quick: [
      { prompt: "Write this symbol in words.", display: "×", answer: "Times" },
      { prompt: "Write this symbol in words.", display: "÷", answer: "Divided by" }
    ],
    sentence: {
      display: "50 + 50 = 100",
      answer: "Fifty plus fifty equals one hundred."
    }
  },
  {
    quick: [
      { prompt: "Write this symbol in words.", display: "%", answer: "Percent" },
      { prompt: "Answer.", display: "8 + 7 = ?", answer: "15" }
    ],
    sentence: {
      display: "20 ÷ 5 = 4",
      answer: "Twenty divided by five equals four."
    }
  },
  {
    quick: [
      { prompt: "Answer.", display: "20 - 9 = ?", answer: "11" },
      { prompt: "Write this symbol in words.", display: ".", answer: "Point" }
    ],
    sentence: {
      display: "8.5 - 4 = 4.5",
      answer: "Eight point five minus four equals four point five."
    }
  },
  {
    quick: [
      { prompt: "Answer.", display: "6 × 4 = ?", answer: "24" },
      { prompt: "Write this symbol in words.", display: "÷", answer: "Divided by" }
    ],
    sentence: {
      display: "10 × 10 = 100",
      answer: "Ten times ten equals one hundred."
    }
  },
  {
    quick: [
      { prompt: "Answer.", display: "36 ÷ 6 = ?", answer: "6" },
      { prompt: "Write this symbol in words.", display: "×", answer: "Times" }
    ],
    sentence: {
      display: "50 is 50% of 100",
      answer: "Fifty is fifty percent of one hundred."
    }
  },
  {
    quick: [
      { prompt: "Answer.", display: "4.5 + 1.5 = ?", answer: "6" },
      { prompt: "Write this symbol in words.", display: "-", answer: "Minus" }
    ],
    sentence: {
      display: "100 - 50 = 50",
      answer: "One hundred minus fifty equals fifty."
    }
  },
  {
    quick: [
      { prompt: "Answer.", display: "9.5 - 2 = ?", answer: "7.5" },
      { prompt: "Write this symbol in words.", display: "=", answer: "Equals" }
    ],
    sentence: {
      display: "6.5 + 3.5 = 10",
      answer: "Six point five plus three point five equals ten."
    }
  },
  {
    quick: [
      { prompt: "Answer.", display: "25 is ___% of 100", answer: "25%" },
      { prompt: "Write this symbol in words.", display: "+", answer: "Plus" }
    ],
    sentence: {
      display: "100 ÷ 10 = 10",
      answer: "One hundred divided by ten equals ten."
    }
  },
  {
    quick: [
      { prompt: "Countdown target.", display: "10 + 20 = ?", answer: "30" },
      { prompt: "Countdown target.", display: "40 × 2 = ?", answer: "80" }
    ],
    sentence: {
      display: "2 × 5 = 10",
      answer: "Two times five equals ten."
    }
  },
  {
    quick: [
      { prompt: "Countdown target.", display: "75 + 50 = ?", answer: "125" },
      { prompt: "Answer.", display: "50% of 80 = ?", answer: "40" }
    ],
    sentence: {
      display: "10 is 10% of 100",
      answer: "Ten is ten percent of one hundred."
    }
  },
  {
    quick: [
      { prompt: "Answer.", display: "12 × 5 = ?", answer: "60" },
      { prompt: "Answer.", display: "144 ÷ 12 = ?", answer: "12" }
    ],
    sentence: {
      display: "20 - 10 = 10",
      answer: "Twenty minus ten equals ten."
    }
  },
  {
    quick: [
      { prompt: "Answer.", display: "6.25 + 3.75 = ?", answer: "10" },
      { prompt: "Answer.", display: "75 is ___% of 100", answer: "75%" }
    ],
    sentence: {
      display: "10 + 20 = 30",
      answer: "Ten plus twenty equals thirty."
    }
  }
];

const countdownRounds = [
  { small: [2, 3, 4, 5], big: [10, 20], target: 30, teacherNotes: "10 + 20 = 30" },
  { small: [2, 4, 6, 8], big: [10, 50], target: 60, teacherNotes: "10 + 50 = 60" },
  { small: [2, 3, 5, 7], big: [20, 40], target: 80, teacherNotes: "40 × 2 = 80" },
  { small: [1, 3, 4, 6], big: [25, 50], target: 75, teacherNotes: "25 + 50 = 75" },
  { small: [2, 5, 6, 9], big: [10, 30], target: 70, teacherNotes: "30 × 2 + 10 = 70" },
  { small: [1, 4, 5, 8], big: [20, 50], target: 90, teacherNotes: "50 + 20 + 5 × 4 = 90" },
  { small: [2, 3, 6, 7], big: [25, 50], target: 100, teacherNotes: "50 × 2 = 100" },
  { small: [1, 2, 5, 9], big: [30, 60], target: 95, teacherNotes: "60 + 30 + 5 = 95" },
  { small: [2, 4, 5, 8], big: [25, 75], target: 120, teacherNotes: "75 + 25 + 5 × 4 = 120" },
  { small: [1, 3, 5, 6], big: [50, 75], target: 125, teacherNotes: "75 + 50 = 125" },
  { small: [2, 3, 4, 8], big: [25, 100], target: 132, teacherNotes: "100 + 25 + 8 - 4 + 3 = 132" },
  { small: [1, 4, 6, 9], big: [50, 75], target: 130, teacherNotes: "75 + 50 + 9 - 4 = 130" },
  { small: [1, 2, 7, 8], big: [25, 100], target: 141, teacherNotes: "100 + 25 + 8 + 7 + 1 = 141" },
  { small: [2, 3, 5, 9], big: [50, 100], target: 159, teacherNotes: "100 + 50 + 9 = 159" },
  { small: [1, 4, 6, 8], big: [25, 75], target: 145, teacherNotes: "75 + 25 + 6 × 8 - 4 + 1 = 145" },
  { small: [2, 3, 4, 7], big: [50, 100], target: 214, teacherNotes: "100 × 2 + 7 + 4 + 3 = 214" },
  { small: [1, 5, 6, 8], big: [25, 75], target: 198, teacherNotes: "25 × 8 - 6 + 5 - 1 = 198" },
  { small: [2, 3, 5, 9], big: [25, 100], target: 275, teacherNotes: "100 × 3 - 25 = 275" },
  { small: [1, 4, 7, 8], big: [50, 100], target: 350, teacherNotes: "100 × 4 - 50 = 350" },
  { small: [2, 3, 6, 9], big: [25, 75], target: 225, teacherNotes: "75 × 3 = 225" },
  { small: [1, 4, 5, 8], big: [50, 100], target: 450, teacherNotes: "100 × 5 - 50 = 450" },
  { small: [2, 3, 7, 9], big: [25, 75], target: 525, teacherNotes: "75 × 7 = 525" },
  { small: [1, 2, 5, 8], big: [50, 100], target: 608, teacherNotes: "100 × 5 + 50 × 2 + 8 = 608" },
  { small: [1, 2, 4, 9], big: [75, 100], target: 699, teacherNotes: "75 × 9 + 100 ÷ 4 - 2 + 1 = 699" },
  { small: [2, 3, 5, 8], big: [75, 100], target: 742, teacherNotes: "100 × 8 - 75 + 3 × 5 + 2 = 742" }
];

const snakes = { 17: 7, 32: 12, 48: 26, 62: 39, 67: 1, 79: 58, 88: 66, 97: 78 };
const ladders = { 3: 22, 8: 30, 14: 44, 28: 55, 36: 57, 51: 72, 63: 81, 71: 92 };
const bombs = { 11: -3, 24: 5, 42: -6, 56: 4, 74: -8, 93: 6 };
const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
const doubleSquares = [15, 30, 45, 60, 75, 90];
const changeSquares = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const snakesQuestions = [
  { level: "Easy", question: "8 + 7 = ?", answer: "15" },
  { level: "Medium", question: "15 + 25 = ?", answer: "40" },
  { level: "Tricky", question: "25 + 25 + 50 = ?", answer: "100" },
  { level: "Easy", question: "20 - 9 = ?", answer: "11" },
  { level: "Medium", question: "72 - 18 = ?", answer: "54" },
  { level: "Tricky", question: "100 - 25 - 25 = ?", answer: "50" },
  { level: "Easy", question: "6 × 4 = ?", answer: "24" },
  { level: "Medium", question: "8 × 7 = ?", answer: "56" },
  { level: "Tricky", question: "12 × 5 = ?", answer: "60" },
  { level: "Easy", question: "36 ÷ 6 = ?", answer: "6" },
  { level: "Medium", question: "81 ÷ 9 = ?", answer: "9" },
  { level: "Tricky", question: "144 ÷ 12 = ?", answer: "12" },
  { level: "Easy", question: "4.5 + 1.5 = ?", answer: "6" },
  { level: "Medium", question: "3.5 + 4.5 = ?", answer: "8" },
  { level: "Tricky", question: "6.25 + 3.75 = ?", answer: "10" },
  { level: "Easy", question: "9.5 - 2 = ?", answer: "7.5" },
  { level: "Medium", question: "12.5 - 7.5 = ?", answer: "5" },
  { level: "Tricky", question: "10 - 2.5 = ?", answer: "7.5" },
  { level: "Easy", question: "25 is ___% of 100", answer: "25%" },
  { level: "Medium", question: "40 is ___% of 100", answer: "40%" },
  { level: "Tricky", question: "75 is ___% of 100", answer: "75%" },
  { level: "Easy", question: "12 + 8 = ?", answer: "20" },
  { level: "Medium", question: "50% of 80 = ?", answer: "40" },
  { level: "Tricky", question: "25% of 200 = ?", answer: "50" }
];

const state = {
  activeTab: "home",
  scores: Object.fromEntries(teamData.map(team => [team.key, 0])),
  visibleTeams: Object.fromEntries(teamData.map(team => [team.key, true])),
  activeTeamOrder: ["green", "purple"],
  vocabIndex: 0,
  vocabReveal: 0,
  sentenceIndex: 0,
  sentenceReveal: -1,
  practiceIndex: 0,
  practiceStep: 0,
  practiceReaderIndex: 0,
  quizIndex: 0,
  quizReveal: 0,
  quizReaderIndex: 0,
  countdownIndex: -1,
  countdownRuleIndex: 0,
  snakesStarted: false,
  snakesRuleIndex: 0,
  snakesQuestionIndex: 0,
  snakesReaderIndex: 0,
  snakesAnswerVisible: false,
  countdownAnswers: Object.fromEntries(teamData.map(team => [team.key, ""])),
  countdownSubmitted: Object.fromEntries(teamData.map(team => [team.key, false])),
  countdownScored: false,
  timerLeft: 45,
  timerId: null,
  teacherSolutionVisible: false,
  snakePositions: Object.fromEntries(teamData.map(team => [team.key, 1])),
  snakeMoving: false,
  musicPlaying: false
};

function activeTeams() {
  syncActiveTeamOrder();
  const teams = state.activeTeamOrder
    .map(key => teamData.find(team => team.key === key))
    .filter(Boolean);
  return teams.length ? teams : teamData;
}

function syncActiveTeamOrder() {
  teamData.forEach(team => {
    state.visibleTeams[team.key] = true;
  });
  state.activeTeamOrder = state.activeTeamOrder.filter(key => teamData.some(team => team.key === key));
  teamData.forEach(team => {
    if (!state.activeTeamOrder.includes(team.key)) {
      state.activeTeamOrder.push(team.key);
    }
  });
}

function readerPairFor(index = 0) {
  const teams = activeTeams();
  const reader = teams[index % teams.length];
  const answerer = teams.length > 1 ? teams[(index + 1) % teams.length] : null;
  return { reader, answerer };
}

function readerBanner(index = 0) {
  const { reader, answerer } = readerPairFor(index);
  if (!reader) return "";
  return `
    <div class="reader-banner" style="--team:${reader.hex};--answer-team:${answerer ? answerer.hex : "#ffd23f"}">
      <span class="reader-role reader-ask">${reader.color} reads.</span>
      <span class="reader-role reader-answer">${answerer ? `${answerer.color} answers.` : "Other team answers."}</span>
    </div>
  `;
}

function saveGameState() {
  const saved = {
    // Keep the Green/Purple reader order, but start each refreshed game at 0 points.
    activeTeamOrder: state.activeTeamOrder
  };
  localStorage.setItem("mathGameState", JSON.stringify(saved));
}

function loadGameState() {
  try {
    const saved = JSON.parse(localStorage.getItem("mathGameState"));
    if (!saved) return;
    if (Array.isArray(saved.activeTeamOrder)) {
      state.activeTeamOrder = saved.activeTeamOrder.filter(key => teamData.some(team => team.key === key));
    }
    syncActiveTeamOrder();
  } catch (error) {
    localStorage.removeItem("mathGameState");
  }
}

const music = new Audio(assets.music);
music.loop = true;
const dong = new Audio(assets.dong);
const victoryAudio = new Audio(assets.victory);
let audioCtx = null;
let fallbackMusicNodes = [];
let audioReady = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  return audioCtx;
}

function unlockAudio() {
  const ctx = getAudioContext();
  if (!ctx) return Promise.resolve(null);
  if (ctx.state === "running") {
    audioReady = true;
    return Promise.resolve(ctx);
  }
  return ctx.resume().then(() => {
    audioReady = true;
    return ctx;
  }).catch(() => null);
}

function playToneNow(ctx, frequency, duration = 0.14, type = "sine", volume = 0.12, delay = 0) {
  const start = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.04);
}

function playSound(name) {
  const sounds = {
    click: ctx => playToneNow(ctx, 720, 0.07, "square", 0.14),
    reveal: ctx => [523, 659, 784].forEach((note, i) => playToneNow(ctx, note, 0.11, "triangle", 0.16, i * 0.055)),
    next: ctx => [784, 988, 1175].forEach((note, i) => playToneNow(ctx, note, 0.1, "square", 0.15, i * 0.06)),
    answer: ctx => [440, 660, 880].forEach((note, i) => playToneNow(ctx, note, 0.13, "triangle", 0.17, i * 0.07)),
    page: ctx => [660, 784].forEach((note, i) => playToneNow(ctx, note, 0.075, "triangle", 0.13, i * 0.045)),
    score: ctx => [880, 1175].forEach((note, i) => playToneNow(ctx, note, 0.09, "square", 0.16, i * 0.055)),
    move: ctx => playToneNow(ctx, 330, 0.08, "square", 0.14),
    tick: ctx => playToneNow(ctx, 980, 0.035, "square", 0.09),
    bomb: ctx => [180, 90, 260, 130].forEach((note, i) => playToneNow(ctx, note, 0.12, "sawtooth", 0.17, i * 0.055)),
    ladder: ctx => [523, 659, 784, 1047].forEach((note, i) => playToneNow(ctx, note, 0.12, "triangle", 0.17, i * 0.07)),
    snake: ctx => [392, 330, 262, 196].forEach((note, i) => playToneNow(ctx, note, 0.16, "sawtooth", 0.15, i * 0.08)),
    popup: ctx => [622, 830].forEach((note, i) => playToneNow(ctx, note, 0.1, "triangle", 0.14, i * 0.08)),
    win: ctx => {
      [196, 262, 330].forEach((note, i) => playToneNow(ctx, note, 0.55, "sawtooth", 0.12, i * 0.04));
      [523, 659, 784, 1047, 1319, 1568, 2093, 2637].forEach((note, i) => playToneNow(ctx, note, 0.24, "square", 0.2, 0.22 + i * 0.09));
      [1047, 1319, 1568, 2093].forEach((note, i) => playToneNow(ctx, note, 0.42, "triangle", 0.16, 1.15 + i * 0.12));
      playToneNow(ctx, 65, 1.35, "sine", 0.16, 0);
    }
  };
  if (!sounds[name]) return;
  unlockAudio().then(ctx => {
    if (ctx) sounds[name](ctx);
  });
}

function startFallbackMusic() {
  state.musicPlaying = false;
  stopFallbackMusic();
  showPopup(`<div class="popup-text">Add music file:<br>${assets.music}</div>`);
}

function stopFallbackMusic() {
  fallbackMusicNodes.forEach(node => {
    if (typeof node.stop === "function") {
      try { node.stop(); } catch (error) {}
    }
    if (typeof node.disconnect === "function") node.disconnect();
  });
  fallbackMusicNodes = [];
}

function playDong() {
  dong.currentTime = 0;
  dong.play().catch(() => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(160, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.8);
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1);
  });
}

function playVictorySound() {
  victoryAudio.currentTime = 0;
  victoryAudio.volume = 1;
  victoryAudio.play().catch(() => playSound("win"));
}

function clampScore(value) {
  return Math.max(-1000, Math.min(1000, value));
}

function updateScore(teamKey, amount) {
  state.scores[teamKey] = clampScore(state.scores[teamKey] + amount);
  saveGameState();
  playSound("score");
  renderScores();
}

function renderScores() {
  const scoringTeams = activeTeams();
  const maxScore = Math.max(...scoringTeams.map(team => state.scores[team.key]));
  scoreboard.style.setProperty("--team-count", scoringTeams.length);
  scoreboard.innerHTML = `
    ${scoringTeams.map(team => `
    <div class="scorebox ${state.scores[team.key] === maxScore && maxScore > 0 ? "leader" : ""}" style="background:${team.hex};color:${team.text || "white"}">
      <div class="team-label">${team.color}${state.scores[team.key] === maxScore && maxScore > 0 ? " Leader" : ""}</div>
      <div class="score-value">${state.scores[team.key]}</div>
      <button class="score-btn" data-team="${team.key}" data-points="1">+1</button>
      <button class="score-btn" data-team="${team.key}" data-points="5">+5</button>
      <button class="score-btn" data-team="${team.key}" data-points="-1">-1</button>
      <button class="score-btn" data-team="${team.key}" data-points="-5">-5</button>
    </div>
  `).join("")}`;
}

scoreboard.addEventListener("click", event => {
  const button = event.target.closest(".score-btn");
  if (!button) return;
  updateScore(button.dataset.team, Number(button.dataset.points));
});

function setScoreVisibility(visible) {
  scoreboard.classList.toggle("hidden", !visible);
  document.body.classList.toggle("has-score", visible);
}

function setActiveTab(tabName) {
  if (tabName !== "home" && state.musicPlaying) {
    music.pause();
    music.currentTime = 0;
    stopFallbackMusic();
    state.musicPlaying = false;
  }
  state.activeTab = tabName;
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.tab === tabName);
  });
  setScoreVisibility(["sentences", "practice", "countdown", "snakes", "quiz"].includes(tabName));
  stopTimer();
  closePopup();
  render();
}

document.querySelector(".tabs").addEventListener("click", event => {
  const tab = event.target.closest(".tab");
  if (tab) {
    playSound("click");
    setActiveTab(tab.dataset.tab);
  }
});

["pointerdown", "keydown"].forEach(eventName => {
  document.addEventListener(eventName, unlockAudio, { once: true });
});

function showPopup(html, options = {}) {
  playSound("popup");
  popupContent.innerHTML = html;
  popup.classList.remove("hidden");
  popup.dataset.clickable = options.clickable ? "true" : "false";
  popup.onclick = options.onClick || ((event) => {
    if (!event.target.closest(".popup-close")) closePopup();
  });
}

function closePopup() {
  popup.classList.add("hidden");
  popup.onclick = null;
  popup.dataset.clickable = "false";
}

popupClose.addEventListener("click", event => {
  event.stopPropagation();
  closePopup();
});

function render() {
  const renderers = {
    home: renderHome,
    vocab: renderVocab,
    sentences: renderSentences,
    practice: renderPractice,
    countdown: renderCountdown,
    snakes: renderSnakes,
    quiz: renderQuiz
  };
  renderers[state.activeTab]();
  renderScores();
}

function renderHome() {
  app.innerHTML = `
    <section class="screen">
      <div class="home-image ${state.musicPlaying ? "music-on" : ""}" style="--image-url:url('${assets.homeImage}')" role="button" tabindex="0">
        <div>Math Game</div>
        <div class="home-rule">Speak English Only!<br>No Korean!</div>
      </div>
    </section>
  `;
  app.querySelector(".home-image").addEventListener("click", toggleMusic);
}

function toggleMusic() {
  playSound("click");
  if (state.musicPlaying) {
    music.pause();
    music.currentTime = 0;
    stopFallbackMusic();
    state.musicPlaying = false;
  } else {
    state.musicPlaying = true;
    music.play().catch(startFallbackMusic);
  }
  renderHome();
}

function renderVocab() {
  const item = vocabWords[state.vocabIndex];
  const showWord = state.vocabReveal > 0;
  app.innerHTML = `
    <section class="screen">
      <div class="vocab-card ${showWord ? "show-word" : ""}" id="vocabCard" role="button" tabindex="0">
        <div class="symbol">${item.symbol}</div>
        <div class="word ${showWord ? "" : "invisible"}">${item.word}</div>
        <button class="big-btn" id="nextVocab">Next</button>
      </div>
    </section>
  `;
  app.querySelector("#nextVocab").addEventListener("click", () => {
    if (state.vocabReveal === 0) {
      playSound("reveal");
      state.vocabReveal = 1;
    } else {
      playSound("next");
      state.vocabIndex = (state.vocabIndex + 1) % vocabWords.length;
      state.vocabReveal = 0;
    }
    renderVocab();
  });
}

function renderSentences() {
  const example = sentenceExamples[state.sentenceIndex];
  const htmlParts = buildSentenceHtml(example);

  app.innerHTML = `
    <section class="screen" id="sentenceScreen">
      <div class="sentence-card">
        ${readerBanner(state.sentenceIndex)}
        <div class="sentence-topic">${example.label}</div>
        <div class="sentence-prompt">Say the full sentence.</div>
        <div class="equation">${htmlParts}</div>
        <div class="spoken-example">${example.spoken}</div>
        <button class="big-btn" id="nextSentence">Next</button>
      </div>
    </section>
  `;
  app.querySelector("#sentenceScreen").addEventListener("click", event => {
    if (event.target.closest("button")) return;
    playSound("reveal");
    state.sentenceReveal = 0;
    renderSentences();
  });
  app.querySelector("#nextSentence").addEventListener("click", () => {
    playSound("next");
    state.sentenceIndex = (state.sentenceIndex + 1) % sentenceExamples.length;
    state.sentenceReveal = -1;
    renderSentences();
  });
}

function buildSentenceHtml(example) {
  let blankCount = 0;
  return example.parts.map(part => {
    if (part !== "__") return `<span class="operator">${part}</span>`;
    const value = example.values[blankCount];
    const html = `<span class="blank filled">${value}</span>`;
    blankCount += 1;
    return html;
  }).join("");
}

function renderPractice() {
  const round = practiceRounds[state.practiceIndex];
  const showPrompt = state.practiceStep === 1;
  const showAnswer = state.practiceStep === 2;
  app.innerHTML = `
    <section class="screen" id="practiceScreen">
      <div class="practice-card">
        ${readerBanner(state.practiceReaderIndex)}
        <div class="ready-burst ${state.practiceStep === 0 ? "" : "hidden"}">READY!!!</div>
        <div class="practice-instruction">${showPrompt ? "Write your answer. Read both lines." : ""}</div>
        <div class="equation">${showPrompt ? round.prompt : ""}</div>
        <div class="practice-word-form">${showPrompt ? round.wordPrompt : ""}</div>
        <div class="practice-answer-slide ${showAnswer ? "" : "hidden"}">
          <div class="practice-answer-label">Answer</div>
          <div class="practice-answer-equation">${showAnswer ? round.answerLine : ""}</div>
          <div class="practice-answer">${showAnswer ? `The answer is ${round.answer}.` : ""}</div>
          <div class="practice-word-form">${showAnswer ? round.spoken : ""}</div>
        </div>
      </div>
    </section>
  `;
  app.querySelector("#practiceScreen").addEventListener("click", () => {
    state.practiceStep += 1;
    playSound(state.practiceStep === 2 ? "answer" : "reveal");
    if (state.practiceStep > 2) {
      playSound("next");
      nextPracticeRound();
    }
    renderPractice();
  });
}

function nextPracticeRound() {
  state.practiceStep = 0;
  state.practiceIndex = (state.practiceIndex + 1) % practiceRounds.length;
  state.practiceReaderIndex += 1;
}

function renderCountdown() {
  if (state.countdownIndex < 0) {
    app.innerHTML = `
      <section class="screen">
        <div class="countdown-image" style="--image-url:url('${assets.countdownImage}')" role="button" tabindex="0">Countdown</div>
      </section>
    `;
  app.querySelector(".countdown-image").addEventListener("click", openCountdownRules);
    return;
  }

  const round = countdownRounds[state.countdownIndex];
  app.innerHTML = `
    <section class="countdown-game">
      <div class="countdown-controls">
        <button class="big-btn" id="newCountdown">Generate New Numbers</button>
        <button class="big-btn" id="teacherSolution">Teacher Solution</button>
      </div>
      <div class="number-arena">
        ${readerBanner(state.countdownIndex)}
        <div class="number-row">${round.small.map(n => `<div class="number-box">${n}</div>`).join("")}</div>
        <div class="number-row big">${round.big.map(n => `<div class="number-box">${n}</div>`).join("")}</div>
        <div class="target-wrap">
          <div class="target-label">Target</div>
          <div class="target-box">${round.target}</div>
        </div>
      </div>
      <aside class="timer-panel">
        <button class="timer-circle ${state.timerId ? "running" : ""}" id="timer">${state.timerLeft}</button>
        <button class="big-btn" id="resetTimer">Reset</button>
        <div class="teacher-note">${state.teacherSolutionVisible ? round.teacherNotes : ""}</div>
        <div class="answer-board">
          <div class="answer-board-title">Final Answers</div>
          ${teamData.map(team => `
            <div class="answer-row ${state.countdownSubmitted[team.key] ? "submitted" : ""}" style="--team:${team.hex}">
              <span>${team.color}</span>
              <input type="text" inputmode="numeric" data-countdown-answer="${team.key}" value="${state.countdownAnswers[team.key]}" placeholder="Answer">
              <button class="submit-answer-btn" data-submit-answer="${team.key}" ${state.countdownSubmitted[team.key] ? "disabled" : ""}>
                ${state.countdownSubmitted[team.key] ? "Submitted" : "Submit"}
              </button>
            </div>
          `).join("")}
          <button class="score-answers-btn" id="scoreCountdownAnswers" ${state.countdownScored ? "disabled" : ""}>
            ${state.countdownScored ? "Scored" : "Score Answers"}
          </button>
        </div>
      </aside>
    </section>
  `;
  updateTimerFace();
  app.querySelector("#newCountdown").addEventListener("click", nextCountdownRound);
  app.querySelector("#teacherSolution").addEventListener("click", () => {
    playSound("answer");
    state.teacherSolutionVisible = !state.teacherSolutionVisible;
    renderCountdown();
  });
  app.querySelector("#timer").addEventListener("click", () => {
    playSound("click");
    startTimer();
  });
  app.querySelector("#resetTimer").addEventListener("click", () => {
    playSound("click");
    resetTimer();
  });
  app.querySelectorAll("[data-countdown-answer]").forEach(input => {
    input.addEventListener("input", event => {
      const key = event.target.dataset.countdownAnswer;
      state.countdownAnswers[key] = event.target.value;
      if (state.countdownSubmitted[key]) {
        state.countdownSubmitted[key] = false;
        const row = event.target.closest(".answer-row");
        const button = row.querySelector("[data-submit-answer]");
        row.classList.remove("submitted");
        button.disabled = false;
        button.textContent = "Submit";
      }
      state.countdownScored = false;
    });
  });
  app.querySelectorAll("[data-submit-answer]").forEach(button => {
    button.addEventListener("click", event => {
      const key = event.target.dataset.submitAnswer;
      if (!state.countdownAnswers[key].trim()) return;
      playSound("answer");
      state.countdownSubmitted[key] = true;
      renderCountdown();
    });
  });
  app.querySelector("#scoreCountdownAnswers").addEventListener("click", scoreCountdownAnswers);
}

function openCountdownRules() {
  playSound("click");
  const rules = [
    `
      <div>There are 4 small numbers and 2 big numbers.</div>
      <div class="rules-example">
        <div class="rules-row">${[2, 3, 4, 5].map(n => `<span>${n}</span>`).join("")}</div>
        <div class="rules-row big">${[10, 20].map(n => `<span>${n}</span>`).join("")}</div>
        <div class="rules-target"><b>Target</b><span>30</span></div>
      </div>
    `,
    "You can use these numbers to get the target number.",
    "You can use +, -, ×, and ÷.",
    "You can only use each number once.",
    "Perfect = 5 points. 1 away = 4. 2 away = 3. 3 away = 2. 4 or 5 away = 1."
  ];
  state.countdownRuleIndex = 0;
  const advance = event => {
    if (event.target.closest(".popup-close")) return;
    playSound("page");
    if (state.countdownRuleIndex >= rules.length) {
      closePopup();
      nextCountdownRound();
      return;
    }
    popupContent.innerHTML = `<div class="popup-text">${rules[state.countdownRuleIndex]}</div>`;
    state.countdownRuleIndex += 1;
  };
  showPopup(`<div class="popup-text">${rules[0]}</div>`, { onClick: advance });
  state.countdownRuleIndex = 1;
}

function nextCountdownRound() {
  playSound("next");
  state.countdownIndex = (state.countdownIndex + 1) % countdownRounds.length;
  state.teacherSolutionVisible = false;
  state.countdownAnswers = Object.fromEntries(teamData.map(team => [team.key, ""]));
  state.countdownSubmitted = Object.fromEntries(teamData.map(team => [team.key, false]));
  state.countdownScored = false;
  resetTimer(false);
  renderCountdown();
}

function scoreCountdownAnswers() {
  const round = countdownRounds[state.countdownIndex];
  if (!round || state.countdownScored) return;

  const results = teamData.map(team => {
    const rawAnswer = state.countdownAnswers[team.key].trim();
    const value = Number(rawAnswer);
    if (!state.countdownSubmitted[team.key]) {
      return { team, rawAnswer, points: 0, message: "Not submitted" };
    }
    if (!rawAnswer || Number.isNaN(value)) {
      return { team, rawAnswer, points: 0, message: "No answer" };
    }

    const difference = Math.abs(value - round.target);
    let points = 0;
    if (difference === 0) points = 5;
    else if (difference === 1) points = 4;
    else if (difference === 2) points = 3;
    else if (difference === 3) points = 2;
    else if (difference === 4 || difference === 5) points = 1;

    state.scores[team.key] = clampScore(state.scores[team.key] + points);
    return {
      team,
      rawAnswer,
      points,
      message: points > 0 ? `+${points}` : "0"
    };
  });

  state.countdownScored = true;
  saveGameState();
  playSound("score");
  renderScores();
  renderCountdown();
  showPopup(`
    <div class="popup-text">
      ${results.map(result => `
        <div class="score-summary-row" style="--team:${result.team.hex}">
          <span>${result.team.color}</span>
          <b>${result.rawAnswer || "-"}</b>
          <strong>${result.message}</strong>
        </div>
      `).join("")}
    </div>
  `);
}

function startTimer() {
  if (state.timerId) return;
  getAudioContext()?.resume?.();
  state.timerId = setInterval(() => {
    state.timerLeft -= 1;
    if (state.timerLeft > 0) playSound("tick");
    updateTimerFace();
    if (state.timerLeft <= 0) {
      stopTimer();
      playDong();
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerId) clearInterval(state.timerId);
  state.timerId = null;
}

function resetTimer(shouldRender = true) {
  stopTimer();
  state.timerLeft = 45;
  if (shouldRender) renderCountdown();
}

function updateTimerFace() {
  const timer = document.getElementById("timer");
  if (!timer) return;
  const degrees = Math.max(0, state.timerLeft / 45) * 360;
  timer.textContent = state.timerLeft;
  timer.style.background = `conic-gradient(#ffd23f ${degrees}deg, rgba(255,255,255,0.22) ${degrees}deg), #1b1240`;
}

function renderSnakes() {
  if (!state.snakesStarted) {
    app.innerHTML = `
      <section class="screen">
        <div class="snakes-image snakes-start" style="--image-url:url('${assets.snakesImage}')" role="button" tabindex="0">
          <div>Snakes &amp;<br>Ladders</div>
          ${buildSnakesVisual()}
        </div>
      </section>
    `;
  app.querySelector(".snakes-image").addEventListener("click", openSnakesRules);
    return;
  }

  app.innerHTML = `
    <section class="snakes-layout">
      <div class="board-wrap">
        <div class="board">${buildBoardSquares()}</div>
        <div class="rail-layer" id="railLayer"></div>
        <div class="marker-layer" id="markerLayer"></div>
      </div>
      <aside class="sl-panel">
        ${readerBanner(state.snakesReaderIndex)}
        ${buildSnakesQuestionHtml()}
        <h2>Move Team</h2>
        <label for="teamSelect">Team color</label>
        <select id="teamSelect">${teamData.map(team => `<option value="${team.key}">${team.color}</option>`).join("")}</select>
        <div class="move-row">
          <div>
            <label for="directionSelect">Move</label>
            <select id="directionSelect">
              <option value="1">+</option>
              <option value="-1">-</option>
            </select>
          </div>
          <div>
            <label for="moveAmount">Squares</label>
            <input id="moveAmount" type="number" min="1" max="100" value="1">
          </div>
        </div>
        <button class="big-btn" id="moveTeam" style="width:100%;margin-top:18px">Move</button>
        <div class="positions" id="positions"></div>
      </aside>
    </section>
  `;
  drawRails();
  drawMarkers();
  updatePositions();
  app.querySelector("#moveTeam").addEventListener("click", moveSelectedTeam);
  app.querySelector("#showSnakeAnswer").addEventListener("click", () => {
    playSound("answer");
    state.snakesAnswerVisible = true;
    renderSnakes();
  });
  app.querySelector("#nextSnakeQuestion").addEventListener("click", () => {
    playSound("next");
    state.snakesQuestionIndex = (state.snakesQuestionIndex + 1) % snakesQuestions.length;
    state.snakesReaderIndex += 1;
    state.snakesAnswerVisible = false;
    renderSnakes();
  });
}

function buildSnakesVisual() {
  return `
    <div class="sl-visual" aria-hidden="true">
      <div class="sl-demo-card snake-demo">
        <div class="demo-board down-board">
          <span class="demo-square top">88</span>
          <span class="demo-square bottom">66</span>
          <svg class="cartoon-snake" viewBox="0 0 220 120" role="img" aria-label="Cartoon snake">
            <path class="snake-body" d="M20 82 C55 26 92 100 126 54 C154 16 188 34 199 58" />
            <circle class="snake-head" cx="199" cy="58" r="21" />
            <circle class="snake-eye" cx="194" cy="50" r="4" />
            <circle class="snake-eye" cx="207" cy="52" r="4" />
            <path class="snake-smile" d="M190 63 Q200 71 211 63" />
            <path class="snake-tongue" d="M218 60 L232 55 M218 60 L232 67" />
            <circle class="snake-spot" cx="62" cy="62" r="7" />
            <circle class="snake-spot" cx="112" cy="64" r="7" />
            <circle class="snake-spot" cx="158" cy="42" r="6" />
          </svg>
          <span class="demo-arrow down">↓</span>
        </div>
        <strong>Snake</strong>
        <span>Go down</span>
      </div>
      <div class="sl-demo-card ladder-demo">
        <div class="demo-board up-board">
          <span class="demo-square bottom">28</span>
          <span class="demo-square top">55</span>
          <svg class="cartoon-ladder" viewBox="0 0 130 150" role="img" aria-label="Ladder">
            <line class="ladder-rail" x1="36" y1="138" x2="56" y2="12" />
            <line class="ladder-rail" x1="88" y1="138" x2="108" y2="12" />
            <line class="ladder-rung" x1="42" y1="112" x2="96" y2="112" />
            <line class="ladder-rung" x1="47" y1="82" x2="101" y2="82" />
            <line class="ladder-rung" x1="52" y1="52" x2="106" y2="52" />
            <line class="ladder-rung" x1="57" y1="25" x2="111" y2="25" />
          </svg>
          <span class="demo-arrow up">↑</span>
        </div>
        <strong>Ladder</strong>
        <span>Go up</span>
      </div>
      <div class="sl-demo-card bomb-demo">
        <div class="demo-board bomb-board">
          <span class="demo-square middle">42</span>
          <svg class="cartoon-bomb" viewBox="0 0 150 135" role="img" aria-label="Bomb">
            <circle class="bomb-body" cx="74" cy="72" r="39" />
            <ellipse class="bomb-shine" cx="58" cy="55" rx="10" ry="7" />
            <rect class="bomb-neck" x="88" y="31" width="26" height="16" rx="5" transform="rotate(32 101 39)" />
            <path class="bomb-fuse" d="M110 31 C124 16 134 30 128 42" />
            <path class="bomb-spark" d="M130 12 L135 25 L148 21 L138 31 L146 43 L132 37 L123 49 L124 34 L110 29 L124 24 Z" />
          </svg>
          <span class="demo-arrows">← →</span>
        </div>
        <strong>Bomb</strong>
        <span>Forward or back</span>
      </div>
    </div>
  `;
}

function buildSnakesQuestionHtml() {
  const item = snakesQuestions[state.snakesQuestionIndex];
  return `
    <div class="sl-question-box">
      <div class="sl-question">${item.question}</div>
      <div class="sl-answer">${state.snakesAnswerVisible ? `Answer: ${item.answer}` : ""}</div>
      <div class="sl-question-actions">
        <button class="mini-btn" id="showSnakeAnswer">Answer</button>
        <button class="mini-btn" id="nextSnakeQuestion">Next Q</button>
      </div>
    </div>
  `;
}

function openSnakesRules() {
  playSound("click");
  const rules = [
    buildSnakesVisual(),
    "Answer the question out loud.",
    "If you are correct, your team can move.",
    "Good answer = +3 spaces. Great English = +5 spaces.",
    "Choose the team color and move them.",
    "Ladders go up. Snakes go down. Bombs can move you forward or back.",
    "Mystery boxes give +50 points.",
    "Special squares can give points, double points, change points, or lose points.",
    "Reach 100 to win!"
  ];
  state.snakesRuleIndex = 0;
  const advance = event => {
    if (event.target.closest(".popup-close")) return;
    playSound("page");
    if (state.snakesRuleIndex >= rules.length) {
      closePopup();
      state.snakesStarted = true;
      renderSnakes();
      return;
    }
    popupContent.innerHTML = `<div class="popup-text">${rules[state.snakesRuleIndex]}</div>`;
    state.snakesRuleIndex += 1;
  };
  showPopup(`<div class="popup-text">${rules[0]}</div>`, { onClick: advance });
  state.snakesRuleIndex = 1;
}

function isMysterySquare(square) {
  return primes.includes(square) && !snakes[square] && !ladders[square] && !bombs[square];
}

function buildBoardSquares() {
  const cells = [];
  for (let row = 9; row >= 0; row--) {
    const nums = [];
    for (let col = 0; col < 10; col++) nums.push(row * 10 + col + 1);
    if ((9 - row) % 2 === 0) nums.reverse();
    nums.forEach(num => {
      const classes = [
        "square",
        bombs[num] ? "bomb-square" : "",
        isMysterySquare(num) ? "mystery-square" : "",
        snakes[num] ? "snake-head" : "",
        ladders[num] ? "ladder-bottom" : ""
      ].filter(Boolean).join(" ");
      const badges = [
        ladders[num] ? `<b class="square-badge ladder-badge">Ladder</b>` : "",
        snakes[num] ? `<b class="square-badge snake-badge">Snake</b>` : "",
        isMysterySquare(num) ? `<b class="mystery-box" aria-label="Mystery box">?</b>` : ""
      ].join("");
      cells.push(`<div class="${classes}" data-square="${num}"><span>${num}</span>${badges}</div>`);
    });
  }
  return cells.join("");
}

function squareCenter(square) {
  const rowFromBottom = Math.floor((square - 1) / 10);
  const indexInRow = (square - 1) % 10;
  const col = rowFromBottom % 2 === 0 ? indexInRow : 9 - indexInRow;
  return {
    x: (col + 0.5) * 10,
    y: (9 - rowFromBottom + 0.5) * 10
  };
}

function drawRails() {
  const layer = app.querySelector("#railLayer");
  const links = [
    ...Object.entries(ladders).map(([from, to]) => ({ from: Number(from), to, type: "ladder-line" })),
    ...Object.entries(snakes).map(([from, to]) => ({ from: Number(from), to, type: "snake-line" }))
  ];
  layer.innerHTML = links.map(link => {
    const start = squareCenter(link.from);
    const end = squareCenter(Number(link.to));
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    return `<div class="rail ${link.type}" style="left:${start.x}%;top:${start.y}%;width:${length}%;transform:rotate(${angle}deg)"></div>`;
  }).join("");
}

function drawMarkers() {
  const layer = app.querySelector("#markerLayer");
  layer.innerHTML = teamData.map((team, index) => {
    const pos = squareCenter(state.snakePositions[team.key]);
    const offsetX = ((index % 3) - 1) * 9;
    const offsetY = (Math.floor(index / 3) - 0.5) * 9;
    return `<div class="marker" title="${team.color}" style="background:${team.hex};left:calc(${pos.x}% + ${offsetX}px);top:calc(${pos.y}% + ${offsetY}px)"></div>`;
  }).join("");
}

function updatePositions() {
  const positions = app.querySelector("#positions");
  if (!positions) return;
  positions.innerHTML = teamData.map(team => `<div style="color:${team.hex}">${team.color}: ${state.snakePositions[team.key]}</div>`).join("");
}

async function moveSelectedTeam() {
  if (state.snakeMoving) return;
  playSound("move");
  const teamKey = app.querySelector("#teamSelect").value;
  const direction = Number(app.querySelector("#directionSelect").value);
  const amount = Number(app.querySelector("#moveAmount").value) || 0;
  const next = Math.max(1, Math.min(100, state.snakePositions[teamKey] + direction * amount));
  await animateTeamMove(teamKey, next);
  handleBoardLanding(teamKey, next);
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateTeamMove(teamKey, targetSquare, delay = 140) {
  const start = state.snakePositions[teamKey];
  const step = targetSquare >= start ? 1 : -1;
  state.snakeMoving = true;
  for (let square = start + step; step > 0 ? square <= targetSquare : square >= targetSquare; square += step) {
    state.snakePositions[teamKey] = square;
    playSound("move");
    drawMarkers();
    updatePositions();
    await wait(delay);
  }
  state.snakeMoving = false;
  saveGameState();
}

function handleBoardLanding(teamKey, square) {
  const color = teamData.find(team => team.key === teamKey).color;
  if (square === 100) {
    celebrateWinner(teamKey);
    return;
  }
  if (square === 67) {
    playSound("snake");
    state.scores[teamKey] = 0;
    saveGameState();
    renderScores();
    showPopup(`<div class="popup-text">Lose all points.</div>`);
    return;
  }
  if (snakes[square]) {
    triggerBoardTransport(teamKey, square, snakes[square], "snake");
    return;
  }
  if (ladders[square]) {
    triggerBoardTransport(teamKey, square, ladders[square], "ladder");
    return;
  }
  if (bombs[square]) {
    const target = Math.max(1, Math.min(100, square + bombs[square]));
    triggerBoardTransport(teamKey, square, target, "bomb");
    return;
  }
  if (doubleSquares.includes(square)) {
    playSound("score");
    state.scores[teamKey] = clampScore(state.scores[teamKey] * 2);
    saveGameState();
    renderScores();
    showPopup(`<div class="popup-text">Double your points.</div>`);
    return;
  }
  if (changeSquares.includes(square)) {
    playSound("answer");
    showPopup(`<div class="popup-text">Change points with any team.</div>`);
    return;
  }
  if (isMysterySquare(square)) {
    updateScore(teamKey, 50);
    showPopup(`<div class="popup-text">Mystery Box!<br>+50 points</div>`);
  }
}

async function triggerBoardTransport(teamKey, from, to, type) {
  const labels = {
    ladder: { sound: "ladder", title: "Ladder!", detail: "Go up" },
    snake: { sound: "snake", title: "Snake!", detail: "Go down" },
    bomb: { sound: "bomb", title: "Bomb!", detail: to > from ? "Go forward" : "Go back" }
  };
  const label = labels[type];
  playSound(label.sound);
  await animateTeamMove(teamKey, to, type === "bomb" ? 95 : 80);
  state.snakePositions[teamKey] = to;
  drawMarkers();
  updatePositions();
  saveGameState();
  showPopup(`<div class="popup-text">${label.title}<br>${label.detail}<br>${from} → ${to}</div>`);
  if (to === 100) celebrateWinner(teamKey);
}

function celebrateWinner(teamKey) {
  const team = teamData.find(item => item.key === teamKey);
  playVictorySound();
  showPopup(`
    <div class="victory-burst" style="--team:${team.hex}">
      <div class="cinema-bar top"></div>
      <div class="cinema-bar bottom"></div>
      <div class="spotlight one"></div>
      <div class="spotlight two"></div>
      <div class="flare-ring main"></div>
      <div class="flare-ring second"></div>
      <div class="victory-crown">★</div>
      <div class="popup-title">Congratulations!<br>${team.color} Math Genius!</div>
      <div class="victory-score">Final Score: ${state.scores[teamKey]}</div>
      <div class="confetti-field">
        ${Array.from({ length: 70 }, (_, index) => `<span style="--i:${index};--team:${team.hex}"></span>`).join("")}
      </div>
    </div>
  `);
}

function renderQuiz() {
  const round = quizRounds[state.quizIndex];
  const answerSlide = state.quizReveal === 1;
  app.innerHTML = `
    <section class="screen" id="quizScreen">
      <div class="quiz-card ${answerSlide ? "answer-slide" : ""}">
        ${readerBanner(state.quizReaderIndex)}
        <div class="quiz-title">${answerSlide ? "Answers" : "Quiz"}</div>
        <div class="quiz-grid">
          ${buildQuizQuickCard(round.quick[0], answerSlide)}
          ${buildQuizQuickCard(round.quick[1], answerSlide)}
        </div>
        <div class="quiz-sentence">
          <div class="quiz-prompt">Write this equation in words.</div>
          <div class="quiz-equation">${round.sentence.display}</div>
          <div class="quiz-answer">${answerSlide ? round.sentence.answer : ""}</div>
        </div>
        <button class="big-btn" id="nextQuiz">Next</button>
      </div>
    </section>
  `;
  app.querySelector("#quizScreen").addEventListener("click", event => {
    if (event.target.closest("button")) return;
    advanceQuizSlide();
  });
  app.querySelector("#nextQuiz").addEventListener("click", advanceQuizSlide);
}

function advanceQuizSlide() {
  if (state.quizReveal === 0) {
    playSound("answer");
    state.quizReveal = 1;
    renderQuiz();
    return;
  }
  const finalRound = state.quizIndex === quizRounds.length - 1;
  playSound(finalRound ? "win" : "next");
  if (finalRound) {
    showPopup(`<div class="popup-title">Quiz Complete!</div>`);
  }
  state.quizIndex = (state.quizIndex + 1) % quizRounds.length;
  state.quizReaderIndex += 1;
  state.quizReveal = 0;
  renderQuiz();
}

function buildQuizQuickCard(item, answerVisible) {
  return `
    <div class="quiz-quick">
      <div class="quiz-prompt">${item.prompt}</div>
      <div class="quiz-symbol">${item.display}</div>
      <div class="quiz-answer">${answerVisible ? item.answer : ""}</div>
    </div>
  `;
}

loadGameState();
setActiveTab("home");

if ("serviceWorker" in navigator && location.protocol !== "file:" && !location.hostname.endsWith(".loca.lt")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}
