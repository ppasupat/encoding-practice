function getRandomWord() {
  return new Array(3).fill(0).map(() => (
    String.fromCodePoint(65 + Math.floor(Math.random() * 26))
  ));
}

export function generateQuestion() {
  let word = getRandomWord();
  return {
    questionType: '1-26',
    answerType: 'A-Z',
    question: word.map(x => x.codePointAt(0) - 64).join('/'),
    goldAnswer: word.join(''),
  }
}
