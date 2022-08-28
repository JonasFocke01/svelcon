import { render, fireEvent, waitFor } from '@testing-library/svelte';
import { expect, describe, it, vi } from 'vitest';
import List from '../List.svelte';

describe('List', () => {
  it('renders with keyValue list', async () => {
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

    expect(getByText('Testinglist'));
    expect(getByText('item1', { exact: false }));
    expect(getByText('item2', { exact: false }));
    expect(getByText('item3', { exact: false }));
    expect(getByText('value1', { exact: false }));
    expect(getByText('value2', { exact: false }));
    expect(getByText('value3', { exact: false }));
    expect(getByText('Testbutton'));
    expect(getByPlaceholderText('Filter'));
    await fireEvent.click(getByText('item1', { exact: false }));
    await waitFor(
      () => {
        expect(
          getByText('item1', { exact: false })
            .closest('li')
            ?.getAttribute('class')
        ).toContain('bg-primary');
      },
      { timeout: 5000 }
    );

    await fireEvent.input(getByPlaceholderText('Filter'), {
      target: { value: 'item1' }
    });
    await waitFor(
      () => {
        expect(getByText('item1', { exact: false }));
        expect(getByText('value1', { exact: false }));
        expect(() => getByText('item2', { exact: false })).toThrow();
        expect(() => getByText('item3', { exact: false })).toThrow();
        expect(() => getByText('value2', { exact: false })).toThrow();
        expect(() => getByText('value3', { exact: false })).toThrow();
      },
      { timeout: 5000 }
    );
  }, 11000);

  it('renders with string list', async () => {
    const { getByText, getByPlaceholderText } = render(List, {
      props: {
        text: 'Testinglist',
        inputItemsString: ['item1', 'item2', 'item3'],
        selectable: true,
        multiselect: false,
        filterable: true,
        button: true,
        buttontext: 'Testbutton'
      }
    });

    expect(getByText('Testinglist'));

    await fireEvent.click(getByText('item1', { exact: false }));
    await waitFor(
      () => {
        expect(
          getByText('item1', { exact: false })
            .closest('li')
            ?.getAttribute('class')
        ).toContain('bg-primary');
      },
      { timeout: 5000 }
    );

    await fireEvent.input(getByPlaceholderText('Filter'), {
      target: { value: 'item1' }
    });
    await waitFor(
      () => {
        expect(getByText('item1', { exact: false }));
        expect(() => getByText('item2', { exact: false })).toThrow();
        expect(() => getByText('item3', { exact: false })).toThrow();
      },
      { timeout: 5000 }
    );
  });

  it('fires click event correct', async () => {
    const { getByText, getByPlaceholderText, component } = render(List, {
      props: {
        text: 'Testinglist',
        inputItemsKeyValue: [
          { text: 'item1', value: 'value1' },
          { text: 'item2', value: 'value2' },
          { text: 'item3', value: 'value3' }
        ],
        selectable: true
      }
    });

    const mock = vi.fn();

    component.$on('itemSelected', mock);

    await fireEvent.click(getByText('item1', { exact: false }).closest('li')!);

    await waitFor(
      () => {
        expect(mock).toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });
});
