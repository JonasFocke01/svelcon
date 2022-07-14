<!-- @component
  a simple wrapper to display the content only if the mediaquery matches

  **query**
  * string: 'mobile' | 'desktop'
  * default: !NO DEFAULT!
  * the mediaquery to match against

  ### Used mediaqueries
  * mobile: '(max-width: 1023)'
  * desktop: '(min-width: 1024px)'
 -->
<script lang="ts">
  import { onMount } from 'svelte';

  export let query: 'mobile' | 'desktop';

  let matches;

  onMount(() => {
    if (window) {
      const matchMedia = window.matchMedia('(min-width: 1024px)');

      matches = matchMedia.matches;

      matchMedia.addEventListener('change', (obj: any) => {
        matches = obj.matches;
      });
    }
  });
</script>

{#if matches && query === 'desktop'}
  <slot />
{:else if !matches && query === 'mobile'}
  <slot />
{/if}
