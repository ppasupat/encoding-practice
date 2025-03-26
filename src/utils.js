// ################################
// Encodings

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const ENC_INDEX = {
  name: 'index',
  mapping: Object.fromEntries(
    ALPHABETS.map(x => [x, (x.codePointAt(0) - 64).toString(10)])),
};

const ENC_BINARY = {
  name: 'binary',
  mapping: Object.fromEntries(
    ALPHABETS.map(x => [x, (x.codePointAt(0) - 64).toString(2)])),
};

const ENC_TERNARY = {
  name: 'ternary',
  mapping: Object.fromEntries(
    ALPHABETS.map(x => [x, (x.codePointAt(0) - 64).toString(3)])),
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
}

// ################################
// Generate random question

function getRandomWord() {
  return new Array(3).fill(0).map(() => (
    String.fromCodePoint(65 + Math.floor(Math.random() * 26))
  ));
}

export function generateQuestion() {
  let word = getRandomWord();
  return {
    questionType: 'index',
    answerType: 'alphabet',
    question: word.map(x => x.codePointAt(0) - 64).join(' '),
    goldAnswer: word.join(''),
  }
  return {
    questionType: 'alphabet',
    answerType: 'index',
    question: word.join(''),
    goldAnswer: word.map(x => x.codePointAt(0) - 64).join('/'),
  }
}
