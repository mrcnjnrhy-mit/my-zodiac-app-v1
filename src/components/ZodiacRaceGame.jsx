import React, { useState, useEffect, useCallback, useRef } from 'react';

// Zodiac animals data - simplified to emoji-only
const zodiacAnimals = [
  { name: 'Rat', emoji: '🐀' },
  { name: 'Ox', emoji: '🐂' },
  { name: 'Tiger', emoji: '🐯' },
  { name: 'Rabbit', emoji: '🐰' },
  { name: 'Dragon', emoji: '🐉' },
  { name: 'Snake', emoji: '🐍' },
  { name: 'Horse', emoji: '🐎' },
  { name: 'Goat', emoji: '🐐' },
  { name: 'Monkey', emoji: '🐒' },
  { name: 'Rooster', emoji: '🐔' },
  { name: 'Dog', emoji: '🐕' },
  { name: 'Pig', emoji: '🐖' }
];

const ZodiacRaceGame = ({ userZodiac, onClose }) => {
  // Track dimensions - responsive
  const getTrackWidth = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      // More aggressive scaling for desktop/laptop to keep it in view
      if (width > 1280) return 500;
      if (width > 768) return 400;
      if (width > 480) return 300;
      return width - 100; // Mobile fallback
    }
    return 300;
  };

  // Initialize positions object - all animals start at zero
  const getInitialPositions = useCallback(() => {
    const initialPositions = {};
    zodiacAnimals.forEach(animal => {
      initialPositions[animal.name] = 0;
    });
    return initialPositions;
  }, []);

  // Race state
  const [raceStarted, setRaceStarted] = useState(false);
  const [raceFinished, setRaceFinished] = useState(false);
  const [winner, setWinner] = useState(null);
  const [positions, setPositions] = useState(getInitialPositions);
  const [clickCount, setClickCount] = useState(0);
  const [trackWidth, setTrackWidth] = useState(getTrackWidth);
  const gameAreaRef = useRef(null);
  const npcIntervalRef = useRef(null);

  // Initialize race state
  const initializeRace = useCallback(() => {
    setPositions(getInitialPositions());
    setWinner(null);
    setRaceFinished(false);
    setRaceStarted(false);
    setClickCount(0);
  }, [getInitialPositions]);

  // Determine current leader from positions
  const leader = React.useMemo(() => {
    let maxPos = -1;
    let lead = null;
    Object.entries(positions).forEach(([name, pos]) => {
      if (pos > maxPos) {
        maxPos = pos;
        lead = name;
      }
    });
    return lead;
  }, [positions]);

  // Handle player click/tap to move their animal only
  const handlePlayerMove = useCallback(() => {
    if (!raceStarted || raceFinished) return;

    setPositions(prev => {
      const newPos = { ...prev };
      const playerMove = 8; // Balanced step per tap
      newPos[userZodiac] = Math.min(trackWidth, newPos[userZodiac] + playerMove);
      if (newPos[userZodiac] >= trackWidth && !winner) {
        setWinner(userZodiac);
        setRaceFinished(true);
      }
      return newPos;
    });

    setClickCount(prev => prev + 1);
  }, [raceStarted, raceFinished, trackWidth, userZodiac, winner]);

  // Start the race
  const startRace = () => {
    initializeRace();
    setRaceStarted(true);
  };

  // Reset the race
  const resetRace = () => {
    if (npcIntervalRef.current) clearInterval(npcIntervalRef.current);
    initializeRace();
  };

  // Handle exit game
  const handleExitGame = () => {
    if (npcIntervalRef.current) clearInterval(npcIntervalRef.current);
    onClose();
  };

  // Handle window resize for responsive track width
  useEffect(() => {
    const handleResize = () => {
      setTrackWidth(getTrackWidth());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // NPC automatic movement effect
  useEffect(() => {
    if (raceStarted && !raceFinished) {
      if (npcIntervalRef.current) clearInterval(npcIntervalRef.current);
      npcIntervalRef.current = setInterval(() => {
        setPositions(prev => {
          const newPos = { ...prev };
          zodiacAnimals.forEach(animal => {
            if (animal.name !== userZodiac) {
              const speed = Math.random() * 3 + 3; // Balanced 3-6px per tick
              newPos[animal.name] = Math.min(trackWidth, newPos[animal.name] + speed);
              if (newPos[animal.name] >= trackWidth && !winner) {
                setWinner(animal.name);
                setRaceFinished(true);
              }
            }
          });
          return newPos;
        });
      }, 150);
    }

    return () => {
      if (npcIntervalRef.current) clearInterval(npcIntervalRef.current);
    };
  }, [raceStarted, raceFinished, trackWidth, userZodiac, winner]);

  // Add click/tap event listeners for player movement
  useEffect(() => {
    const gameArea = gameAreaRef.current;
    if (gameArea && raceStarted && !raceFinished) {
      const handleClick = () => handlePlayerMove();
      const handleTouch = (e) => {
        e.preventDefault();
        handlePlayerMove();
      };

      gameArea.addEventListener('click', handleClick);
      gameArea.addEventListener('touchstart', handleTouch, { passive: false });

      return () => {
        gameArea.removeEventListener('click', handleClick);
        gameArea.removeEventListener('touchstart', handleTouch);
      };
    }
  }, [raceStarted, raceFinished, handlePlayerMove]);

  // Get winner message
  const getWinnerMessage = () => {
    if (!winner) return '';
    const luckyMsg = winner === userZodiac ? " Your Zodiac Win the Race! You are Lucky Today!" : "";
    return `🏆 The race has finished!${luckyMsg}`;
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-2 sm:p-4 z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-4xl mx-auto p-4 sm:p-6 border border-yellow-500/20 max-h-[95vh] overflow-y-auto">
        {/* Header with Exit Button */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Zodiac Dash: The Celestial Race
            </h2>
            <p className="text-yellow-300/70 text-xs sm:text-sm mt-1">
              Click or tap to move your zodiac!
            </p>
          </div>
          <button
            onClick={handleExitGame}
            className="text-gray-400 hover:text-yellow-300 transition-colors text-xl sm:text-2xl ml-4 flex-shrink-0"
            aria-label="Exit Game"
          >
            ✕
          </button>
        </div>

        {/* Race Track - Multi-Lane Layout */}
        <div className="mb-4 sm:mb-6 overflow-x-auto pb-4">
          <div
            ref={gameAreaRef}
            className="relative bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-2 sm:p-4 border border-yellow-500/20 cursor-pointer select-none mx-auto"
            style={{ width: trackWidth + 100 }}
          >
            {/* Start line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-green-400"></div>
            <div className="absolute left-2 top-2 text-green-400 text-xs font-bold">START</div>

            {/* Finish line (checkered) */}
            <div
              className="absolute top-0 bottom-0"
              style={{
                left: trackWidth + 32,
                width: '8px',
                backgroundImage:
                  'repeating-linear-gradient(45deg, rgba(255,255,255,0.3) 0, rgba(255,255,255,0.3) 8px, rgba(0,0,0,0.3) 8px, rgba(0,0,0,0.3) 16px)'
              }}
            ></div>
            <div
              className="absolute top-2 text-yellow-400 text-xs font-bold"
              style={{ left: trackWidth + 42 }}
            >
              FINISH
            </div>

            {/* Lanes */}
            <div className="space-y-1">
              {zodiacAnimals.map(animal => {
                const position = positions[animal.name] || 0;
                const isWinner = winner === animal.name;
                const isPlayerAnimal = animal.name === userZodiac;
                const isLeader = animal.name === leader;

                return (
                  <div
                    key={animal.name}
                    className={`relative h-7 sm:h-8 bg-gray-700/30 rounded border border-gray-600/20 overflow-hidden ${isPlayerAnimal ? 'bg-yellow-500/10 border-yellow-500/30' : ''}`}
                  >
                    {/* lane line */}
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full h-px bg-gray-600/30"></div>
                    </div>

                    {/* animal emoji */}
                    <div
                      className={`absolute top-0 h-full flex items-center transition-all duration-200 ease-out ${
                        isLeader && !isWinner ? 'ring-2 ring-yellow-300 shadow-lg' : ''
                      } ${isWinner ? 'animate-bounce z-20' : ''}`}
                      style={{ left: `${position}px` }}
                    >
                      <span
                        className={`text-lg sm:text-xl ${
                          isPlayerAnimal ? 'drop-shadow-lg' : ''
                        }`}
                      >
                        {animal.emoji}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Click counter and instructions */}
          {raceStarted && !raceFinished && (
            <div className="mt-4 text-center">
              <div className="text-yellow-300 text-sm sm:text-base font-medium">
                Clicks: {clickCount}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm mt-1">
                Click or tap to move your {userZodiac}!
              </div>
            </div>
          )}
        </div>

        {/* Winner Message */}
        {raceFinished && winner && (
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-500/30 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-4 font-bold text-yellow-300">
                {getWinnerMessage()}
              </div>
              <div className="text-gray-300 text-sm sm:text-base">
                Total clicks: {clickCount}
              </div>
            </div>
          </div>
        )}

        {/* Control Buttons - Responsive Layout */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {!raceStarted && !raceFinished && (
            <button
              onClick={startRace}
              className="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-300 hover:to-green-500 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg text-sm sm:text-base"
            >
              🏁 Start Race
            </button>
          )}

          {raceStarted && !raceFinished && (
            <div className="flex-1 text-center py-3">
              <div className="text-yellow-400 font-bold text-base sm:text-lg animate-pulse">
                🖱️ Tap to move your {userZodiac}!
              </div>
            </div>
          )}

          {(raceFinished || raceStarted) && (
            <button
              onClick={resetRace}
              className="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-300 hover:to-blue-500 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg text-sm sm:text-base"
            >
              🔄 Race Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZodiacRaceGame;