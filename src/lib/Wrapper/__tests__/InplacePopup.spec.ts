/**
 * @jest-environment jsdom
 */
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';

import { render, waitFor } from '@testing-library/svelte';

import InplacePopup from '../InplacePopup.svelte';
it('renders', async () => {
  const { getByTestId, component } = render(InplacePopup, {
    props: {
      tailwindClasses: 'bg-secondary',
      InFlyOptions: { duration: 200, x: 100 },
      OutFlyOptions: { duration: 200, x: 100 }
    }
  });

  const mock = jest.fn();

  expect(getByTestId('direct_container')).toBeInTheDocument();
  expect(getByTestId('direct_container')).toHaveClass('bg-secondary');

  component.$on('outsideClick', mock);

  fireEvent.click(document.getElementsByTagName('body')[0]);

  await waitFor(
    () => {
      expect(mock).toHaveBeenCalled();
    },
    { timeout: 1000 }
  );
});
