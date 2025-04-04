import { useState } from 'react';
import Quiz from './Quiz';

export default function App() {
  const [score, setScore] = useState({right: 0, wrong: 0});
  const [questionPatternWeights, setQuestionPatternWeights] = useState({
    'alphabet -> index': 0.2,
    'index -> alphabet': 0.2,
    'alphabet -> binary': 0.4,
    'binary -> alphabet': 0.4,
    'alphabet -> ternary': 0.4,
    'ternary -> alphabet': 0.4,
  });

  return <Quiz
    score={score}
    setScore={setScore}
    questionPatternWeights={questionPatternWeights}
  />;
}
