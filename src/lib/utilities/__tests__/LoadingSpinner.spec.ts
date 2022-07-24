/**
 * @jest-environment jsdom
 */
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';

import { render } from '@testing-library/svelte';

import LoadingSpinner from '../LoadingSpinner.svelte';
it('renders', async () => {
  const { getByText } = render(LoadingSpinner, {
    props: {
      speed: '0.4'
    }
  });
});
