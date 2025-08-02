import React from 'react';

const WordGrid = ({ words, selectedWords, onWordClick, foundCategories }) => {
  const isWordFound = (word) => {
    return foundCategories.some(category => 
      category.words.includes(word)
    );
  };

  const isWordSelected = (word) => {
    return selectedWords.includes(word);
  };

  const getWordButtonClass = (word) => {
    if (isWordFound(word)) {
      return 'bg-gray-200 text-gray-500 cursor-not-allowed';
    }
    
    if (isWordSelected(word)) {
      return 'bg-gray-600 text-white';
    }
    
    return 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-95';
  };

  return (
    <div className="grid grid-cols-4 gap-2 w-full max-w-lg mx-auto mb-6">
      {words.map((word, index) => (
        <button
          key={`${word}-${index}`}
          onClick={() => onWordClick(word)}
          disabled={isWordFound(word)}
          className={`
            aspect-square p-2 rounded-lg font-medium text-xs sm:text-sm
            transition-all duration-200 border-2 border-transparent
            ${getWordButtonClass(word)}
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          `}
        >
          {word}
        </button>
      ))}
    </div>
  );
};

export default WordGrid;