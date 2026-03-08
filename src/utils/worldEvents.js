// src/utils/worldEvents.js
// Major world events database for fun facts

export const WORLD_EVENTS = {
  1900: "The Boxer Rebellion begins in China",
  1905: "Einstein publishes his theory of special relativity",
  1909: "Robert Peary reaches the North Pole",
  1912: "Titanic sinks after hitting an iceberg",
  1914: "World War I begins",
  1918: "World War I ends",
  1920: "Women gain the right to vote in the USA",
  1927: "Charles Lindbergh completes the first solo transatlantic flight",
  1941: "Pearl Harbor is attacked; USA enters World War II",
  1945: "World War II ends",
  1950: "Korean War begins",
  1957: "Sputnik 1 becomes the first artificial satellite",
  1962: "Cuban Missile Crisis occurs",
  1969: "Apollo 11 moon landing; Neil Armstrong walks on the moon",
  1974: "Watergate scandal leads to President Nixon's resignation",
  1980: "Mount St. Helens erupts in Washington State",
  1984: "Apple releases the Macintosh computer",
  1986: "Chernobyl nuclear disaster occurs in the Soviet Union",
  1988: "Seoul hosts the Summer Olympic Games",
  1989: "Berlin Wall falls, marking the end of the Cold War",
  1990: "Nelson Mandela is released from prison in South Africa",
  1991: "Gulf War begins; Soviet Union dissolves",
  1992: "Barcelona hosts the Summer Olympic Games; LA riots occur",
  1997: "Dolly the sheep becomes the first cloned mammal; Princess Diana dies",
  2001: "September 11 terrorist attacks occur in the USA",
  2003: "Iraq War begins",
  2008: "Global financial crisis hits the world; Barack Obama elected president",
  2010: "Haiti experiences a devastating earthquake",
  2011: "Arab Spring uprisings begin; Japan earthquake and tsunami",
  2012: "London hosts the Summer Olympic Games",
  2016: "Donald Trump elected as US President; Brexit vote in UK",
  2020: "COVID-19 pandemic declared; world enters lockdown",
  2022: "Russia invades Ukraine",
  2024: "Paris hosts the Summer Olympic Games",
  2025: "Artificial Intelligence continues to revolutionize industries"
};

/**
 * Get a fun fact about a major world event from a specific year
 * @param {number} year - The year to get the event for
 * @returns {string} Fun fact about that year
 */
export function getWorldEvent(year) {
  if (WORLD_EVENTS[year]) {
    return `In ${year}: ${WORLD_EVENTS[year]}`;
  }
  
  // If exact year not found, find nearest event
  const years = Object.keys(WORLD_EVENTS).map(Number).sort((a, b) => a - b);
  let nearestYear = years[0];
  
  for (let y of years) {
    if (y <= year) {
      nearestYear = y;
    } else {
      break;
    }
  }
  
  return `Around ${nearestYear}: ${WORLD_EVENTS[nearestYear]}`;
}