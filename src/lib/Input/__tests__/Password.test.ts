import { render, fireEvent } from '@testing-library/svelte';
import { expect, describe, it, vi } from 'vitest';
import Password from '../Password.svelte';

describe('Password', () => {
  it('renders', async () => {
    const { getByText } = render(Password, { label: 'Testing' });

    expect(getByText('Testing'));
  });
});
