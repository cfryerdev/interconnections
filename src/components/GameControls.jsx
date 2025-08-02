import React from 'react';

const GameControls = ({ 
  onShuffle, 
  onDeselectAll, 
  onSubmit, 
  selectedCount, 
  mistakes, 
  gameStatus 
}) => {
  const isSubmitDisabled = selectedCount !== 4 || gameStatus !== 'playing';
  const isControlsDisabled = gameStatus !== 'playing';

  const MistakeIndicator = ({ mistakes }) => (
    <div className="flex items-center gap-1 mb-4">
      <span className="text-sm font-medium text-gray-600">Mistakes remaining:</span>
      <div className="flex gap-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index < (4 - mistakes) ? 'bg-gray-300' : 'bg-red-500'
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-lg mx-auto">
      <MistakeIndicator mistakes={mistakes} />
      
      <div className="flex gap-2 justify-center">
        <button
          onClick={onShuffle}
          disabled={isControlsDisabled}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
            isControlsDisabled
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95'
          }`}
        >
          Shuffle
        </button>
        
        <button
          onClick={onDeselectAll}
          disabled={isControlsDisabled || selectedCount === 0}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
            isControlsDisabled || selectedCount === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95'
          }`}
        >
          Deselect all
        </button>
        
        <button
          onClick={onSubmit}
          disabled={isSubmitDisabled}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
            isSubmitDisabled
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800 active:scale-95'
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default GameControls;