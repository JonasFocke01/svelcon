/**
 * @jest-environment jsdom
 */
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom';

import { render, fireEvent } from '@testing-library/svelte';

import RadioGroup from '../RadioGroup.svelte';

it('renders without label', async () => {
  const { getByText } = render(RadioGroup, {
    items: ['testItem1', 'testItem2']
  });

  expect(getByText('testItem1')).toBeInTheDocument();
  expect(getByText('testItem2')).toBeInTheDocument();
});

it('renders with label', async () => {
  const { getByText } = render(RadioGroup, {
    label: 'Testing',
    items: ['testItem1', 'testItem2']
  });

  expect(getByText('Testing')).toBeInTheDocument();
  expect(getByText('testItem1')).toBeInTheDocument();
  expect(getByText('testItem2')).toBeInTheDocument();
});

it('implements radio logic', async () => {
  const { getByText } = render(RadioGroup, {
    items: ['testItem1', 'testItem2']
  });

  expect(getByText('testItem1')).toBeInTheDocument();
  expect(document.getElementById('testItem1')).not.toBeChecked();
  expect(getByText('testItem2')).toBeInTheDocument();
  expect(document.getElementById('testItem2')).not.toBeChecked();

  await fireEvent.click(document.getElementById('testItem1'));
  expect(document.getElementById('testItem1')).toBeChecked();
  expect(document.getElementById('testItem2')).not.toBeChecked();

  await fireEvent.click(document.getElementById('testItem2'));
  expect(document.getElementById('testItem1')).not.toBeChecked();
  expect(document.getElementById('testItem2')).toBeChecked();
});

it('implements on:click logic', async () => {
  const { component } = render(RadioGroup, {
    label: 'Testing',
    items: ['testItem1', 'testItem2']
  });

  const mock = jest.fn();

  component.$on('change', mock);
  await fireEvent.click(document.getElementById('testItem1'));
  await fireEvent.click(document.getElementById('testItem1'));
  await fireEvent.click(document.getElementById('testItem2'));

  expect(mock).toHaveBeenCalledTimes(3);
});

it('exports right checked value', async () => {
  const { component } = render(RadioGroup, {
    label: 'Testing',
    items: ['testItem1', 'testItem2']
  });

  await fireEvent.click(document.getElementById('testItem1'));
  expect(component.chosenItem).toBe('testItem1');
  await fireEvent.click(document.getElementById('testItem2'));
  expect(component.chosenItem).toBe('testItem2');
});
