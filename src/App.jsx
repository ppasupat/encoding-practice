import { useState } from 'react';
import Quiz from './Quiz';

export default function App() {
  const [score, setScore] = useState({right: 0, wrong: 0});
  const [questionPatternWeights, setQuestionPatternWeights] = useState({
  });

  return <Quiz
    score={score}
    setScore={setScore}
    questionPatternWeights={questionPatternWeights}
  />;
}
