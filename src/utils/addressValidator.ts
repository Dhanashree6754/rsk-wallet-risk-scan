import { ethers } from 'ethers';

function looksLikeHexAddressNoPrefix(value: string): boolean {
  return /^[a-fA-F0-9]{40}$/.test(value);
}

export function normalizeAddress(input: string): string | null {
  const trimmed = input.trim().replace(/^<|>$/g, '');
  if (!trimmed) return null;

  const withPrefix =
    trimmed.startsWith('0x') || trimmed.startsWith('0X')
      ? `0x${trimmed.slice(2)}`
      : looksLikeHexAddressNoPrefix(trimmed)
        ? `0x${trimmed}`
        : trimmed;

  try {
    // Accept any 20-byte hex address even if its mixed-case checksum is wrong:
    // lowercasing preserves the address bytes, then getAddress() computes checksum.
    if (/^0x[a-fA-F0-9]{40}$/.test(withPrefix)) {
      return ethers.getAddress(withPrefix.toLowerCase());
    }
    return ethers.getAddress(withPrefix);
  } catch {
    return null;
  }
}

export function isValidAddress(address: string): boolean {
  return normalizeAddress(address) !== null;
}