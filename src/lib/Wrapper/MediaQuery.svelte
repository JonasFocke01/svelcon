<!-- @component
  a simple wrapper to display the content only if the mediaquery matches

  **query**
  * string: 'mobile' | 'desktop'
  * default: !NO DEFAULT!
  * the mediaquery to match against

  ### Used mediaqueries
  * mobile: '(max-width: 767px)'
  * tablet: '(max-width: 1023)'
  * desktop: '(min-width: 1024px)'
 -->
<script lang="ts">
  import { onMount } from 'svelte';

  export let query: 'mobile' | 'desktop' | 'tablet';

  let innerWidth: number = 0;
</script>

<svelte:window bind:innerWidth />

{#if innerWidth <= 767 && query === 'mobile'}
  <slot />
{:else if innerWidth <= 1023 && query === 'tablet'}
  <slot />
{:else if innerWidth >= 1024 && query === 'desktop'}
  <slot />
{/if}
