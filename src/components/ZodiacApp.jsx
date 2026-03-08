// src/components/ZodiacApp.jsx
import { useState } from 'react';
import YearInput from './YearInput.jsx';
import ZodiacCard from './ZodiacCard.jsx';
import { getZodiac } from '../utils/zodiacLogic.js';

export default function ZodiacApp() {
  const [zodiac, setZodiac] = useState(null);
  const [year, setYear] = useState(null);

  const handleYearSubmit = (year) => {
    const result = getZodiac(year);
    setZodiac(result);
    setYear(year);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center justify-start md:justify-center p-4 md:p-8">
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-16 pt-6 md:pt-0 w-full max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
          Chinese Zodiac Explorer
        </h1>
        <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
          Discover your zodiac animal and elemental sign to unlock ancient cosmic wisdom
        </p>
      </div>

      {/* Main Content Container */}
      <div className="w-full flex-1 flex flex-col items-center justify-center">
        <YearInput onYearSubmit={handleYearSubmit} />
        {zodiac && <ZodiacCard zodiac={zodiac} year={year} />}
      </div>
    </div>
  );
}