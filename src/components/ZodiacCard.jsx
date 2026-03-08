// src/components/ZodiacCard.jsx
import { useRef, useEffect, useState } from 'react';
import { ELEMENT_COLORS } from '../utils/zodiacData.js';
import ZodiacRaceGame from './ZodiacRaceGame.jsx';

export default function ZodiacCard({ zodiac }) {
  const prevAnimalRef = useRef(null);
  const iconRef = useRef(null);
  const [showRaceGame, setShowRaceGame] = useState(false);

  useEffect(() => {
    if (zodiac && zodiac.animal !== prevAnimalRef.current && iconRef.current) {
      // Trigger animation by adding transition class
      iconRef.current.classList.remove('transition');
      // Force reflow to restart animation
      void iconRef.current.offsetWidth;
      iconRef.current.classList.add('transition');
      prevAnimalRef.current = zodiac.animal;
    }
  }, [zodiac]);

  if (!zodiac) return null;

  const { animal, element, icon, symbolicMeaning, personalityOverview, luckyFlowers, luckyColors } = zodiac;
  const gradientClass = ELEMENT_COLORS[element];

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      {/* Main Zodiac Card - Fades in when revealed */}
      <div className={`bg-gradient-to-br ${gradientClass} rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 lg:p-16 text-white transform transition-all duration-700 hover:shadow-3xl card-fade-in`}>
        <div className="text-center">
          <div className="mb-8">
            {/* Animated Icon */}
            <div ref={iconRef} className="zodiac-icon mb-4 sm:mb-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl">{icon}</div>
            
            {/* Zodiac Name with Gold Accent */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-3 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-lg">
              {animal}
            </h2>
            
            {/* Element Badge */}
            <div className="inline-block px-4 sm:px-6 py-2 bg-white/20 backdrop-blur rounded-full text-sm sm:text-lg font-semibold">
              {element} Element
            </div>
          </div>
          
          {/* Info Section with Elegant Layout */}
          <div className="bg-black/20 backdrop-blur rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mt-6 sm:mt-8 space-y-4 sm:space-y-6 border border-white/10 w-full">
            <div>
              <p className="text-xs sm:text-sm font-bold text-yellow-200 uppercase tracking-widest mb-2">Symbolic Meaning</p>
              <p className="text-base sm:text-lg leading-relaxed font-medium">{symbolicMeaning}</p>
            </div>
            <div className="border-t border-white/20 pt-4 sm:pt-6">
              <p className="text-xs sm:text-sm font-bold text-yellow-200 uppercase tracking-widest mb-2 sm:mb-3">Your Personality</p>
              <p className="text-sm sm:text-base leading-relaxed opacity-95">{personalityOverview}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lucky Attributes Section - Stacked with elegant styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8 md:mt-12">
        {/* Lucky Flowers */}
        <div className="bg-gradient-to-br from-rose-400 via-pink-400 to-pink-500 rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 text-white card-fade-in" style={{animationDelay: '0.1s'}}>
          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">🌸</h3>
            <p className="text-xs sm:text-sm font-bold text-pink-100 uppercase tracking-wide mb-3 sm:mb-4">Lucky Flowers</p>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              {luckyFlowers.map((flower, idx) => (
                <li key={idx} className="capitalize bg-white/20 backdrop-blur px-3 py-2 rounded-lg">{flower}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lucky Colors */}
        <div className="bg-gradient-to-br from-indigo-400 via-purple-400 to-purple-500 rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 text-white card-fade-in" style={{animationDelay: '0.2s'}}>
          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">🎨</h3>
            <p className="text-xs sm:text-sm font-bold text-purple-100 uppercase tracking-wide mb-3 sm:mb-4">Lucky Colors</p>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              {luckyColors.map((color, idx) => (
                <span key={idx} className="bg-white/30 backdrop-blur px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm capitalize font-medium border border-white/40 hover:bg-white/40 transition-all duration-200">
                  {color}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mini Game Section */}
      <div className="mt-8 sm:mt-12 text-center">
        <button
          onClick={() => setShowRaceGame(true)}
          className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black font-bold rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg text-lg"
        >
          🏁 Play Zodiac Dash: The Celestial Race
        </button>
      </div>

      {/* Race Game Modal */}
      {showRaceGame && (
        <ZodiacRaceGame
          userZodiac={animal}
          onClose={() => setShowRaceGame(false)}
        />
      )}
    </div>
  );
}