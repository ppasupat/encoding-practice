// ################################
// Generic helpers

export function choice(stuff) {
  return stuff[Math.floor(Math.random() * stuff.length)];
}

// Each stuff entry should be (object, weight).
// O(n) is fine for small n.
export function weightedChoice(stuff) {
  const totalWeight = stuff.reduce((acc, x) => acc + x[1], 0);
  let sample = Math.random() * totalWeight, i = 0;
  while (sample > stuff[i][1]) {
    sample -= stuff[i][1];
    i++;
  }
  return stuff[i][0];
}

export function replaceAt(string, index, newChar) {
  return string.slice(0, index) + newChar + string.slice(index + 1);
}

// ################################
// Encodings

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const ENC_ALPHABET = {
  name: 'alphabet',
  mapping: Object.fromEntries(ALPHABETS.map(x => [x, x])),
  empty: '',
  sep: '',
  useKeyboard: true,
};

const ENC_INDEX = {
  name: 'index',
  mapping: Object.fromEntries(
    ALPHABETS.map(x => [x, (x.codePointAt(0) - 64).toString(10)])),
  empty: '',
  sep: '|',
  useKeyboard: true,
};

const ENC_BINARY = {
  name: 'binary',
  mapping: Object.fromEntries(
    ALPHABETS.map(x => [x, (x.codePointAt(0) - 64).toString(2)])),
  empty: '',
  sep: '|',
  useKeyboard: true,
};

const ENC_TERNARY = {
  name: 'ternary',
  mapping: Object.fromEntries(
    ALPHABETS.map(x => [x, (x.codePointAt(0) - 64).toString(3)])),
  empty: '',
  sep: '|',
  useKeyboard: true,
};

const ENC_MORSE = {
  name: 'morse',
  mapping: {
    A: '.-', B: '-...', C: '-.-.', D: '-..',
    E: '.', F: '..-.', G: '--.', H: '....',
    I: '..', J: '.---', K: '-.-', L: '.-..',
    M: '--', N: '-.', O: '---', P: '.--.',
    Q: '--.-', R: '.-.', S: '...', T: '-',
    U: '..-', V: '...-', W: '.--', X: '-..-',
    Y: '-.--', Z: '--..',
  },
  empty: '',
  sep: '|',
  useKeyboard: true,
}

const ENC_BRAILLE = {
  name: 'braille',
  mapping: {
    A: '⠁', B: '⠃', C: '⠉', D: '⠙', E: '⠑',
    F: '⠋', G: '⠛', H: '⠓', I: '⠊', J: '⠚',
    K: '⠅', L: '⠇', M: '⠍', N: '⠝', O: '⠕',
    P: '⠏', Q: '⠟', R: '⠗', S: '⠎', T: '⠞',
    U: '⠥', V: '⠧', X: '⠭', Y: '⠽', Z: '⠵',
    W: '⠺',
  },
  empty: '⠀',  // Braille blank
  sep: '',
  useKeyboard: false,
}

const ENC_SEMAPHORE = {
  name: 'semaphore',
  mapping: Object.fromEntries(Object.entries({
    A: '01', B: '02', C: '03', D: '04', E: '05', F: '06', G: '07',
    H: '12', I: '13', K: '14', L: '15', M: '16', N: '17',
    O: '23', P: '24', Q: '25', R: '26', S: '27',
    T: '34', U: '35', Y: '36', /*cancel*/
    /*num*/  J: '46', V: '47',
    W: '56', X: '57',
    Z: '67',
  }).map(([k, v]) => [k, String.fromCodePoint(64 + parseInt(v, 8))])),
  empty: '@',  // 64 + 00
  sep: '',
  useKeyboard: false,
}

function applyEncoding(word, encoding) {
  return word.map(x => encoding.mapping[x]).join(encoding.sep);
}

// ################################
// Generate random question

function getRandomWord() {
  let remaining = ALPHABETS.slice();
  for (let i = 0; i < 3; i++) {
    let j = Math.floor(Math.random() * (remaining.length - i));
    [remaining[i], remaining[i + j]] = [remaining[i + j], remaining[i]];
  }
  return remaining.slice(0, 3);
}

const QUESTION_PATTERNS = [
  { name: 'alphabet -> index', question: ENC_ALPHABET, answer: ENC_INDEX },
  { name: 'alphabet -> binary', question: ENC_ALPHABET, answer: ENC_BINARY },
  { name: 'alphabet -> ternary', question: ENC_ALPHABET, answer: ENC_TERNARY },
  { name: 'alphabet -> morse', question: ENC_ALPHABET, answer: ENC_MORSE },
  { name: 'alphabet -> braille', question: ENC_ALPHABET, answer: ENC_BRAILLE },
  { name: 'alphabet -> semaphore', question: ENC_ALPHABET, answer: ENC_SEMAPHORE },
  { name: 'index -> alphabet', question: ENC_INDEX, answer: ENC_ALPHABET },
  { name: 'binary -> alphabet', question: ENC_BINARY, answer: ENC_ALPHABET },
  { name: 'ternary -> alphabet', question: ENC_TERNARY, answer: ENC_ALPHABET },
  { name: 'morse -> alphabet', question: ENC_MORSE, answer: ENC_ALPHABET },
  { name: 'braille -> alphabet', question: ENC_BRAILLE, answer: ENC_ALPHABET },
  { name: 'semaphore -> alphabet', question: ENC_SEMAPHORE, answer: ENC_ALPHABET },
];

export function getQuestionPatterns() {
  return QUESTION_PATTERNS.map(x => x.name);
}

export function generateQuestion(questionPatternWeights) {
  const word = getRandomWord();
  let qp = weightedChoice(QUESTION_PATTERNS.map(
    x => [x, questionPatternWeights[x.name] ?? 1]
  ));
  return {
    questionType: qp.question.name,
    answerType: qp.answer.name,
    question: applyEncoding(word, qp.question),
    initAnswer: qp.answer.empty.repeat(word.length),
    goldAnswer: applyEncoding(word, qp.answer),
    useKeyboard: qp.answer.useKeyboard,
  };
}
