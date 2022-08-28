import { render, fireEvent } from '@testing-library/svelte';
import { expect, describe, it } from 'vitest';
import LoadingSpinner from '../LoadingSpinner.svelte';

describe('Loadingspinner', () => {
  it('renders', async () => {
    const { getByText } = render(LoadingSpinner, {
      props: {
        speed: '0.4'
      }
    });
  });
});
