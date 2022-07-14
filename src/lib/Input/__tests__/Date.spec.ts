/**
 * @jest-environment jsdom
 */
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom';

import { render, fireEvent } from '@testing-library/svelte';

import Date from '../Date.svelte';

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
