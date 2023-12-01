import { describe, it, expect } from 'bun:test';
import { extractCode } from '.';

describe('extractCode', () => {
  describe('inputs with one digit', () => {
    it('should handle the exact string', () => {
      expect(extractCode('1')).toBe(11);
    });

    it('should handle code at the start', () => {
      expect(extractCode('1a')).toBe(11);
    });

    it('should handle code at the end', () => {
      expect(extractCode('a1')).toBe(11);
    });

    it('should handle code in the middle', () => {
      expect(extractCode('a1b')).toBe(11);
    });
  });

  describe('inputs with two digits', () => {
    it('should handle the exact string', () => {
      expect(extractCode('12')).toBe(12);
    });

    it('should handle code at the start', () => {
      expect(extractCode('12a')).toBe(12);
    });

    it('should handle code at the end', () => {
      expect(extractCode('a12')).toBe(12);
    });

    it('should handle code at the start and end', () => {
      expect(extractCode('1a2')).toBe(12);
    });

    it('should handle code in the middle', () => {
      expect(extractCode('a12b')).toBe(12);
    });

    it('should handle code interspersed', () => {
      expect(extractCode('a1b2c')).toBe(12);
    });
  });

  describe('inputs with three or more digits', () => {
    it('should handle three digits', () => {
      expect(extractCode('123')).toBe(13);
    });

    it('should handle ten digits', () => {
      expect(extractCode('1234567890')).toBe(10);
    });
  });
});
