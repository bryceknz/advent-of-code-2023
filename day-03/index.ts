import { readFile } from '../utils';

const FILENAME = 'input.txt';
const DIRECTORY = import.meta.dir;

let SCHEMATIC: string[][];

readFile(DIRECTORY, FILENAME)
  .then(convertToSchematic)
  .then(findAndSumPartNumbers)
  .then(console.log)
  .catch(console.error);

/** Converts a string array into a 2D array of characters. */
export function convertToSchematic(schematicString: string[]): string[][] {
  return schematicString.map(line => line.split(''));
}

export function findAndSumPartNumbers(schematic = SCHEMATIC): number {
  let sum = 0;

  for (let x = 0; x < schematic.length; x++) {
    for (let y = 0; y < schematic[x].length; y++) {
      if (!isANumber(schematic[x][y])) continue;

      let numStr = schematic[x][y];
      let numDigits = 1;

      // Check for multi-digit number
      while (
        y + numDigits < schematic[x].length &&
        isANumber(schematic[x][y + numDigits])
      ) {
        numStr += schematic[x][y + numDigits];
        numDigits++;
      }

      // Check if any digit of the number is adjacent to a symbol
      for (let i = 0; i < numDigits; i++) {
        if (checkIfAdjacent(schematic, x, y + i)) {
          sum += Number.parseInt(numStr);
          break; // Break if any part of the number is adjacent to a symbol
        }
      }

      y += numDigits - 1; // Skip the next digits of the number we just processed
    }
  }

  return sum;
}

/** Checks if the character is adjacent to a symbol. */
export function checkIfAdjacent(
  schematic = SCHEMATIC,
  x: number,
  y: number
): boolean {
  return (
    checkAboveOrBelow(schematic, x, y) ||
    checkLeftOrRight(schematic, x, y) ||
    checkDiagonals(schematic, x, y)
  );
}

/** Checks if the character is a symbol, i.e. not a number or a period. */
export function isASymbol(char: string): boolean {
  const regex = /[^\d\.]/;
  return regex.test(char);
}

/** Checks if the character is a number. */
export function isANumber(char: string): boolean {
  const regex = /\d/;
  return regex.test(char);
}

/** Checks if the character is above or below a symbol. */
export function checkAboveOrBelow(
  schematic = SCHEMATIC,
  x: number,
  y: number
): boolean {
  // Check above
  if (x > 0 && isASymbol(schematic[x - 1][y])) return true;

  // Check below
  if (x < schematic.length - 1 && isASymbol(schematic[x + 1][y])) return true;

  return false;
}

/** Checks if the character is left or right of a symbol. */
export function checkLeftOrRight(
  schematic = SCHEMATIC,
  x: number,
  y: number
): boolean {
  // Check left
  if (y > 0 && isASymbol(schematic[x][y - 1])) return true;

  // Check right
  if (y < schematic[0].length - 1 && isASymbol(schematic[x][y + 1]))
    return true;

  return false;
}

/** Checks if the character is diagonal to a symbol. */
export function checkDiagonals(
  schematic = SCHEMATIC,
  x: number,
  y: number
): boolean {
  const diagonals = [
    [-1, -1], // top-left
    [-1, 1], // top-right
    [1, -1], // bottom-left
    [1, 1], // bottom-right
  ];

  // Check each diagonal
  for (const [dx, dy] of diagonals) {
    const newX = x + dx;
    const newY = y + dy;

    if (
      newX >= 0 &&
      newX < schematic.length &&
      newY >= 0 &&
      newY < schematic[0].length
    ) {
      if (isASymbol(schematic[newX][newY])) return true;
    }
  }

  return false;
}
