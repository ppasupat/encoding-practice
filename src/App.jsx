import { useState } from 'react';
import { generateQuestion } from './utils';
import Keyboard from './Keyboard';

export default function App() {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(generateQuestion);
  const [answer, setAnswer] = useState('');

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
      setScore(s => s + 1);
      setQuestion(generateQuestion());
      setAnswer('');
    } else {
      alert(`Wrong. (Correct answer: ${question.goldAnswer})`);
    }
  }

  return (
    <>
      <header>
        <span id="score-display">{score}</span>
      </header>
      <article>
        <div id="question-type">{question.questionType}</div>
        <div id="question">{question.question}</div>
        <div id="answer-type">{question.answerType}</div>
        <div id="answer">{answer}</div>
      </article>
      <footer>
        <Keyboard handleKey={handleKey} />
        <div className="special-buttons">
          <button onClick={handleClear}>Clear</button>
          <button onClick={handleBackspace}>Backspace</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </footer>
    </>
  );
}
