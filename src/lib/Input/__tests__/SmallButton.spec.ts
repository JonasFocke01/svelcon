/**
 * @jest-environment jsdom
 */
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom';

import { render, fireEvent } from '@testing-library/svelte';

import SmallButton from '../SmallButton.svelte';

//check if the label is rendered correctly
it('renders', async () => {
  const { getByText } = render(SmallButton, { label: 'Testing' });

  expect(getByText('Testing')).toBeInTheDocument();
  expect(getByText('Testing')).toHaveClass('text-sm');
});
