import React from 'react';

function TriviaQuestion({
  question,
  options,
  selectedAnswer,
  setSelectedAnswer,
  onSubmit,
  isCorrect,
}) {
  return (
    <div>
      <h2>{question}</h2>
      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => setSelectedAnswer(index)}
            style={{
              backgroundColor:
                selectedAnswer === index
                  ? selectedAnswer === isCorrect
                    ? 'green'
                    : 'red'
                  : 'transparent',
            }}
          >
            {option}
          </li>
        ))}
      </ul>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

export default TriviaQuestion;