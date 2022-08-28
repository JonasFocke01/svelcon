import { render, fireEvent } from '@testing-library/svelte';
import { expect, describe, it } from 'vitest';
import Badge from '../Badge.svelte';

describe('Badge', () => {
  it('has given text', async () => {
    const { getByText, component } = render(Badge, {
      props: {
        text: '4'
      }
    });

    expect(getByText(4));
  });

  it('has default color', async () => {
    const { getByText, component } = render(Badge, {
      props: {
        text: '4'
      }
    });

    expect(component.bgColor).toBe('accent');
  });
});
