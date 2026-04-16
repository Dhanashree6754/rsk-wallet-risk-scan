import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { assertAllowedExplorerApiBase, fetchExplorerAPIWithFallback, rateLimitOk, __resetScanRateForTests } from './route';

describe('api/scan explorer base validation', () => {
  it('accepts canonical mainnet Blockscout /api', () => {
    expect(assertAllowedExplorerApiBase('https://rootstock.blockscout.com/api')).toBe(
      'https://rootstock.blockscout.com/api'
    );
  });

  it('accepts canonical testnet Blockscout /api', () => {
    expect(assertAllowedExplorerApiBase('https://rootstock-testnet.blockscout.com/api')).toBe(
      'https://rootstock-testnet.blockscout.com/api'
    );
  });

  it('rejects non-https protocol', () => {
    expect(() => assertAllowedExplorerApiBase('http://rootstock.blockscout.com/api')).toThrow(
      /must use https/i
    );
  });

  it('rejects non-allowlisted hosts', () => {
    expect(() => assertAllowedExplorerApiBase('https://example.com/api')).toThrow(/not allowed/i);
    expect(() => assertAllowedExplorerApiBase('https://rootstock.blockscout.com.evil.com/api')).toThrow(
      /not allowed/i
    );
  });

  it('rejects paths not ending in /api', () => {
    expect(() => assertAllowedExplorerApiBase('https://rootstock.blockscout.com/')).toThrow(/end with \/api/i);
    expect(() => assertAllowedExplorerApiBase('https://rootstock.blockscout.com/api/')).not.toThrow();
    expect(assertAllowedExplorerApiBase('https://rootstock.blockscout.com/api/')).toBe(
      'https://rootstock.blockscout.com/api'
    );
    expect(() => assertAllowedExplorerApiBase('https://rootstock.blockscout.com/api/v1')).toThrow(/end with \/api/i);
  });

  it('strips query/hash and normalizes to canonical base', () => {
    expect(
      assertAllowedExplorerApiBase('https://rootstock.blockscout.com/api?module=account#frag')
    ).toBe('https://rootstock.blockscout.com/api');
  });
});

describe('api/scan explorer fallback behavior', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
    process.env.NEXT_PUBLIC_CHAIN_ID = '30';
    process.env.NEXT_PUBLIC_EXPLORER_API = 'https://rootstock.blockscout.com/api';
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('retries with fallback base when the first request fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const calls: string[] = [];
    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: any) => {
        const url = String(input);
        calls.push(url);
        // fail mainnet base first, succeed on testnet fallback
        if (url.startsWith('https://rootstock.blockscout.com/api')) {
          return new Response('nope', { status: 500 });
        }
        if (url.startsWith('https://rootstock-testnet.blockscout.com/api')) {
          return new Response(JSON.stringify({ status: '1', result: [] }), { status: 200 });
        }
        return new Response('unexpected', { status: 500 });
      })
    );

    const url =
      'https://rootstock.blockscout.com/api?module=account&action=txlist&address=0x123&sort=desc&page=1&offset=10';
    const data = await fetchExplorerAPIWithFallback(url);

    expect(data).toEqual({ status: '1', result: [] });
    expect(calls.length).toBeGreaterThanOrEqual(2);
    expect(calls[0]).toContain('https://rootstock.blockscout.com/api?module=account');
    expect(calls[1]).toContain('https://rootstock-testnet.blockscout.com/api?module=account');
  });
});

describe('api/scan rate limiting', () => {
  beforeEach(() => {
    __resetScanRateForTests();
  });

  it('allows up to 30 requests per minute per IP and blocks the 31st', () => {
    const ip = '1.2.3.4';
    for (let i = 0; i < 30; i++) {
      expect(rateLimitOk(ip)).toBe(true);
    }
    expect(rateLimitOk(ip)).toBe(false);
  });
});

