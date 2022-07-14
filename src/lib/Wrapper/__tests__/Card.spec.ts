/**
 * @jest-environment jsdom
 */
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom';

import { render, fireEvent } from '@testing-library/svelte';

import Card from '../Card.svelte';
it('renders', async () => {
  render(Card, {
    props: {}
  });
});
