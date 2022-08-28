import { render, fireEvent } from '@testing-library/svelte';
import { expect, describe, it, vi } from 'vitest';
import Number from '../Number.svelte';

describe('Number', () => {
  it('rendered propperly', async () => {
    const { getByText, getByPlaceholderText, component } = render(Number, {
      props: {
        label: 'Testlabel',
        placeholder: 'Testplaceholder',
        disabled: false
      }
    });
    expect(getByText('Testlabel'));
    expect(getByPlaceholderText('Testplaceholder'));
    expect(getByPlaceholderText('Testplaceholder'));
    expect(
      getByPlaceholderText('Testplaceholder').getAttribute('disabled')
    ).toBeNull();

    await component.$set({ disabled: true });

    expect(getByPlaceholderText('Testplaceholder').getAttribute('disabled'));
  });

  it('implements the min-max-logic', async () => {
    const consoleSpy = vi.spyOn(console, 'error');
    const { getByPlaceholderText, component } = render(Number, {
      props: {
        label: 'Testlabel',
        placeholder: 'Testplaceholder',
        min: -10,
        max: 10,
        value: 1
      }
    });

    expect(
      (getByPlaceholderText('Testplaceholder') as HTMLFormElement).value
    ).toBe('1');

    await component.$set({ value: -11 });

    expect(
      (getByPlaceholderText('Testplaceholder') as HTMLFormElement).value
    ).toBe('-10');

    await component.$set({ value: 11 });

    expect(
      (getByPlaceholderText('Testplaceholder') as HTMLFormElement).value
    ).toBe('10');

    await component.$set({ min: 9 });
    expect(consoleSpy).not.toHaveBeenCalledWith('min >= max');

    await component.$set({ min: 11 });
    expect(consoleSpy).toHaveBeenCalledWith('min >= max');
  });
});
