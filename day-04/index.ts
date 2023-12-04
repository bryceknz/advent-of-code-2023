import { readFile } from '../utils';
import { Card } from './types';

const FILENAME = 'input.txt';
const DIRECTORY = import.meta.dir;

readFile(DIRECTORY, FILENAME)
  .then(processInput)
  .then(calculateTotalScore)
  .then(console.log)
  .catch(console.error);

/** Processes the input into a list of cards. */
function processInput(input: string[]): Card[] {
  return input.map(line => parseCard(line));
}

/** Parses a line of text into a card. */
export function parseCard(line: string): Card {
  const lineRegex = /^Card\s+(\d+):\s+([\d\s]+)\s+\|\s+([\d\s]+)$/;
  const [, gameNumber, winning, yours] = lineRegex.exec(line) ?? [];

  return {
    gameNumber: Number(gameNumber),
    winningNumbers: winning.split(/\s+/).map(Number),
    yourNumbers: yours.split(/\s+/).map(Number),
  };
}

/** Calculates the total score of the given cards. */
function calculateTotalScore(cards: Card[]): number {
  const matches = cards.map(checkMatches);

  return matches.reduce((total, currentMatches) => {
    return total + calculateScore(currentMatches);
  }, 0);
}

/** Matches the winning numbers to the card's numbers and returns the matches. */
export function checkMatches(card: Card): number[] {
  return card.yourNumbers.filter(number =>
    card.winningNumbers.includes(number)
  );
}

/** Calculates the score based on the number of matches.
 * The formula is `2^(n-1)` or `0` if no matches. */
export function calculateScore(matches: number[]): number {
  return matches.length > 0 ? Math.pow(2, matches.length - 1) : 0;
}
