<!-- @component
a basic popup 

**slot**
* HTML
* default: !NO DEFAULT!
* here can live anything you want!

**InFlyOptions**
* SvelteFlyOptions
* default: { duration: 200, y: -50 }
* how should the menu fly in
* if set to { duration: 0 } the menu will not fly in

**OutFlyOptions**
* SvetleFlyOptions
* default: { duration: 200, y: -50 }
* how should the menu fly out
* if set to { duration: 0 } the menu will not fly out

**animationStatus**
* open | closed | opening | closing
* the current animation status of the menu
* any changes from outside will be ignored and be overwritten

**tailwindClasses**
* string
* default: ''
* more control over the menu position

**on:outsideClick**
* function
* default: () => {}
* will be called when the user clicks outside the popup
 -->
<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import { fly } from 'svelte/transition';
  import Card from './Card.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let animationStatus = 'closed';
  export let tailwindClasses = '';
  export let padding:
    | `${'' | '-'}p${'' | 't' | 'b' | 'r' | 'l' | 'x' | 'y'}-${number}`
    | '' = '';
  export let rounded: boolean = false;

  export let InFlyOptions = {
    duration: 200,
    y: -50
  };

  let id = Date.now() + Math.round(Math.random());
  let listener: any;
  onMount(() => {
    listener = document.addEventListener('click', handleOutsideClick, true);
  });

  onDestroy(() => {
    document.removeEventListener('click', listener);
  });

  function handleOutsideClick(e: MouseEvent) {
    if (
      !document.getElementById(`InplacePopup${id}`)?.contains(e.target as Node)
    ) {
      document.removeEventListener('click', handleOutsideClick, true);
      dispatch('outsideClick');
    }
  }

  export let OutFlyOptions = {
    duration: 200,
    y: -50
  };
</script>

<div
  id={`InplacePopup${id}`}
  class="relative w-full flex flex-row"
  in:fly={InFlyOptions}
  out:fly={OutFlyOptions}
  on:introstart={() => (animationStatus = 'opening')}
  on:outrostart={() => (animationStatus = 'closing')}
  on:introend={() => (animationStatus = 'open')}
  on:outroend={() => (animationStatus = 'closed')}
>
  <div
    data-testid="direct_container"
    class="absolute border-2 {rounded
      ? 'rounded-2xl'
      : ''} text-black {tailwindClasses}"
  >
    <Card {rounded} {padding}>
      <slot />
    </Card>
  </div>
</div>
