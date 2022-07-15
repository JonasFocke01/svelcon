/**
 * @jest-environment jsdom
 */
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom';

import { render, fireEvent } from '@testing-library/svelte';

import Button from '../Button.svelte';

it('fires the clickevent', async () => {
  const { getByText, component } = render(Button, {
    props: { text: { text: 'Testing' } }
  });

  const mock = jest.fn();

  component.$on('click', mock);
  await fireEvent.click(getByText('Testing'));

  expect(mock).toHaveBeenCalled();
});

it('has the right bg-color', async () => {
  const { getByText } = render(Button, {
    props: { text: { text: 'Testing' }, bgColor: 'primary' }
  });

  expect(getByText('Testing').closest('.block')).toHaveClass('bg-primary');
});

it('has the right additionalClasses', async () => {
  const { getByText } = render(Button, {
    props: { text: { text: 'Testing' }, additionalClasses: 'mt-10' }
  });

  expect(getByText('Testing').closest('.block')).toHaveClass('mt-10');
});

it('has the right size', () => {
  const { getByText } = render(Button, {
    props: { text: { text: 'Testing' }, size: 'large' }
  });

  expect(getByText('Testing').closest('.block')).toBeInTheDocument();
});
