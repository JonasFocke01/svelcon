import { render, fireEvent } from '@testing-library/svelte';
import { expect, describe, it } from 'vitest';
import Card from '../Card.svelte';

describe('Card', () => {
  it('renders', async () => {
    render(Card, {
      props: {}
    });
  });
});
