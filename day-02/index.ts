import { Game, Set } from './types';
import { readFile } from '../utils';

const FILENAME = 'input.txt';
const DIRECTORY = import.meta.dir;

readFile(DIRECTORY, FILENAME).then(processContent).catch(console.error);

/** Processes each line and returns the sum of the valid game nubmers. */
function processContent(content: string[]): number {
  const games = content.map(parseGame);

  const validGames = games
    .map(game => ({ number: game.number, isValid: checkIfGameIsValid(game) }))
    .filter(game => game.isValid);

  const sumOfValidGameNumbers = validGames.reduce((acc, game) => {
    return acc + game.number;
  }, 0);

  console.log(sumOfValidGameNumbers);
  return sumOfValidGameNumbers;
}

/** Parses a line of input into a game object. */
export function parseGame(line: string): Game {
  const [, number, setsString] = line.match(/^Game (\d+): (.+)$/)!;
  const regex = /(\d+) (red|green|blue)/g;

  const sets = setsString.split('; ').map(set => {
    const colorCounts: Set = { red: 0, green: 0, blue: 0 };

    for (const match of set.matchAll(regex)) {
      const [_, count, color] = match;
      colorCounts[color as keyof Set] += Number.parseInt(count);
    }

    return colorCounts;
  });

  return { number: Number(number), sets };
}

/** Checks if a game is possible with only 12 red, 13 green, and 14 blue cubes. */
export function checkIfGameIsValid({ sets }: Game): boolean {
  const maxColors: Set = { red: 12, green: 13, blue: 14 };

  return sets.every(set =>
    (Object.keys(maxColors) as Array<keyof Set>).every(
      color => set[color] <= maxColors[color]
    )
  );
}
