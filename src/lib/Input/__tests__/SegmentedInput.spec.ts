import { render, fireEvent, waitFor } from '@testing-library/svelte';
import { expect, describe, it, vi } from 'vitest';
import SegmentedInput from '../SegmentedInput.svelte';

describe('Segmented Input', () => {
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

    const mock = vi.fn();

    component.$on('input', mock);
    await fireEvent.input(getAllByPlaceholderText('*')[0], {
      target: { value: '5' }
    });

    expect(mock).toHaveBeenCalled();

    await waitFor(() => {
      expect(
        getAllByPlaceholderText('*')[0].closest('.w-8')?.getAttribute('class')
      ).toContain('focus:border-surface');
    });
  });
});
