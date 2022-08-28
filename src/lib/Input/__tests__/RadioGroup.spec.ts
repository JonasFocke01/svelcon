import { render, fireEvent } from '@testing-library/svelte';
import { expect, describe, it, vi } from 'vitest';
import RadioGroup from '../RadioGroup.svelte';

it('renders without label', async () => {
  const { getByText } = render(RadioGroup, {
    items: ['testItem1', 'testItem2']
  });

  expect(getByText('testItem1'));
  expect(getByText('testItem2'));
});

it('renders with label', async () => {
  const { getByText } = render(RadioGroup, {
    label: 'Testing',
    items: ['testItem1', 'testItem2']
  });

  expect(getByText('Testing'));
  expect(getByText('testItem1'));
  expect(getByText('testItem2'));
});

it('implements radio logic', async () => {
  const { getByText, getByRole, getAllByRole, component } = render(RadioGroup, {
    items: ['testItem1', 'testItem2']
  });

  expect(getAllByRole('radio', { checked: false })).toHaveLength(2);

  await fireEvent.click(getAllByRole('radio')[0]);

  expect(getAllByRole('radio', { checked: false })).toHaveLength(1);

  await fireEvent.click(getAllByRole('radio')[1]);

  expect(getAllByRole('radio', { checked: false })).toHaveLength(1);
});

it('implements on:click logic', async () => {
  const { component } = render(RadioGroup, {
    label: 'Testing',
    items: ['testItem1', 'testItem2']
  });

  const mock = vi.fn();

  component.$on('change', mock);
  await fireEvent.click(document.getElementById('testItem1')!);
  await fireEvent.click(document.getElementById('testItem1')!);
  await fireEvent.click(document.getElementById('testItem2')!);

  expect(mock).toHaveBeenCalledTimes(3);
});

it('exports correct checked value', async () => {
  const { component } = render(RadioGroup, {
    label: 'Testing',
    items: ['testItem1', 'testItem2']
  });

  await fireEvent.click(document.getElementById('testItem1')!);
  expect(component.chosenItem).toBe('testItem1');
  await fireEvent.click(document.getElementById('testItem2')!);
  expect(component.chosenItem).toBe('testItem2');
});
