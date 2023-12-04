import { describe, it, expect } from 'bun:test';
import { calculateScore, checkMatches, parseCard } from '.';

describe('parseCard', () => {
  it('should handle single digit input', () => {
    const line = 'Card 1: 1 2 3 | 4 5 6';
    const card = parseCard(line);

    expect(card).toEqual({
      gameNumber: 1,
      winningNumbers: [1, 2, 3],
      yourNumbers: [4, 5, 6],
    });
  });

  it('should handle multi-digit input', () => {
    const line = 'Card 1: 10 20 30 | 40 50 60';
    const card = parseCard(line);

    expect(card).toEqual({
      gameNumber: 1,
      winningNumbers: [10, 20, 30],
      yourNumbers: [40, 50, 60],
    });
  });

  it('should handle zero-prefixed numbers', () => {
    const line = 'Card 01: 01 02 03 | 04 05 06';
    const card = parseCard(line);

    expect(card).toEqual({
      gameNumber: 1,
      winningNumbers: [1, 2, 3],
      yourNumbers: [4, 5, 6],
    });
  });

  it('should handle multiple spaces between numbers', () => {
    const line = 'Card   1:   1   2 |   3   4';
    const card = parseCard(line);

    expect(card).toEqual({
      gameNumber: 1,
      winningNumbers: [1, 2],
      yourNumbers: [3, 4],
    });
  });
});

describe('checkMatches', () => {
  it('should return an empty array for no matches', () => {
    const card = {
      gameNumber: 1,
      winningNumbers: [1, 2, 3],
      yourNumbers: [4, 5, 6],
    };

    expect(checkMatches(card)).toEqual([]);
  });

  it('should correctly match one number', () => {
    const card = {
      gameNumber: 1,
      winningNumbers: [1, 2, 3],
      yourNumbers: [1, 5, 6],
    };

    expect(checkMatches(card)).toEqual([1]);
  });

  it('should correctly match multiple numbers', () => {
    const card = {
      gameNumber: 1,
      winningNumbers: [1, 2, 3, 4, 5, 6],
      yourNumbers: [1, 3, 5, 7, 9, 11],
    };

    expect(checkMatches(card)).toEqual([1, 3, 5]);
  });
});

describe('calculateScore', () => {
  it('should return 0 for no matches', () => {
    expect(calculateScore([])).toBe(0);
  });

  it('should return 1 for one match', () => {
    expect(calculateScore([1])).toBe(1);
  });

  it('should return 2 for two matches', () => {
    expect(calculateScore([1, 2])).toBe(2);
  });

  it('should return 4 for three matches', () => {
    expect(calculateScore([1, 2, 3])).toBe(4);
  });

  it('should return 8 for four matches', () => {
    expect(calculateScore([1, 2, 3, 4])).toBe(8);
  });
});
