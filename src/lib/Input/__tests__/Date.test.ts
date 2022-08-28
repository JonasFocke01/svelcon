import { render, fireEvent } from '@testing-library/svelte';
import { expect, describe, it, vi } from 'vitest';
import Date from '../Date.svelte';

describe('Date Input', () => {
  it('renders with every parameter', async () => {
    render(Date, {
      props: {
        placeholder: 'Testingplaceholder',
        label: 'Testing',
        min: '1970-01-01',
        max: '2100-01-01',
        value: undefined
      }
    });
  });

  it('renders with nothing', async () => {
    render(Date, {});
  });
});
