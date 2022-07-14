/**
 * @jest-environment jsdom
 */
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom';

import {
  render,
  fireEvent,
  getByPlaceholderText
} from '@testing-library/svelte';

import Number from '../Number.svelte';

it('rendered propperly', async () => {
  const { getByText, getByPlaceholderText, component } = render(Number, {
    props: {
      label: 'Testlabel',
      placeholder: 'Testplaceholder',
      disabled: false
    }
  });
  expect(getByText('Testlabel')).toBeInTheDocument();
  expect(getByPlaceholderText('Testplaceholder')).toBeInTheDocument();
  expect(getByPlaceholderText('Testplaceholder')).toBeInTheDocument();
  expect(getByPlaceholderText('Testplaceholder')).not.toBeDisabled();

  await component.$set({ disabled: true });

  expect(getByPlaceholderText('Testplaceholder')).toBeDisabled();
});

it('implements the min-max-logic', async () => {
  const consoleSpy = jest.spyOn(console, 'error');
  const { getByPlaceholderText, component } = render(Number, {
    props: {
      label: 'Testlabel',
      placeholder: 'Testplaceholder',
      min: -10,
      max: 10,
      value: 0
    }
  });

  expect(getByPlaceholderText('Testplaceholder')).toHaveValue(0);

  await component.$set({ value: -11 });

  expect(getByPlaceholderText('Testplaceholder')).toHaveValue(-10);

  await component.$set({ value: 11 });

  expect(getByPlaceholderText('Testplaceholder')).toHaveValue(10);

  await component.$set({ min: 9 });
  expect(consoleSpy).not.toHaveBeenCalledWith('min >= max');

  await component.$set({ min: 11 });
  expect(consoleSpy).toHaveBeenCalledWith('min >= max');
});
