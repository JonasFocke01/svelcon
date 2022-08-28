import { render, fireEvent } from '@testing-library/svelte';
import { expect, describe, it, vi } from 'vitest';
import Button from '../Button.svelte';

describe('Button', () => {
  it('fires the clickevent', async () => {
    const { getByText, component } = render(Button, {
      props: { text: 'Testing' }
    });
    const mock = vi.fn();
    component.$on('click', mock);
    await fireEvent.click(getByText('Testing'));
    expect(mock).toHaveBeenCalled();
  });
  it('has the right bg-color', async () => {
    const { getByText } = render(Button, {
      props: { text: 'Testing', bgColor: 'primary' }
    });
    expect(
      getByText('Testing').closest('.block')?.getAttribute('class')
    ).toContain('bg-primary');
  });
  it('has the right additionalClasses', async () => {
    const { getByText } = render(Button, {
      props: { text: 'Testing', additionalClasses: 'mt-10' }
    });
    expect(
      getByText('Testing').closest('.block')?.getAttribute('class')
    ).toContain('mt-10');
  });
});
