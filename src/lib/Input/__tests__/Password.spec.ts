/**
 * @jest-environment jsdom
 */
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom';

import { render, fireEvent } from '@testing-library/svelte';

import Password from '../Password.svelte';

//check if the label is rendered correctly
it('renders', async () => {
  const { getByText } = render(Password, { label: 'Testing' });

  expect(getByText('Testing')).toBeInTheDocument();
});
