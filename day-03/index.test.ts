import { describe, it, expect } from 'bun:test';
import {
  checkAboveOrBelow,
  checkDiagonals,
  checkIfAdjacent,
  checkLeftOrRight,
  convertToSchematic,
  findAndSumPartNumbers,
  isANumber,
  isASymbol,
} from '.';

describe('convertToSchematic', () => {
  it('converts a string array into a 2D array of characters', () => {
    const input = ['abc', 'def', 'ghi'];
    const expectedOutput = [
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
      ['g', 'h', 'i'],
    ];
    const actualOutput = convertToSchematic(input);
    expect(actualOutput).toEqual(expectedOutput);
  });
});

describe('isASymbol', () => {
  it('returns false if the character is a number', () => {
    const input = '5';
    const actualOutput = isASymbol(input);
    expect(actualOutput).toBe(false);
  });

  it('returns false if the character is a period', () => {
    const input = '.';
    const actualOutput = isASymbol(input);
    expect(actualOutput).toBe(false);
  });

  it('returns true if the character is a symbol', () => {
    const input = '*';
    const actualOutput = isASymbol(input);
    expect(actualOutput).toBe(true);
  });

  it('returns true if the character is a letter', () => {
    const input = 'a';
    const actualOutput = isASymbol(input);
    expect(actualOutput).toBe(true);
  });

  it('returns true if the character is a space', () => {
    const input = ' ';
    const actualOutput = isASymbol(input);
    expect(actualOutput).toBe(true);
  });
});

describe('isANumber', () => {
  it('returns false if the character is a symbol', () => {
    const input = '*';
    const actualOutput = isANumber(input);
    expect(actualOutput).toBe(false);
  });

  it('returns false if the character is a period', () => {
    const input = '.';
    const actualOutput = isANumber(input);
    expect(actualOutput).toBe(false);
  });

  it('returns true if the character is a number', () => {
    const input = '5';
    const actualOutput = isANumber(input);
    expect(actualOutput).toBe(true);
  });

  it('returns false if the character is a letter', () => {
    const input = 'a';
    const actualOutput = isANumber(input);
    expect(actualOutput).toBe(false);
  });

  it('returns false if the character is a space', () => {
    const input = ' ';
    const actualOutput = isANumber(input);
    expect(actualOutput).toBe(false);
  });
});

describe('checkAboveOrBelow', () => {
  it('returns false if the number is not above a symbol', () => {
    const input = [
      ['.', '.', '.'],
      ['.', '1', '.'],
      ['.', '.', '.'],
    ];
    const actualOutput = checkAboveOrBelow(input, 1, 1);
    expect(actualOutput).toBe(false);
  });

  it('returns false if the number is not below a symbol', () => {
    const input = [
      ['.', '.', '.'],
      ['.', '1', '.'],
      ['.', '.', '.'],
    ];
    const actualOutput = checkAboveOrBelow(input, 1, 1);
    expect(actualOutput).toBe(false);
  });

  it('returns true if the number is above a symbol', () => {
    const input = [
      ['.', '.', '.'],
      ['.', '1', '.'],
      ['.', '*', '.'],
    ];
    const actualOutput = checkAboveOrBelow(input, 1, 1);
    expect(actualOutput).toBe(true);
  });

  it('returns true if the number is below a symbol', () => {
    const input = [
      ['.', '*', '.'],
      ['.', '1', '.'],
      ['.', '.', '.'],
    ];
    const actualOutput = checkAboveOrBelow(input, 1, 1);
    expect(actualOutput).toBe(true);
  });
});

describe('checkLeftOrRight', () => {
  it('returns false if the number is not left of a symbol', () => {
    const input = [
      ['.', '.', '.'],
      ['.', '1', '.'],
      ['.', '.', '.'],
    ];
    const actualOutput = checkLeftOrRight(input, 1, 1);
    expect(actualOutput).toBe(false);
  });

  it('returns false if the number is not right of a symbol', () => {
    const input = [
      ['.', '.', '.'],
      ['.', '1', '.'],
      ['.', '.', '.'],
    ];
    const actualOutput = checkLeftOrRight(input, 1, 1);
    expect(actualOutput).toBe(false);
  });

  it('returns true if the number is left of a symbol', () => {
    const input = [
      ['.', '.', '.'],
      ['.', '1', '*'],
      ['.', '.', '.'],
    ];
    const actualOutput = checkLeftOrRight(input, 1, 1);
    expect(actualOutput).toBe(true);
  });

  it('returns true if the number is right of a symbol', () => {
    const input = [
      ['.', '.', '.'],
      ['*', '1', '.'],
      ['.', '.', '.'],
    ];
    const actualOutput = checkLeftOrRight(input, 1, 1);
    expect(actualOutput).toBe(true);
  });
});

describe('checkDiagonals', () => {
  it('returns false if the number is not diagonal of a symbol', () => {
    const input = [
      ['.', '.', '.'],
      ['.', '1', '.'],
      ['.', '.', '.'],
    ];
    const actualOutput = checkDiagonals(input, 1, 1);
    expect(actualOutput).toBe(false);
  });

  it('returns true if the number is top-left of a symbol', () => {
    const input = [
      ['.', '.', '.'],
      ['.', '1', '.'],
      ['.', '.', '*'],
    ];
    const actualOutput = checkDiagonals(input, 1, 1);
    expect(actualOutput).toBe(true);
  });

  it('returns true if the number is top-right of a symbol', () => {
    const input = [
      ['.', '.', '.'],
      ['.', '1', '.'],
      ['*', '.', '.'],
    ];
    const actualOutput = checkDiagonals(input, 1, 1);
    expect(actualOutput).toBe(true);
  });

  it('returns true if the number is bottom-left of a symbol', () => {
    const input = [
      ['.', '.', '*'],
      ['.', '1', '.'],
      ['.', '.', '.'],
    ];
    const actualOutput = checkDiagonals(input, 1, 1);
    expect(actualOutput).toBe(true);
  });

  it('returns true if the number is bottom-right of a symbol', () => {
    const input = [
      ['*', '.', '.'],
      ['.', '1', '.'],
      ['.', '.', '.'],
    ];
    const actualOutput = checkDiagonals(input, 1, 1);
    expect(actualOutput).toBe(true);
  });
});

describe('checkIfAdjacent', () => {
  it('returns false if the number is not adjacent to a symbol', () => {
    const input = [
      ['.', '.', '.'],
      ['.', '1', '.'],
      ['.', '.', '.'],
    ];
    const actualOutput = checkIfAdjacent(input, 1, 1);
    expect(actualOutput).toBe(false);
  });

  it('returns true if the number is above a symbol', () => {
    const input = [
      ['.', '.', '.'],
      ['.', '1', '.'],
      ['.', '*', '.'],
    ];
    const actualOutput = checkIfAdjacent(input, 1, 1);
    expect(actualOutput).toBe(true);
  });

  it('returns true if the number is left of a symbol', () => {
    const input = [
      ['.', '.', '.'],
      ['.', '1', '*'],
      ['.', '.', '.'],
    ];
    const actualOutput = checkIfAdjacent(input, 1, 1);
    expect(actualOutput).toBe(true);
  });

  it('returns true if the number is diagonal to a symbol', () => {
    const input = [
      ['.', '.', '*'],
      ['.', '1', '.'],
      ['.', '.', '.'],
    ];
    const actualOutput = checkIfAdjacent(input, 1, 1);
    expect(actualOutput).toBe(true);
  });
});

describe('findAndSumPartNumbers', () => {
  it('returns zero if there are no adjacent numbers', () => {
    const input = [
      ['.', '.', '.'],
      ['.', '*', '.'],
      ['.', '.', '.'],
    ];
    const actualOutput = findAndSumPartNumbers(input);
    expect(actualOutput).toBe(0);
  });

  it('returns the correct sum of diagonals', () => {
    const input = [
      ['1', '.', '3'],
      ['.', '*', '.'],
      ['5', '.', '9'],
    ];
    const actualOutput = findAndSumPartNumbers(input);
    expect(actualOutput).toBe(18);
  });

  it('returns the correct sum of orthogonals', () => {
    const input = [
      ['.', '2', '.'],
      ['4', '*', '6'],
      ['.', '8', '.'],
    ];
    const actualOutput = findAndSumPartNumbers(input);
    expect(actualOutput).toBe(20);
  });

  it('returns the correct sum of multi-digit diagonals and orthogonals', () => {
    const input = [
      ['1', '2', '.', '.'],
      ['.', '*', '3', '4'],
      ['.', '.', '.', '.'],
      ['.', '.', '+', '.'],
      ['5', '6', '.', '.'],
    ];
    const actualOutput = findAndSumPartNumbers(input);
    expect(actualOutput).toBe(102);
  });
});
