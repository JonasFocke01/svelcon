import { render, fireEvent } from '@testing-library/svelte';
import { expect, describe, it } from 'vitest';
import Textfield from '../Textfield.svelte';

describe('Textfield', () => {
  it('implements the logic', async () => {
    const { getByText, getByPlaceholderText, component } = render(Textfield, {
      label: 'Testinglabel',
      placeholder: 'Testplaceholder'
    });

    expect(getByText('Testinglabel'));
    expect(getByPlaceholderText('Testplaceholder'));
    await fireEvent.input(getByPlaceholderText('Testplaceholder'), {
      target: { value: 'valueOfTesting' }
    });

    expect(
      (getByPlaceholderText('Testplaceholder') as HTMLFormElement).value
    ).toBe('valueOfTesting');

    expect(
      getByPlaceholderText('Testplaceholder').getAttribute('disabled')
    ).toBeNull();
    expect(() => getByText('*required')).toThrow();
    await component.$set({ disabled: true });
    expect(getByPlaceholderText('Testplaceholder').getAttribute('disabled'));
    await component.$set({ disabled: false, required: true });
    expect(
      getByPlaceholderText('Testplaceholder').getAttribute('disabled')
    ).toBeNull();
    expect(getByText('*required'));
  });
});
