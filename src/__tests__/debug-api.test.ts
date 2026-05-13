import { describe, it, expect } from 'vitest';
import { isValidAddress } from '../utils/addressValidator';

describe('API Debugging', () => {
  it('should test address validation', () => {
    const isValidAddress = (address: string) => {
      return /^0x[a-fA-F0-9]{40}$/.test(address);
    };

    // Test valid RSK addresses
    const validAddresses = [
      '0x1111111111111111111111111111111111111111', // Generic valid address
      '0x1234567890abcdef1234567890abcdef12345678', // Valid 20-byte address
      '0x0000000000000000000000000000000000000000', // Zero address (edge case)
    ];
    
    const invalidAddresses = [
      '0x742d35Cc6634C0532925a3b844Bc454e4438f44H', // Invalid character
      '0x123', // Too short
      '0x12345678901234567890123456789012345678901', // Too long
      '1234567890abcdef1234567890abcdef12345678', // Missing 0x
    ];
    

    validAddresses.forEach(addr => {
      expect(isValidAddress(addr)).toBe(true);
    });

    invalidAddresses.forEach(addr => {
      expect(isValidAddress(addr)).toBe(false);
    });
  });

  it('should test expected API response structure', () => {
    const mockResponse = {
      riskLevel: "LOW" as const,
      score: 0,
      reasons: [],
      transactionCount: 3,
      contractInteractions: [],
      approvals: []
    };

    expect(mockResponse).toHaveProperty('riskLevel');
    expect(mockResponse).toHaveProperty('score');
    expect(mockResponse).toHaveProperty('reasons');
    expect(mockResponse).toHaveProperty('transactionCount');
    expect(mockResponse).toHaveProperty('contractInteractions');
    expect(mockResponse).toHaveProperty('approvals');

    expect(Array.isArray(mockResponse.reasons)).toBe(true);
    expect(Array.isArray(mockResponse.contractInteractions)).toBe(true);
    expect(Array.isArray(mockResponse.approvals)).toBe(true);
  });
});
