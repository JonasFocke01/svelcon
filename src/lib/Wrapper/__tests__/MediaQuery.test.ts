import { render, fireEvent } from '@testing-library/svelte';
import { expect, describe, it, vi } from 'vitest';
import MediaQuery from '../MediaQuery.svelte';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});

describe('MediaQuery', () => {
  it('renders', async () => {
    render(MediaQuery, {
      props: { query: 'mobile' }
    });
    render(MediaQuery, {
      props: { query: 'desktop' }
    });
  });
});
