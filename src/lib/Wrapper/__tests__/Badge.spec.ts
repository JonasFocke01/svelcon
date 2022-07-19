/**
 * @jest-environment jsdom
 */
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';

import { render, waitFor } from '@testing-library/svelte';

import Badge from '../Badge.svelte';
it('has given text', async () => {
  const { getByText, component } = render(Badge, {
    props: {
      text: '4'
    }
  });

  expect(getByText(4)).toBeInTheDocument();
});

it('has default color', async () => {
  const { getByText, component } = render(Badge, {
    props: {
      text: '4'
    }
  });

  expect(component.bgColor).toBe('accent');
});
