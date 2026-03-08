// src/components/ZodiacCard.jsx
import { useRef, useEffect } from 'react';
import { ELEMENT_COLORS } from '../utils/zodiacData.js';
import { getWorldEvent } from '../utils/worldEvents.js';

export default function ZodiacCard({ zodiac, year }) {
  const prevAnimalRef = useRef(null);
  const iconRef = useRef(null);

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
    <div className="w-full max-w-3xl mx-auto">
      {/* Main Zodiac Card - Fades in when revealed */}
      <div className={`bg-gradient-to-br ${gradientClass} rounded-3xl shadow-2xl p-8 md:p-12 text-white transform transition-all duration-700 hover:shadow-3xl card-fade-in`}>
        <div className="text-center">
          <div className="mb-8">
            {/* Animated Icon */}
            <div ref={iconRef} className="zodiac-icon mb-6">{icon}</div>
            
            {/* Zodiac Name with Gold Accent */}
            <h2 className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-lg">
              {animal}
            </h2>
            
            {/* Element Badge */}
            <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur rounded-full text-lg font-semibold">
              {element} Element
            </div>
          </div>
          
          {/* Info Section with Elegant Layout */}
          <div className="bg-black/20 backdrop-blur rounded-2xl p-6 md:p-8 mt-8 space-y-6 border border-white/10">
            <div>
              <p className="text-sm font-bold text-yellow-200 uppercase tracking-widest mb-2">Symbolic Meaning</p>
              <p className="text-lg leading-relaxed font-medium">{symbolicMeaning}</p>
            </div>
            <div className="border-t border-white/20 pt-6">
              <p className="text-sm font-bold text-yellow-200 uppercase tracking-widest mb-3">Your Personality</p>
              <p className="text-base leading-relaxed opacity-95">{personalityOverview}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lucky Attributes Section - Stacked with elegant styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Lucky Flowers */}
        <div className="bg-gradient-to-br from-rose-400 via-pink-400 to-pink-500 rounded-2xl shadow-lg p-8 text-white card-fade-in" style={{animationDelay: '0.1s'}}>
          <div className="text-center">
            <h3 className="text-4xl mb-4">🌸</h3>
            <p className="text-sm font-bold text-pink-100 uppercase tracking-wide mb-4">Lucky Flowers</p>
            <ul className="space-y-2 text-sm font-medium">
              {luckyFlowers.map((flower, idx) => (
                <li key={idx} className="capitalize bg-white/20 backdrop-blur px-3 py-2 rounded-lg">{flower}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lucky Colors */}
        <div className="bg-gradient-to-br from-indigo-400 via-purple-400 to-purple-500 rounded-2xl shadow-lg p-8 text-white card-fade-in" style={{animationDelay: '0.2s'}}>
          <div className="text-center">
            <h3 className="text-4xl mb-4">🎨</h3>
            <p className="text-sm font-bold text-purple-100 uppercase tracking-wide mb-4">Lucky Colors</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {luckyColors.map((color, idx) => (
                <span key={idx} className="bg-white/30 backdrop-blur px-4 py-2 rounded-full text-sm capitalize font-medium border border-white/40 hover:bg-white/40 transition-all duration-200">
                  {color}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* World Event Fun Fact */}
      {year && (
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl shadow-lg p-8 text-gray-900 mt-8 card-fade-in" style={{animationDelay: '0.3s'}}>
          <p className="text-center font-bold text-lg">{getWorldEvent(year)}</p>
        </div>
      )}
    </div>
  );
}