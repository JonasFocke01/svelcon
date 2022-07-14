/**
 * @jest-environment jsdom
 */
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom';

import { render, fireEvent } from '@testing-library/svelte';

import NormalButton from '../NormalButton.svelte';

//check if the clickevent if fired
it('fires the clickevent', async () => {
  const { getByText, component } = render(NormalButton, {
    props: { label: 'Testing' }
  });

  const mock = jest.fn();

  component.$on('click', mock);
  await fireEvent(getByText('Testing'), new MouseEvent('click'));

  expect(mock).toHaveBeenCalled();
});

it('has the right bg-color', async () => {
  const { getByText } = render(NormalButton, {
    props: { label: 'Testing', color: 'bg-primary' }
  });

  expect(getByText('Testing')).toHaveClass('bg-primary');
});

it('has the right additionalClasses', async () => {
  const { getByText } = render(NormalButton, {
    props: { label: 'Testing', additionalClasses: 'mt-10' }
  });

  expect(getByText('Testing')).toHaveClass('mt-10');
});
