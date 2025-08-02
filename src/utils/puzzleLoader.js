export const loadPuzzle = async (puzzleId = 'd7829759-c5fe-434a-ad38-8aee6e545df2') => {
  try {
    const response = await fetch(`/puzzles/${puzzleId}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load puzzle: ${response.status}`);
    }
    const puzzle = await response.json();
    
    if (!validatePuzzle(puzzle)) {
      throw new Error('Invalid puzzle format');
    }
    
    return puzzle;
  } catch (error) {
    console.error('Error loading puzzle:', error);
    return getDefaultPuzzle();
  }
};

const validatePuzzle = (puzzle) => {
  if (!puzzle || !puzzle.id || !puzzle.items || !Array.isArray(puzzle.items)) {
    return false;
  }
  
  if (puzzle.items.length !== 4) {
    return false;
  }
  
  return puzzle.items.every(item => 
    item.name && 
    Array.isArray(item.words) && 
    item.words.length === 4
  );
};

const getDefaultPuzzle = () => ({
  id: 'd7829759-c5fe-434a-ad38-8aee6e545df2',
  date: '2025-08-01',
  items: [
    {
      name: 'Keyboard Words',
      words: ['Command', 'Return', 'Shift', 'Escape']
    },
    {
      name: 'Seen during easter',
      words: ['Bunny', 'Egg', 'Peep', 'Jelly Bean']
    },
    {
      name: 'Johns',
      words: ['Carpenter', 'Candy', 'Major', 'Legend']
    },
    {
      name: 'Bit of advice',
      words: ['Pointer', 'Suggestion', 'Tip', 'Trick']
    }
  ]
});

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

let cachedPuzzleIds = null;

export const getAvailablePuzzleIds = async () => {
  if (cachedPuzzleIds) {
    return cachedPuzzleIds;
  }
  
  try {
    const response = await fetch('/puzzles/puzzles.json');
    if (!response.ok) {
      throw new Error(`Failed to load puzzle list: ${response.status}`);
    }
    const data = await response.json();
    cachedPuzzleIds = data.puzzles;
    return cachedPuzzleIds;
  } catch (error) {
    console.error('Error loading puzzle list:', error);
    // Fallback to a few default puzzles if the JSON file fails to load
    return [
      'd7829759-c5fe-434a-ad38-8aee6e545df2',
      'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      'b2c3d4e5-f6g7-8901-bcde-f23456789012'
    ];
  }
};

export const getRandomPuzzleId = async (excludeId = null) => {
  const puzzleIds = await getAvailablePuzzleIds();
  const availableIds = excludeId ? puzzleIds.filter(id => id !== excludeId) : puzzleIds;
  
  if (availableIds.length === 0) {
    return puzzleIds[Math.floor(Math.random() * puzzleIds.length)];
  }
  
  return availableIds[Math.floor(Math.random() * availableIds.length)];
};