import { render, fireEvent, waitFor } from '@testing-library/svelte';
import { expect, describe, it } from 'vitest';
import Table from '../Table.svelte';

describe('Table', () => {
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
    expect(getByText('item1'));
    expect(getByText('item2'));
    expect(getByText('item3'));
    expect(getByText('Tableheadline'));
    expect(getByText('Testheadlinenormal'));
    await fireEvent.click(
      getByText('Testheadlinenormal'),
      new MouseEvent('click')
    );
    await waitFor(
      () => {
        expect(getByText('▼', { exact: false }));
      },
      { timeout: 5000 }
    );
    expect(getByText('testbutton'));
    expect(getAllByText('clickme')).toHaveLength(4);

    expect(container.querySelectorAll('tr').length).toBe(5);

    expect(getByPlaceholderText('Filter'));
    await fireEvent.input(getByPlaceholderText('Filter'), {
      target: { value: 'item2' }
    });
    expect((getByPlaceholderText('Filter') as HTMLFormElement).value).toBe(
      'item2'
    );
    await waitFor(
      () => {
        expect(container.querySelectorAll('tr').length).toBe(2);
      },
      { timeout: 5000 }
    );
  });
});
