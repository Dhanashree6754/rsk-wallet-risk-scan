import { describe, expect, it, vi } from 'vitest';
import { scanWallet } from './walletService';

describe('walletService', () => {
  it('encodes the address in the scan URL', async () => {
    const fetchSpy = vi.fn(async () => {
      return {
        ok: true,
        json: async () => ({ riskLevel: 'LOW', score: 0, reasons: [], transactionCount: 0, contractInteractions: [], approvals: [] }),
      } as any;
    });

    // @ts-expect-error - we are stubbing the global fetch for tests
    global.fetch = fetchSpy;

    await scanWallet('0x1234567890abcdef1234567890abcdef12345678');

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const calledUrl = fetchSpy.mock.calls[0][0] as string;
    expect(calledUrl).toContain('/api/scan?address=');
    expect(calledUrl).toContain(encodeURIComponent('0x1234567890abcdef1234567890abcdef12345678'));
  });

  it('throws a helpful error when API responds with an error payload', async () => {
    const fetchSpy = vi.fn(async () => {
      return {
        ok: false,
        json: async () => ({ error: 'boom' }),
      } as any;
    });

    // @ts-expect-error - we are stubbing the global fetch for tests
    global.fetch = fetchSpy;

    await expect(scanWallet('0x1234567890abcdef1234567890abcdef12345678')).rejects.toThrow('boom');
  });
});

