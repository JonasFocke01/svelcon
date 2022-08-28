import { render, fireEvent } from '@testing-library/svelte';
import { expect, describe, it, vi } from 'vitest';
import Checkbox from '../Checkbox.svelte';

describe('Checkbox', () => {
  it('renders', async () => {
    const { getByText } = render(Checkbox, { label: 'Testing' });

    expect(getByText('Testing'));
  });

  it('fires the changeEvent', async () => {
    const { getByRole, component } = render(Checkbox, {
      props: { label: 'Testing' }
    });

    const mock = vi.fn();

    component.$on('change', mock);
    await fireEvent(getByRole('checkbox'), new MouseEvent('click'));

    expect(mock).toHaveBeenCalled();
  });

  it('handles the checked-logic', async () => {
    const { getByRole } = render(Checkbox, {
      props: { label: 'Testing', checked: true }
    });

    expect(getByRole('checkbox', { checked: true }));

    await fireEvent(getByRole('checkbox'), new MouseEvent('click'));

    expect(getByRole('checkbox', { checked: false }));
  });
});
