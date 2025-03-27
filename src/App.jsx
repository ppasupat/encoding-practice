import { useState } from 'react';
import { replaceAt, generateQuestion } from './utils';
import Keyboard from './Keyboard';
import Braille from './Braille';

export default function App() {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(generateQuestion);
  const [answer, setAnswer] = useState(question.initAnswer);

  function renderQuestion() {
    return (
      <>
        {question.question}
      </>
    );
  }

  function renderAnswer() {
    if (question.answerType === 'braille') {
      return answer.split('').map((value, index) => (
        <Braille key={index} value={value}
          setValue={newValue => setAnswer(a => replaceAt(a, index, newValue))}
        />
      ));
    }
    return (
      <>
        {answer}
      </>
    );
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
      setScore(s => s + 1);
      const newQuestion = generateQuestion();
      setQuestion(newQuestion);
      setAnswer(newQuestion.initAnswer);
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
        <div id="question">{renderQuestion(question.question)}</div>
        <div id="answer-type">{question.answerType}</div>
        <div id="answer">{renderAnswer(answer)}</div>
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
