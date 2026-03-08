// src/utils/zodiacLogic.js
import { ZODIAC_ANIMALS, ZODIAC_ELEMENTS, ZODIAC_DETAILS } from './zodiacData.js';

/**
 * Calculate Chinese Zodiac information for a given year
 * 
 * Algorithm Explanation:
 * 
 * 12-Year Zodiac Cycle:
 * The Chinese zodiac follows a 12-year cycle represented by animals.
 * The cycle begins with the Rat in the year 1900 and repeats every 12 years.
 * To determine the animal: (year - 1900) % 12 gives the index in the animal array.
 * 
 * 5-Element Rotation:
 * Elements cycle every 2 years based on the sexagenary (60-year) cycle.
 * This combines 10 heavenly stems (5 elements × 2 polarities) with 12 earthly branches.
 * Element pattern over 10 years: Metal, Metal, Water, Water, Wood, Wood, Fire, Fire, Earth, Earth
 * To determine the element: use a lookup table based on (year - 1900) % 10
 * 
 * @param {number} year - Birth year
 * @returns {object} { animal, element, symbolicMeaning, personalityOverview }
 */
export function getZodiac(year) {
  // Calculate animal index: 12-year cycle starting from Rat in 1900
  const animalIndex = (year - 1900) % 12;
  
  // Element cycle: Metal, Metal, Water, Water, Wood, Wood, Fire, Fire, Earth, Earth
  const elementCycle = [3, 3, 4, 4, 0, 0, 1, 1, 2, 2]; // indices in ZODIAC_ELEMENTS
  const elementIndex = elementCycle[(year - 1900) % 10];

  const details = ZODIAC_DETAILS[animalIndex];

  return {
    animal: details.animal,
    element: ZODIAC_ELEMENTS[elementIndex],
    icon: details.icon,
    symbolicMeaning: details.symbolicMeaning,
    personalityOverview: details.personalityOverview,
    luckyFlowers: details.luckyFlowers,
    luckyColors: details.luckyColors
  };
}

/**
 * Validate if year is within reasonable range
 * @param {number} year
 * @returns {boolean}
 */
export function isValidYear(year) {
  const currentYear = new Date().getFullYear();
  return year >= 1900 && year <= currentYear + 1;
}