import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConnectionsGame from './components/ConnectionsGame';
import RandomPuzzleRedirect from './components/RandomPuzzleRedirect';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RandomPuzzleRedirect />} />
          <Route path="/puzzle/:puzzleId" element={<ConnectionsGame />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;