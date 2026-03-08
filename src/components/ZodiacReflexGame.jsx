import React, { useState, useEffect, useCallback, useMemo } from 'react';

const ZodiacReflexGame = ({ animal, onClose }) => {
  // All zodiac animals - moved outside component to avoid recreation
  const allAnimals = useMemo(() => [
    'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
    'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
  ], []);

  // Zodiac animal emojis - moved outside component to avoid recreation
  const animalEmojis = useMemo(() => ({
    Rat: '🐀', Ox: '🐂', Tiger: '🐯', Rabbit: '🐰',
    Dragon: '🐉', Snake: '🐍', Horse: '🐎', Goat: '🐐',
    Monkey: '🐒', Rooster: '🐔', Dog: '🐕', Pig: '🐖'
  }), []);

  // Shuffle array function
  const shuffleArray = useCallback((array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Initialize game positions
  const initializePositions = useCallback(() => {
    const shuffled = shuffleArray(allAnimals);
    return shuffled.map((animalName, index) => ({
      id: index,
      name: animalName,
      emoji: animalEmojis[animalName]
    }));
  }, [allAnimals, animalEmojis, shuffleArray]);

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameActive, setGameActive] = useState(true);
  const [gameComplete, setGameComplete] = useState(false);
  const [animalPositions, setAnimalPositions] = useState(() => initializePositions());
  const [clickedAnimal, setClickedAnimal] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Timer effect
  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false);
          setGameComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive]);

  // Handle animal click
  const handleAnimalClick = (clickedAnimalName) => {
    if (!gameActive) return;

    setClickedAnimal(clickedAnimalName);

    if (clickedAnimalName === animal) {
      // Correct click
      setScore((prev) => prev + 10);
      setFeedback({ type: 'correct', points: '+10' });
    } else {
      // Wrong click
      setScore((prev) => Math.max(0, prev - 5)); // Don't go below 0
      setFeedback({ type: 'wrong', points: '-5' });
    }

    // Clear feedback after animation
    setTimeout(() => {
      setFeedback(null);
      setClickedAnimal(null);
      // Shuffle positions for next round
      setAnimalPositions(initializePositions());
    }, 800);
  };

  const handlePlayAgain = () => {
    setScore(0);
    setTimeLeft(15);
    setGameActive(true);
    setGameComplete(false);
    setClickedAnimal(null);
    setFeedback(null);
    setAnimalPositions(initializePositions());
  };

  const getGameMessage = () => {
    if (score >= 100) return `Amazing reflexes! You scored ${score} points! 🏆`;
    if (score >= 50) return `Great job! You scored ${score} points! 🎉`;
    if (score >= 20) return `Good effort! You scored ${score} points! 👍`;
    return `Keep practicing! You scored ${score} points! 💪`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full p-6 sm:p-8 border border-yellow-500/20">
        {!gameComplete ? (
          <>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  Zodiac Reflex Challenge
                </h2>
                <p className="text-yellow-300/70 text-sm mt-1">
                  Find your {animal} {animalEmojis[animal]} among the others!
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-yellow-300 transition-colors text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Timer and Score */}
            <div className="flex justify-between items-center mb-6 gap-4">
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-2">Time Left</p>
                <div className="text-4xl font-bold text-yellow-400">
                  {timeLeft}s
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-2">Score</p>
                <div className="text-4xl font-bold text-yellow-400">
                  {score}
                </div>
              </div>
            </div>

            {/* Game Instructions */}
            <div className="text-center mb-6">
              <p className="text-gray-300 text-sm">
                Click your zodiac animal <span className="text-yellow-400 font-bold">{animal} {animalEmojis[animal]}</span>
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Correct: +10 points • Wrong: -5 points
              </p>
            </div>

            {/* Game Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 mb-6">
              {animalPositions.map((animalItem) => (
                <button
                  key={animalItem.id}
                  onClick={() => handleAnimalClick(animalItem.name)}
                  disabled={!gameActive}
                  className={`
                    aspect-square bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700
                    rounded-xl border-2 transition-all duration-200 transform hover:scale-105 active:scale-95
                    flex items-center justify-center text-4xl sm:text-5xl md:text-6xl shadow-lg
                    ${clickedAnimal === animalItem.name
                      ? animalItem.name === animal
                        ? 'border-green-400 bg-gradient-to-br from-green-500 to-green-600 animate-pulse'
                        : 'border-red-400 bg-gradient-to-br from-red-500 to-red-600 animate-pulse'
                      : 'border-yellow-500/30 hover:border-yellow-400'
                    }
                    ${!gameActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {animalItem.emoji}
                </button>
              ))}
            </div>

            {/* Feedback Animation */}
            {feedback && (
              <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className={`
                  text-6xl font-bold animate-bounce
                  ${feedback.type === 'correct' ? 'text-green-400' : 'text-red-400'}
                `}>
                  {feedback.points}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Game Complete Screen */
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent mb-4">
                Challenge Complete!
              </h3>
              <p className="text-yellow-300 text-lg mb-6">
                {getGameMessage()}
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6 mb-6 border border-yellow-500/20">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">Final Score</p>
                <p className="text-6xl font-bold text-yellow-400">{score}</p>
                <p className="text-gray-400 text-xs mt-2">
                  {score >= 100 ? 'Legendary Reflexes!' :
                   score >= 50 ? 'Great Performance!' :
                   score >= 20 ? 'Good Job!' : 'Keep Practicing!'}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handlePlayAgain}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-gray-900 font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Play Again 🎮
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-yellow-300 font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg border border-yellow-500/30"
              >
                Back to Zodiac
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZodiacReflexGame;