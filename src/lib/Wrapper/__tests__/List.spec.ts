/**
 * @jest-environment jsdom
 */
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';

import { render, waitFor } from '@testing-library/svelte';

import List from '../List.svelte';
it('renders', async () => {
  const { getByText, getByPlaceholderText } = render(List, {
    props: {
      text: 'Testinglist',
      inputItemsKeyValue: [
        { text: 'item1', value: 'value1' },
        { text: 'item2', value: 'value2' },
        { text: 'item3', value: 'value3' }
      ],
      selectable: true,
      multiselect: false,
      filterable: true,
      button: true,
      buttontext: 'Testbutton'
    }
  });

  expect(getByText('Testinglist')).toBeInTheDocument();
  expect(getByText('item1', { exact: false })).toBeInTheDocument();
  expect(getByText('item2', { exact: false })).toBeInTheDocument();
  expect(getByText('item3', { exact: false })).toBeInTheDocument();
  expect(getByText('value1', { exact: false })).toBeInTheDocument();
  expect(getByText('value2', { exact: false })).toBeInTheDocument();
  expect(getByText('value3', { exact: false })).toBeInTheDocument();
  expect(getByText('Testbutton')).toBeInTheDocument();
  expect(getByPlaceholderText('Filter')).toBeInTheDocument();
  await fireEvent.click(getByText('item1', { exact: false }));
  await waitFor(
    () => {
      expect(getByText('item1', { exact: false }).closest('li')).toHaveClass(
        'bg-primary'
      );
    },
    { timeout: 5000 }
  );

  await fireEvent.input(getByPlaceholderText('Filter'), {
    target: { value: 'item1' }
  });
  await waitFor(
    () => {
      expect(getByText('item1', { exact: false })).toBeInTheDocument();
      expect(getByText('value1', { exact: false })).toBeInTheDocument();
      expect(() => getByText('item2', { exact: false })).toThrow();
      expect(() => getByText('item3', { exact: false })).toThrow();
      expect(() => getByText('value2', { exact: false })).toThrow();
      expect(() => getByText('value3', { exact: false })).toThrow();
    },
    { timeout: 5000 }
  );
});
