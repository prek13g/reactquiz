import React from 'react';

const Result =({score,playAgain}) =>
(
  <div className="score-board">
      <div className="score"> You scored {score} /5 correct Answers!!
          <button className="playbtn" onClick={playAgain}>❕❕Play again❕❕</button>
      </div>
  </div>
)

export default Result;