import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomPuzzleId } from '../utils/puzzleLoader';

const RandomPuzzleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const randomPuzzleId = getRandomPuzzleId();
    navigate(`/puzzle/${randomPuzzleId}`, { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-xl">Loading random puzzle...</div>
    </div>
  );
};

export default RandomPuzzleRedirect;