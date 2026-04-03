import { describe, expect, it } from 'vitest';
import { isValidAddress } from './addressValidator';

describe('addressValidator', () => {
  it('accepts valid 0x addresses', () => {
    expect(isValidAddress('0x0000000000000000000000000000000000000000')).toBe(true);
    expect(isValidAddress('0x1234567890abcdef1234567890abcdef12345678')).toBe(true);
  });

  it('rejects invalid addresses', () => {
    expect(isValidAddress('')).toBe(false);
    expect(isValidAddress('0x123')).toBe(false);
    expect(isValidAddress('0xG234567890abcdef1234567890abcdef12345678')).toBe(false);
    // 40-hex without 0x is accepted (we normalize it)
    expect(isValidAddress('1234567890abcdef1234567890abcdef12345678')).toBe(true);
  });
});

