/**
 * @jest-environment jsdom
 */
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom';

import { render, fireEvent } from '@testing-library/svelte';

import Checkbox from '../Checkbox.svelte';

//check if the label is rendered correctly
it('renders', async () => {
  const { getByText } = render(Checkbox, { label: 'Testing' });

  expect(getByText('Testing')).toBeInTheDocument();
});

//check if the changeevent if fired
it('fires the changeEvent', async () => {
  const { getByRole, component } = render(Checkbox, {
    props: { label: 'Testing' }
  });

  const mock = jest.fn();

  component.$on('change', mock);
  await fireEvent(getByRole('checkbox'), new MouseEvent('click'));

  expect(mock).toHaveBeenCalled();
});

//check if the checked state is correct
it('handles the checked-logic', async () => {
  const { getByRole } = render(Checkbox, {
    props: { label: 'Testing', checked: true }
  });

  expect(getByRole('checkbox')).toBeChecked();

  await fireEvent(getByRole('checkbox'), new MouseEvent('click'));

  expect(getByRole('checkbox')).not.toBeChecked();
});
