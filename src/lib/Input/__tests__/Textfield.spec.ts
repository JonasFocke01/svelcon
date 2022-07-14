/**
 * @jest-environment jsdom
 */
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom';

import { render, fireEvent, waitFor } from '@testing-library/svelte';

import Textfield from '../Textfield.svelte';

//check if the label is rendered correctly
it('implements the logic', async () => {
  const { getByText, getByPlaceholderText, component } = render(Textfield, {
    label: 'Testinglabel',
    placeholder: 'Testplaceholder'
  });

  expect(getByText('Testinglabel')).toBeInTheDocument();
  expect(getByPlaceholderText('Testplaceholder')).toBeInTheDocument();
  await fireEvent.input(getByPlaceholderText('Testplaceholder'), {
    target: { value: 'valueOfTesting' }
  });

  expect(getByPlaceholderText('Testplaceholder')).toHaveValue('valueOfTesting');

  expect(getByPlaceholderText('Testplaceholder')).not.toBeDisabled();
  expect(() => getByText('*Notwendig')).toThrow();
  await component.$set({ disabled: true });
  expect(getByPlaceholderText('Testplaceholder')).toBeDisabled();
  await component.$set({ disabled: false, required: true });
  expect(getByPlaceholderText('Testplaceholder')).not.toBeDisabled();
  expect(getByText('*Notwendig')).toBeInTheDocument();
});
