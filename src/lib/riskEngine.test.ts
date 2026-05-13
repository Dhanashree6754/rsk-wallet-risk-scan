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

  it('does not add risk points for unverified contracts (informational only)', () => {
    const { score, riskLevel, reasons } = calculateRiskScore(
      0,
      [],
      [
        { address: '0xContract', count: 11, known: false },
      ]
    );

    // totalInteractions = 11 => +20 for frequency; unverified contracts do not affect score.
    expect(score).toBe(20);
    expect(riskLevel).toBe('LOW');
    expect(reasons.join(' | ')).toMatch(
      /11 interaction\(s\) with unverified contracts \(informational\)/i
    );
  });
});

