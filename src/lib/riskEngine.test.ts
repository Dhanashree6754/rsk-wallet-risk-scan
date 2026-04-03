import { describe, expect, it } from 'vitest';
import { calculateRiskScore } from './riskEngine';

describe('riskEngine', () => {
  it('returns LOW when no risk factors are present', () => {
    const { score, riskLevel, reasons } = calculateRiskScore(0, [], []);
    expect(score).toBe(0);
    expect(riskLevel).toBe('LOW');
    expect(reasons).toEqual([]);
  });

  it('adds points for unlimited approvals', () => {
    const { score, riskLevel } = calculateRiskScore(
      0,
      [
        { token: '0x1', spender: '0x2', allowance: 'Unlimited', riskFlag: 'unlimited' },
        { token: '0x3', spender: '0x4', allowance: 'Unlimited', riskFlag: 'unlimited' },
      ],
      []
    );

    // 2 * 40 = 80 => HIGH
    expect(score).toBe(80);
    expect(riskLevel).toBe('HIGH');
  });

  it('adds points for unknown contract interactions', () => {
    const { score, riskLevel } = calculateRiskScore(
      0,
      [],
      [
        { address: '0xContract', count: 11, known: false },
      ]
    );

    // totalInteractions = 11 => +20 for frequency, +11*5 for unknown contracts? (unknown contracts counts contracts, not interactions)
    // Current engine counts unknown contracts by number of contracts, not total interactions count.
    // unknownInteractions = 1 => +5, so score = 20 + 5 = 25 => MEDIUM
    expect(score).toBe(25);
    expect(riskLevel).toBe('LOW' /* 25 should still be LOW (0-30) */);
  });
});

