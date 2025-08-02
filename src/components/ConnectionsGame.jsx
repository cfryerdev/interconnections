import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadPuzzle, shuffleArray, getRandomPuzzleId } from '../utils/puzzleLoader';
import WordGrid from './WordGrid';
import CategoryResult from './CategoryResult';
import GameControls from './GameControls';
import packageJson from '../../package.json';

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
  const [showHowToPlay, setShowHowToPlay] = useState(false);

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
      }
      // Keep selections for all wrong answers - don't deselect
      
      if (newMistakes >= 4) {
        setGameStatus('lost');
        const allFoundCategories = puzzle.items;
        setFoundCategories(allFoundCategories);
        setWords([]); // Clear remaining words when game is lost
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
        <div className="relative text-center mb-0">
          <h1 className="text-3xl font-bold text-gray-900">
            Interconnections
          </h1>
          <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            v{packageJson.version}
          </span>
        </div>
        
        {puzzle && (
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 text-sm text-gray-500 mb-2">
              <span>Puzzle: {puzzle.id}</span>
            </div>
            <div className="flex justify-center gap-3 mb-2">
              <button
                onClick={async () => {
                  const randomId = await getRandomPuzzleId(puzzle.id);
                  navigate(`/puzzle/${randomId}`);
                }}
                className="px-3 py-1 text-xs bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
                title="Load random puzzle"
              >
                Random Puzzle
              </button>
              <button
                onClick={() => setShowHowToPlay(true)}
                className="px-3 py-1 text-xs bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors"
                title="Learn how to play"
              >
                How to Play
              </button>
            </div>
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

        {words.length > 0 && gameStatus === 'playing' && (
          <WordGrid 
            words={words}
            selectedWords={selectedWords}
            onWordClick={handleWordClick}
            foundCategories={foundCategories}
          />
        )}

        {gameStatus === 'playing' && (
          <GameControls 
            onShuffle={handleShuffle}
            onDeselectAll={handleDeselectAll}
            onSubmit={handleSubmit}
            selectedCount={selectedWords.length}
            mistakes={mistakes}
            gameStatus={gameStatus}
          />
        )}


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

        {/* How to Play Modal */}
        {showHowToPlay && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">How to Play</h2>
                  <button
                    onClick={() => setShowHowToPlay(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">🎯 Objective</h3>
                    <p>Find four groups of four related words from the 16-word grid.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">🎮 How to Play</h3>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Click on 4 words you think belong together</li>
                      <li>Press <strong>Submit</strong> to check your guess</li>
                      <li>If correct, the category is revealed and removed but if wrong, your selections stay for easy adjustment</li>
                      <li>Find all 4 categories to win!</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">⚠️ Mistakes</h3>
                    <p>You have 4 chances. After 4 wrong guesses, the game ends and all answers are revealed.</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm"><strong>Tip:</strong> Look for themes like "Types of pasta," "Things that are red," or "Words ending in -ING."</p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowHowToPlay(false)}
                    className="px-6 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors"
                  >
                    Got it!
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionsGame;