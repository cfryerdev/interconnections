import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadPuzzle, shuffleArray, getRandomPuzzleId } from '../utils/puzzleLoader';
import WordGrid from './WordGrid';
import CategoryResult from './CategoryResult';
import GameControls from './GameControls';

const ConnectionsGame = () => {
  const { puzzleId } = useParams();
  const navigate = useNavigate();
  const [puzzle, setPuzzle] = useState(null);
  const [words, setWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [foundCategories, setFoundCategories] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing');
  const [loading, setLoading] = useState(true);
  const [oneAwayMessage, setOneAwayMessage] = useState('');

  useEffect(() => {
    initializeGame();
  }, [puzzleId]);

  const initializeGame = async () => {
    try {
      const puzzleData = await loadPuzzle(puzzleId);
      setPuzzle(puzzleData);
      
      const allWords = puzzleData.items.flatMap(item => item.words);
      setWords(shuffleArray(allWords));
      
      setSelectedWords([]);
      setFoundCategories([]);
      setMistakes(0);
      setGameStatus('playing');
      setLoading(false);
    } catch (error) {
      console.error('Failed to initialize game:', error);
      setLoading(false);
    }
  };

  const handleWordClick = (word) => {
    if (gameStatus !== 'playing') return;
    
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleSubmit = () => {
    if (selectedWords.length !== 4 || gameStatus !== 'playing') return;

    const foundCategory = puzzle.items.find(category =>
      selectedWords.every(word => category.words.includes(word)) &&
      category.words.every(word => selectedWords.includes(word))
    );

    if (foundCategory) {
      const newFoundCategories = [...foundCategories, foundCategory];
      setFoundCategories(newFoundCategories);
      setSelectedWords([]);
      
      const remainingWords = words.filter(word => 
        !newFoundCategories.some(category => category.words.includes(word))
      );
      setWords(remainingWords);
      
      if (newFoundCategories.length === 4) {
        setGameStatus('won');
      }
    } else {
      // Check if one away from any category
      const oneAwayCategory = puzzle.items.find(category => {
        const intersection = selectedWords.filter(word => category.words.includes(word));
        return intersection.length === 3;
      });
      
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      
      if (oneAwayCategory) {
        setOneAwayMessage('One away!');
        setTimeout(() => setOneAwayMessage(''), 2000);
        // Don't deselect words when one away
      } else {
        setSelectedWords([]);
      }
      
      if (newMistakes >= 4) {
        setGameStatus('lost');
        const allFoundCategories = puzzle.items;
        setFoundCategories(allFoundCategories);
      }
    }
  };

  const handleShuffle = () => {
    if (gameStatus !== 'playing') return;
    setWords(shuffleArray(words));
  };

  const handleDeselectAll = () => {
    setSelectedWords([]);
  };

  const getGameMessage = () => {
    if (gameStatus === 'won') {
      return (
        <div className="text-center mb-4 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800">Congratulations!</h2>
          <p className="text-gray-600">You found all connections!</p>
        </div>
      );
    }
    
    if (gameStatus === 'lost') {
      return (
        <div className="text-center mb-4 p-4 bg-red-100 rounded-lg">
          <h2 className="text-2xl font-bold text-red-800">Game Over</h2>
          <p className="text-red-600">You've made too many mistakes. Here are the correct answers:</p>
        </div>
      );
    }
    
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-0 text-gray-900">
          Interconnections
        </h1>
        
        {puzzle && (
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 text-sm text-gray-500 mb-2">
              <span>Puzzle: {puzzle.id}</span>
            </div>
            <div className="text-center mb-2">
              <button
                onClick={() => {
                  const randomId = getRandomPuzzleId(puzzle.id);
                  navigate(`/puzzle/${randomId}`);
                }}
                className="px-3 py-1 text-xs bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
                title="Load random puzzle"
              >
                Random Puzzle
              </button>
            </div>
            <p className="text-gray-600">
              Create four groups of four!
            </p>
          </div>
        )}

        {getGameMessage()}

        {oneAwayMessage && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
            <div className="bg-yellow-500 text-white px-6 py-3 rounded-full shadow-lg">
              <p className="font-medium">{oneAwayMessage}</p>
            </div>
          </div>
        )}

        <div className="mb-6">
          {foundCategories.map((category, index) => (
            <CategoryResult 
              key={category.name} 
              category={category} 
              difficulty={puzzle?.items.indexOf(category) || 0}
            />
          ))}
        </div>

        {words.length > 0 && (
          <WordGrid 
            words={words}
            selectedWords={selectedWords}
            onWordClick={handleWordClick}
            foundCategories={foundCategories}
          />
        )}

        <GameControls 
          onShuffle={handleShuffle}
          onDeselectAll={handleDeselectAll}
          onSubmit={handleSubmit}
          selectedCount={selectedWords.length}
          mistakes={mistakes}
          gameStatus={gameStatus}
        />


        {gameStatus !== 'playing' && (
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionsGame;