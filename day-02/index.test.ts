import { describe, it, expect } from 'bun:test';
import { checkIfGameIsValid, parseGame } from '.';

describe('parseGame', () => {
  describe('game number', () => {
    it('should handle a single digit', () => {
      const input = 'Game 1: 1 red, 2 green, 3 blue';
      const expected = 1;

      const actual = parseGame(input);
      expect(actual).toHaveProperty('number', expected);
    });

    it('should handle multiple digits', () => {
      const input = 'Game 123: 1 red, 2 green, 3 blue';
      const expected = 123;

      const actual = parseGame(input);
      expect(actual).toHaveProperty('number', expected);
    });
  });

  describe('sets', () => {
    it('should parse an ordered set', () => {
      const input = 'Game 1: 1 red, 2 green, 3 blue';
      const expected = [{ red: 1, green: 2, blue: 3 }];

      const actual = parseGame(input);
      expect(actual).toHaveProperty('sets', expected);
    });

    it('should parse an unordered set', () => {
      const input = 'Game 1: 2 green, 1 red, 3 blue';
      const expected = [{ red: 1, green: 2, blue: 3 }];

      const actual = parseGame(input);
      expect(actual).toHaveProperty('sets', expected);
    });

    it('should parse multiple sets', () => {
      const input = 'Game 1: 1 red, 2 green, 3 blue; 4 red, 5 green, 6 blue';
      const expected = [
        { red: 1, green: 2, blue: 3 },
        { red: 4, green: 5, blue: 6 },
      ];

      const actual = parseGame(input);
      expect(actual).toHaveProperty('sets', expected);
    });

    it('should parse sets with missing colors', () => {
      const input = 'Game 1: 1 red, 2 green; 3 blue';
      const expected = [
        { red: 1, green: 2, blue: 0 },
        { red: 0, green: 0, blue: 3 },
      ];

      const actual = parseGame(input);
      expect(actual).toHaveProperty('sets', expected);
    });
  });
});

describe('checkIfGameIsValid', () => {
  it('should return true for a valid game', () => {
    const input = {
      number: 1,
      sets: [{ red: 1, green: 2, blue: 3 }],
    };

    const actual = checkIfGameIsValid(input);
    expect(actual).toBe(true);
  });

  it('should return false for a game with too many red cubes', () => {
    const input = {
      number: 1,
      sets: [{ red: 13, green: 2, blue: 3 }],
    };

    const actual = checkIfGameIsValid(input);
    expect(actual).toBe(false);
  });

  it('should return false for a game with too many green cubes', () => {
    const input = {
      number: 1,
      sets: [{ red: 1, green: 14, blue: 3 }],
    };

    const actual = checkIfGameIsValid(input);
    expect(actual).toBe(false);
  });

  it('should return false for a game with too many blue cubes', () => {
    const input = {
      number: 1,
      sets: [{ red: 1, green: 2, blue: 15 }],
    };

    const actual = checkIfGameIsValid(input);
    expect(actual).toBe(false);
  });
});
