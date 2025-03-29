import { useState } from 'react';
import { FaBackspace } from "react-icons/fa";
import { replaceAt, generateQuestion } from './utils';
import Keyboard from './Keyboard';
import Braille from './Braille';
import Semaphore from './Semaphore';

export default function App() {
  const [score, setScore] = useState({right: 0, wrong: 0});
  const [question, setQuestion] = useState(generateQuestion);
  const [answer, setAnswer] = useState(question.initAnswer);
  const [missed, setMissed] = useState(false);

  function nextQuestion() {
    const newQuestion = generateQuestion();
    setQuestion(newQuestion);
    setAnswer(newQuestion.initAnswer);
    setMissed(false);
  }

  function renderStatic(encodedText, encodingType) {
    switch (encodingType) {
      case 'semaphore':
        return encodedText.split('').map((value, index) => (
          <Semaphore key={index} value={value} />
        ));
      default:
        if (!encodedText.length) return '\xa0';
        return encodedText.split(/([|])/).map((value, index) => (
          <span key={index} className={value === '|' ? 'sep' : ''}>{value}</span>
        ));
    }
  }

  function renderEditable(encodedText, encodingType, setEncodedText) {
    switch (encodingType) {
      case 'braille':
        return encodedText.split('').map((value, index) => (
          <Braille key={index} value={value}
            setValue={setEncodedText === null ? null :
            newValue => setEncodedText(a => replaceAt(a, index, newValue))}
          />
        ));
      case 'semaphore':
        return encodedText.split('').map((value, index) => (
          <Semaphore key={index} value={value}
            setValue={setEncodedText === null ? null :
            newValue => setEncodedText(a => replaceAt(a, index, newValue))}
          />
        ));
      default:
        if (!encodedText.length) return '\xa0';
        return encodedText.split(/([|])/).map((value, index) => (
          <span key={index} className={value === '|' ? 'sep' : ''}>{value}</span>
        ));
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
      nextQuestion();
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
        <div id="question" className={question.questionType}>
          {renderStatic(question.question, question.questionType)}
        </div>
        <div id="answer-type">{question.answerType}</div>
        <div id="answer" className={question.answerType}>
          {renderEditable(answer, question.answerType, missed ? null : setAnswer)}
        </div>
        {missed && (
          <div id="gold-answer" className={question.answerType}>
            {renderStatic(question.goldAnswer, question.answerType)}
          </div>
        )}
      </article>
      <footer>
        {!missed &&
        <Keyboard type={question.answerType} handleKey={handleKey} />}
        <div id="special-buttons">
          {question.useKeyboard && !missed &&
          <button onClick={handleClear}>Clear</button>}
          {missed ?
            <button onClick={nextQuestion}>OK</button> :
            <button onClick={handleSubmit}>Submit</button>}
          {question.useKeyboard && !missed &&
          <button onClick={handleBackspace}><FaBackspace /></button>}
        </div>
      </footer>
    </>
  );
}
