// src/components/YearInput.jsx
import { useState } from 'react';

const MIN_YEAR = 1900;
const MAX_YEAR = 2030;

export default function YearInput({ onYearSubmit }) {
  const [year, setYear] = useState(MIN_YEAR);
  const [manualInput, setManualInput] = useState('');
  const [error, setError] = useState('');

  const handleSliderChange = (e) => {
    const yearNum = parseInt(e.target.value);
    setYear(yearNum);
    setError('');
    setManualInput('');
    onYearSubmit(yearNum);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    const yearNum = parseInt(manualInput);
    
    if (isNaN(yearNum) || yearNum < MIN_YEAR || yearNum > MAX_YEAR) {
      setError(`Please enter a valid year between ${MIN_YEAR} and ${MAX_YEAR}`);
      return;
    }
    
    setError('');
    setYear(yearNum);
    setManualInput('');
    onYearSubmit(yearNum);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      {/* Elevated Card Container */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl shadow-2xl backdrop-blur-sm border border-gray-700 p-8 md:p-10">
        <div className="flex flex-col items-center space-y-8">
          {/* Slider Section */}
          <div className="w-full">
            <label htmlFor="year-slider" className="text-lg font-semibold text-gray-100 block mb-6 text-center">
              <span className="block text-sm text-gray-400 mb-2">SELECT YOUR BIRTH YEAR</span>
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent text-4xl font-bold">{year}</span>
            </label>
            <div className="px-2">
              <input
                id="year-slider"
                type="range"
                min={MIN_YEAR}
                max={MAX_YEAR}
                value={year}
                onChange={handleSliderChange}
                className="w-full cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-3 px-2">
              <span>{MIN_YEAR}</span>
              <span>{MAX_YEAR}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

          {/* Manual Input Section */}
          <form onSubmit={handleManualSubmit} className="w-full space-y-4">
            <label className="block text-sm text-gray-400 text-center mb-2">Or enter your birth year manually</label>
            <input
              type="number"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Enter your birth year (e.g., 1995)"
              className="w-full px-5 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
              min={MIN_YEAR}
              max={MAX_YEAR}
            />
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
            >
              Reveal My Zodiac ✨
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}