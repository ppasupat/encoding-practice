// ################################
// Encodings

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const ENC_ALPHABET = {
  name: 'alphabet',
  mapping: Object.fromEntries(ALPHABETS.map(x => [x, x])),
  sep: '',
};

const ENC_INDEX = {
  name: 'index',
  mapping: Object.fromEntries(
    ALPHABETS.map(x => [x, (x.codePointAt(0) - 64).toString(10)])),
  sep: '|',
};

const ENC_BINARY = {
  name: 'binary',
  mapping: Object.fromEntries(
    ALPHABETS.map(x => [x, (x.codePointAt(0) - 64).toString(2)])),
  sep: '|',
};

const ENC_TERNARY = {
  name: 'ternary',
  mapping: Object.fromEntries(
    ALPHABETS.map(x => [x, (x.codePointAt(0) - 64).toString(3)])),
  sep: '|',
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
  sep: '|',
}

const ENC_BRAILLE = {
  name: 'braille',
  mapping: {
    A: '⠁', B: '⠃', C: '⠉', D: '⠙', E: '⠑',
    F: '⠋', G: '⠛', H: '⠓', I: '⠊', J: '⠚',
    K: '⠅', L: '⠇', M: '⠍', N: '⠝', O: '⠕',
    P: '⠏', Q: '⠟', R: '⠗', S: '⠎', T: '⠞',
    U: '⠥', V: '⠧', W: '⠺', X: '⠭', Y: '⠽', Z: '⠵',
  },
  sep: '',
}

/*  1   8
    2  16  ==>  2 1+8 16
    4  32       4     32
   64 128      64    128
*/
const ENC_SEMAPHORE = {
  name: 'semaphore',
  mapping: {
    A: '⡀', B: '⠄', C: '⠂', D: '⠉', E: '⠐', F: '⠠', G: '⢀',
    H: '⡄', I: '⡂', J: '⠩', K: '⡉', L: '⡐', M: '⡠', N: '⣀',
    O: '⠆', P: '⠍', Q: '⠔', R: '⠤', S: '⢄',
    T: '⠋', U: '⠒', V: '⢉', W: '⠰', X: '⢐', Y: '⠢', Z: '⢠',
  },
  sep: '',
}

function applyEncoding(word, encoding) {
  return word.map(x => encoding.mapping[x]).join(encoding.sep);
}

// ################################
// Generate random question

function choice(stuff) {
  return stuff[Math.floor(Math.random() * stuff.length)];
}

function getRandomWord() {
  return new Array(3).fill(0).map(() => choice(ALPHABETS));
}

const QUESTION_PATTERNS = [
  { question: ENC_ALPHABET, answer: ENC_INDEX },
  { question: ENC_ALPHABET, answer: ENC_BINARY },
  { question: ENC_ALPHABET, answer: ENC_TERNARY },
  { question: ENC_ALPHABET, answer: ENC_MORSE },
  { question: ENC_ALPHABET, answer: ENC_BRAILLE },
  { question: ENC_ALPHABET, answer: ENC_SEMAPHORE },
  { question: ENC_INDEX, answer: ENC_ALPHABET },
  { question: ENC_BINARY, answer: ENC_ALPHABET },
  { question: ENC_TERNARY, answer: ENC_ALPHABET },
  { question: ENC_MORSE, answer: ENC_ALPHABET },
  { question: ENC_BRAILLE, answer: ENC_ALPHABET },
  { question: ENC_SEMAPHORE, answer: ENC_ALPHABET },
];

export function generateQuestion() {
  let word = getRandomWord();
  let qp = choice(QUESTION_PATTERNS);
  return {
    questionType: qp.question.name,
    answerType: qp.answer.name,
    question: applyEncoding(word, qp.question),
    goldAnswer: applyEncoding(word, qp.answer),
  };
}
