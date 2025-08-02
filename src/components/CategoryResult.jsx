import React from 'react';

const CategoryResult = ({ category, difficulty }) => {
  const getDifficultyColors = (difficulty) => {
    switch (difficulty) {
      case 0: return 'bg-green-200 text-green-800';
      case 1: return 'bg-purple-200 text-purple-800';
      case 2: return 'bg-yellow-200 text-yellow-800';
      case 3: return 'bg-blue-200 text-blue-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className={`w-full p-4 rounded-lg mb-2 ${getDifficultyColors(difficulty)} transition-all duration-300 animate-fadeIn`}>
      <h3 className="text-lg font-bold text-center mb-2">{category.name.toUpperCase()}</h3>
      <div className="flex flex-wrap justify-center gap-2">
        {category.words.map((word, index) => (
          <span key={index} className="text-sm font-medium">
            {word}{index < category.words.length - 1 ? ',' : ''}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategoryResult;