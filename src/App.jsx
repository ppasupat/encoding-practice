import { useState } from 'react';
import { replaceAt, generateQuestion } from './utils';
import Keyboard from './Keyboard';
import Braille from './Braille';
import Semaphore from './Semaphore';

export default function App() {
  const [score, setScore] = useState({right: 0, wrong: 0});
  const [question, setQuestion] = useState(generateQuestion);
  const [answer, setAnswer] = useState(question.initAnswer);
  const [missed, setMissed] = useState(false);

  function renderStatic(encodedText, encodingType) {
    return (
      <>
        {encodedText.length > 0 ? encodedText : '\xa0'}
      </>
    );
  }

  function renderEditable(encodedText, encodingType, setEncodedText) {
    switch (encodingType) {
      case 'braille':
        return encodedText.split('').map((value, index) => (
          <Braille key={index} value={value}
            setValue={newValue => setEncodedText(a => replaceAt(a, index, newValue))}
          />
        ));
      case 'semaphore':
        return encodedText.split('').map((value, index) => (
          <Semaphore key={index} value={value}
            setValue={newValue => setEncodedText(a => replaceAt(a, index, newValue))}
          />
        ));
      default:
        return (
          <>
            {encodedText.length > 0 ? encodedText : '\xa0'}
          </>
        );
    }
  }

  function handleKey(key) {
    setAnswer(a => a + key);
  }

  function handleClear() {
    setAnswer('');
  }

  function handleBackspace() {
    setAnswer(a => a.slice(0, -1));
  }

  function handleSubmit() {
    if (answer === question.goldAnswer) {
      setScore(s => ({right: s.right + !missed, wrong: s.wrong}));
      setMissed(false);
      const newQuestion = generateQuestion();
      setQuestion(newQuestion);
      setAnswer(newQuestion.initAnswer);
    } else {
      setScore(s => ({right: s.right, wrong: s.wrong + !missed}));
      setMissed(true);
    }
  }

  return (
    <>
      <header>
        <span id="score-display">{score.right} ✔️  {score.wrong} ❌</span>
      </header>
      <article>
        <div id="question-type">{question.questionType}</div>
        <div id="question">{renderStatic(question.question, question.questionType)}</div>
        <div id="answer-type">{question.answerType}</div>
        <div id="answer">{renderEditable(answer, question.answerType, setAnswer)}</div>
        {missed && (
          <div id="gold-answer">
            {renderStatic(question.goldAnswer, question.answerType)}
          </div>
        )}
      </article>
      <footer>
        <Keyboard type={question.answerType} handleKey={handleKey} />
        <div className="special-buttons">
          {question.useKeyboard && <>
            <button onClick={handleClear}>Clear</button>
            <button onClick={handleBackspace}>Backspace</button>
          </>}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </footer>
    </>
  );
}
