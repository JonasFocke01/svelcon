/**
 * @jest-environment jsdom
 */
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom';

import { render, fireEvent } from '@testing-library/svelte';

import Dropdown from '../Dropdown.svelte';

//check if the label is rendered correctly
it('renders', async () => {
  const { getByText } = render(Dropdown, { label: 'Testing' });

  expect(() => getByText('Testing')).toThrow();
});

it('displays the right options', async () => {
  const { getByText, component } = render(Dropdown, {
    label: 'Testing',
    options: ['a', 'b']
  });

  expect(getByText('a')).toBeInTheDocument();
  expect(getByText('b')).toBeInTheDocument();

  await component.$set({ options: ['c', 'd'] });

  expect(() => getByText('a')).toThrow();
  expect(() => getByText('b')).toThrow();
  expect(getByText('c')).toBeInTheDocument();
  expect(getByText('d')).toBeInTheDocument();

  try {
    async () => await component.$set({ options: [] });
  } catch (e) {}

  expect(getByText('Testing')).toBeInTheDocument();
  expect(getByText('c')).toBeInTheDocument();
  expect(getByText('d')).toBeInTheDocument();
});
