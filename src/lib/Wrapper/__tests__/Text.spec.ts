import { render, fireEvent, waitFor } from '@testing-library/svelte';
import { expect, describe, it } from 'vitest';
import Text from '../Text.svelte';

describe('Text', () => {
  it('has expected text', async () => {
    const { getByText } = render(Text, { props: { text: 'Testing' } });

    expect(getByText('Testing'));
  });

  it('has expected size', async () => {
    const { getByText, component } = render(Text, {
      text: 'Testing',
      size: 'medium'
    });

    expect(getByText('Testing').getAttribute('class')).toContain('text-medium');

    await component.$set({ size: '4xl' });

    await waitFor(
      () => {
        expect(getByText('Testing').getAttribute('class')).toContain(
          'text-4xl'
        );
      },
      { timeout: 1000 }
    );

    await component.$set({ size: 'sm' });

    await waitFor(
      () => {
        expect(getByText('Testing').getAttribute('class')).toContain('text-sm');
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
        expect(getByText('This').getAttribute('class')).toContain(
          'line-through'
        );
        expect(getByText('is').getAttribute('class')).toContain('font-bold');
        expect(getByText('a').getAttribute('class')).toContain('underline');
        expect(getByText('test').getAttribute('class')).toContain('italic');
      },
      { timeout: 1000 }
    );

    component.$set({ text: 'This is a test' });

    await waitFor(
      () => {
        expect(() => getByText('This')).not.toThrow();
        expect(getByText('This').getAttribute('class')).not.toContain(
          'line-through'
        );
        expect(getByText('is').getAttribute('class')).not.toContain(
          'font-bold'
        );
        expect(getByText('a').getAttribute('class')).not.toContain('underline');
        expect(getByText('test').getAttribute('class')).not.toContain('italic');
      },
      { timeout: 1000 }
    );
  });

  // it('has expected typewriter behavior', async () => {
  //   const { getByText } = render(Text, {
  //     props: {
  //       text: 'I am typing this out slowly',
  //       typewriterSpeed: 1
  //     }
  //   });

  //   expect(() => getByText('slowly')).toThrow();

  //   await waitFor(() => expect(getByText('slowly')), { timeout: 5000 });
  // });
});
