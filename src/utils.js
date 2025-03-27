// ################################
// Generic helpers

export function choice(stuff) {
  return stuff[Math.floor(Math.random() * stuff.length)];
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
  return Array(3).fill(0).map(() => choice(ALPHABETS));
}

const QUESTION_PATTERNS = [
  // { question: ENC_ALPHABET, answer: ENC_INDEX },
  // { question: ENC_ALPHABET, answer: ENC_BINARY },
  // { question: ENC_ALPHABET, answer: ENC_TERNARY },
  // { question: ENC_ALPHABET, answer: ENC_MORSE },
  // { question: ENC_ALPHABET, answer: ENC_BRAILLE },
  { question: ENC_ALPHABET, answer: ENC_SEMAPHORE },
  // { question: ENC_INDEX, answer: ENC_ALPHABET },
  // { question: ENC_BINARY, answer: ENC_ALPHABET },
  // { question: ENC_TERNARY, answer: ENC_ALPHABET },
  // { question: ENC_MORSE, answer: ENC_ALPHABET },
  // { question: ENC_BRAILLE, answer: ENC_ALPHABET },
  // { question: ENC_SEMAPHORE, answer: ENC_ALPHABET },
];

export function generateQuestion() {
  let word = getRandomWord();
  let qp = choice(QUESTION_PATTERNS);
  return {
    questionType: qp.question.name,
    answerType: qp.answer.name,
    question: applyEncoding(word, qp.question),
    initAnswer: qp.answer.empty.repeat(word.length),
    goldAnswer: applyEncoding(word, qp.answer),
    useKeyboard: qp.answer.useKeyboard,
  };
}
