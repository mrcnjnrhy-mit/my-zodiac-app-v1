// src/components/ZodiacApp.jsx
import { useState } from 'react';
import YearInput from './YearInput.jsx';
import ZodiacCard from './ZodiacCard.jsx';
import { getZodiac } from '../utils/zodiacLogic.js';

export default function ZodiacApp() {
  const [zodiac, setZodiac] = useState(null);

  const handleYearSubmit = (year) => {
    const result = getZodiac(year);
    setZodiac(result);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="flex flex-col items-center justify-start md:justify-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-16 pt-6 md:pt-0 w-full max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
            Zodiac Zen
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed">
            Discover your zodiac animal and elemental sign to unlock ancient cosmic wisdom
          </p>
        </div>

        {/* Main Content Container */}
        <div className="w-full flex flex-col items-center justify-center gap-8 md:gap-12 flex-1">
          <YearInput onYearSubmit={handleYearSubmit} />
          {zodiac && <ZodiacCard zodiac={zodiac} />}
        </div>
      </div>
    </div>
  );
}