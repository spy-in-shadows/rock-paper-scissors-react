import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [gameState, setGameState] = useState('setup'); 
  const [rounds, setRounds] = useState(3);
  const [history, setHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDark = () => {
    if (isDarkMode) {
      setIsDarkMode(false);
      document.body.className = "";
    } else {
      setIsDarkMode(true);
      document.body.className = "dark-mode";
    }
  }

  const startGame = (num) => {
    setRounds(num);
    setHistory([]);
    setGameState('playing');
  };

  const playRound = (userMove) => {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const compMove = choices[Math.floor(Math.random() * 3)];
    
    let res = '';
    if (userMove === compMove) {
      res = 'draw';
    } else if (
      (userMove === 'Rock' && compMove === 'Scissors') ||
      (userMove === 'Paper' && compMove === 'Rock') ||
      (userMove === 'Scissors' && compMove === 'Paper')
    ) {
      res = 'win';
    } else {
      res = 'lose';
    }

    const newHist = [...history, { userMove, compMove, res }];
    setHistory(newHist);

    if (newHist.length >= rounds) {
      setGameState('gameover');
    }
  };

  // counting scores
  let winCount = 0;
  let loseCount = 0;
  for (let i = 0; i < history.length; i++) {
    if (history[i].res === 'win') winCount++;
    if (history[i].res === 'lose') loseCount++;
  }

  return (
    <div className="container">
      <button onClick={toggleDark} style={{ float: 'right' }}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div style={{ clear: 'both' }}></div>

      <h1>My Rock Paper Scissors Game!</h1>

      {gameState === 'setup' ? (
        <div>
          <h2>How many rounds do you want to play?</h2>
          <button onClick={() => startGame(1)}>1 Round</button>
          <button onClick={() => startGame(3)}>3 Rounds</button>
          <button onClick={() => startGame(5)}>5 Rounds</button>
        </div>
      ) : gameState === 'playing' ? (
        <div>
          <div className="score">
            You: {winCount} - Computer: {loseCount}
          </div>
          <h3>Round {history.length + 1} of {rounds}</h3>

          <p>Choose your move below:</p>
          <button onClick={() => playRound('Rock')}>🪨 Rock</button>
          <button onClick={() => playRound('Paper')}>📃 Paper</button>
          <button onClick={() => playRound('Scissors')}>✂️ Scissors</button>
        </div>
      ) : (
        <div>
          <h2>Game Over!!!</h2>
          <h3>Final Score: You {winCount} - Computer {loseCount}</h3>
          <div style={{ margin: '20px' }}>
            {winCount > loseCount ? <h1>YOU WIN!!! 🎉</h1> : winCount < loseCount ? <h1>COMPUTER WINS 😢</h1> : <h1>IT'S A TIE 😐</h1>}
          </div>
          <button onClick={() => setGameState('setup')} style={{ backgroundColor: 'lightblue', fontWeight: 'bold' }}>
            Play Again!
          </button>
        </div>
      )}

      {history.length > 0 && (
        <div className="history">
          <h2>Past Matches Record:</h2>
          <ul>
            {history.map((item, index) => {
              return (
                <li key={index} className={item.res}>
                  Round {index + 1}: You picked {item.userMove}, Computer picked {item.compMove} - You {item.res === 'win' ? 'Won' : item.res === 'lose' ? 'Lost' : 'Tied'}!
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;