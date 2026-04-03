import { vi, expect } from 'vitest';
import '@testing-library/jest-dom';

// Mock Next.js components
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock CSS imports
vi.mock('@/app/globals.css', () => ({}));
