/**
 * @jest-environment jsdom
 */
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom';

import { render, fireEvent, waitFor } from '@testing-library/svelte';

import SegmentedInput from '../SegmentedInput.svelte';

it('implements input logic', async () => {
  const { getByText, getAllByPlaceholderText, component } = render(
    SegmentedInput,
    {
      segmentCount: 4
    }
  );

  expect(getAllByPlaceholderText('*')).toHaveLength(4);

  fireEvent.input(getAllByPlaceholderText('*')[0], {
    target: { value: '5' }
  });
  fireEvent.input(getAllByPlaceholderText('*')[1], {
    target: { value: 't' }
  });

  await waitFor(
    () => {
      expect(component.value).toBe('5t  ');
    },
    { timeout: 1000 }
  );
});

it('fires Change Event', async () => {
  const { getByText, getAllByPlaceholderText, component } = render(
    SegmentedInput,
    {
      segmentCount: 4
    }
  );

  const mock = jest.fn();

  component.$on('input', mock);
  await fireEvent.input(getAllByPlaceholderText('*')[0], {
    target: { value: '5' }
  });

  expect(mock).toHaveBeenCalled();

  await waitFor(() => {
    expect(getAllByPlaceholderText('*')[0].closest('.flex')).toHaveClass(
      'focus:border-surface'
    );
  });
});
