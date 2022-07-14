/**
 * @jest-environment jsdom
 */
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom';

import { getByRole, render, waitFor } from '@testing-library/svelte';

import Text from '../Text.svelte';

it('has expected text', async () => {
  const { getByText } = render(Text, { text: 'Testing' });

  expect(getByText('Testing')).toBeInTheDocument();
});

it('has expected size', async () => {
  const { getByText, component } = render(Text, {
    text: 'Testing',
    size: 'medium'
  });

  expect(getByText('Testing')).toHaveClass('text-xl');

  await component.$set({ size: 'large' });

  await waitFor(
    () => {
      expect(getByText('Testing')).toHaveClass('text-4xl');
    },
    { timeout: 1000 }
  );

  await component.$set({ size: 'small' });

  await waitFor(
    () => {
      expect(getByText('Testing')).toHaveClass('text-sm');
    },
    { timeout: 1000 }
  );
});

it('working effects', async () => {
  const { getByText, component } = render(Text, {
    text: '-This- *is* _a_ #test#',
    size: 'medium'
  });

  await waitFor(
    () => {
      expect(getByText('This')).toHaveClass('line-through');
      expect(getByText('is')).toHaveClass('font-bold');
      expect(getByText('a')).toHaveClass('underline');
      expect(getByText('test')).toHaveClass('italic');
    },
    { timeout: 1000 }
  );

  component.$set({ text: 'This is a test' });

  await waitFor(
    () => {
      expect(() => getByText('This')).not.toThrow();
      expect(getByText('This')).not.toHaveClass('line-through');
      expect(getByText('is')).not.toHaveClass('font-bold');
      expect(getByText('a')).not.toHaveClass('underline');
      expect(getByText('test')).not.toHaveClass('italic');
    },
    { timeout: 1000 }
  );
});

it('has expected typewriter behavior', async () => {
  const { getByText } = render(Text, {
    text: 'I am typing this out slowly',
    typewriter: { enable: true, speed: 0.3 }
  });

  expect(() => getByText('slowly')).toThrow();

  await waitFor(
    () => {
      expect(getByText('slowly')).toBeInTheDocument();
    },
    { timeout: 5000 }
  );
});

//TODO: This has to wait for a propper color scheme implementation
// it('has expected color', async () => {
//   const { getByText, component } = render(Text, {
//     text: 'Testing',
//     textcolor: 'accent'
//   });

//   await waitFor(
//     () => {
//       expect(getByText('Testing')).toHaveClass('text-accent');
//     },
//     { timeout: 1000 }
//   );

//   await component.$set({ textcolor: 'black' });

//   await waitFor(
//     () => {
//       expect(getByText('Testing')).toHaveClass('text-black');
//     },
//     { timeout: 1000 }
//   );
// });
