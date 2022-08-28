import { render, fireEvent, waitFor } from '@testing-library/svelte';
import { expect, describe, it, vi } from 'vitest';
import InplacePopup from '../InplacePopup.svelte';

describe('Inplace Popup', () => {
  it('renders', async () => {
    const { getByTestId, component } = render(InplacePopup, {
      props: {
        tailwindClasses: 'bg-secondary',
        InFlyOptions: { duration: 200, x: 100 },
        OutFlyOptions: { duration: 200, x: 100 }
      }
    });

    const mock = vi.fn();

    expect(getByTestId('direct_container'));
    expect(getByTestId('direct_container').getAttribute('class')).toContain(
      'bg-secondary'
    );

    component.$on('outsideClick', mock);

    fireEvent.click(document.getElementsByTagName('body')[0]);

    await waitFor(
      () => {
        expect(mock).toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });
});
