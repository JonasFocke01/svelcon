import { render, fireEvent } from '@testing-library/svelte';
import { expect, describe, it, vi } from 'vitest';
import Dropdown from '../Dropdown.svelte';

describe('Dropdown', () => {
  it('renders', async () => {
    const { getByText } = render(Dropdown, { label: 'Testing' });

    expect(() => getByText('Testing')).toThrow();
  });

  it('displays the correct options', async () => {
    const { getByText, component } = render(Dropdown, {
      label: 'Testing',
      options: ['a', 'b']
    });

    expect(getByText('a'));
    expect(getByText('b'));

    await component.$set({ options: ['c', 'd'] });

    expect(() => getByText('a')).toThrow();
    expect(() => getByText('b')).toThrow();
    expect(getByText('c'));
    expect(getByText('d'));

    try {
      async () => await component.$set({ options: [] });
    } catch (e) {}

    expect(getByText('Testing'));
    expect(getByText('c'));
    expect(getByText('d'));
  });
});
