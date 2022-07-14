/**
 * @jest-environment jsdom
 */
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom';

import {
  render,
  fireEvent,
  waitFor,
  getByPlaceholderText
} from '@testing-library/svelte';
import { tick } from 'svelte';

import Table from '../Table.svelte';
it('implements all it needs to be a basic table', async () => {
  const { getAllByText, getByPlaceholderText, getByText, container } = render(
    Table,
    {
      props: {
        explainColumns: [
          { heading: 'Testheadlinenormal', key: 'test', sortable: true }
        ],
        data: [
          { test: 'item1' },
          { test: 'item2' },
          { test: 'item3' },
          { test: 'item4' }
        ],
        headline: 'Tableheadline',
        filterable: true,
        displayRowButtons: [
          {
            headline: 'testbutton',
            text: 'clickme',
            onClick: () => {}
          }
        ]
      }
    }
  );
  expect(() => getByText('▼', { exact: false })).toThrow();
  expect(getByText('item1')).toBeInTheDocument();
  expect(getByText('item2')).toBeInTheDocument();
  expect(getByText('item3')).toBeInTheDocument();
  expect(getByText('Tableheadline')).toBeInTheDocument();
  expect(getByText('Testheadlinenormal')).toBeInTheDocument();
  await fireEvent.click(
    getByText('Testheadlinenormal'),
    new MouseEvent('click')
  );
  await waitFor(
    () => {
      expect(getByText('▼', { exact: false })).toBeInTheDocument();
    },
    { timeout: 5000 }
  );
  expect(getByText('testbutton')).toBeInTheDocument();
  expect(getAllByText('clickme')).toHaveLength(4);

  expect(container.querySelectorAll('tr').length).toBe(5);

  expect(getByPlaceholderText('Filter')).toBeInTheDocument();
  await fireEvent.input(getByPlaceholderText('Filter'), {
    target: { value: 'item2' }
  });
  expect(getByPlaceholderText('Filter')).toHaveValue('item2');
  await waitFor(
    () => {
      expect(container.querySelectorAll('tr').length).toBe(2);
    },
    { timeout: 5000 }
  );
});
