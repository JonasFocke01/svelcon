<!-- @component
  a simple wrapper to display the content in a cardlike container

  **padding**
  * tailwind padding class
  * default: ''
  * the padding of the card container
  * example: 'p-4'

  **rounded**
  * boolean
  * default: false
  * if the card should have rounded corners
 -->
<script lang="ts">
  export let padding:
    | `${'' | '-'}p${'' | 't' | 'b' | 'r' | 'l' | 'x' | 'y'}-${number}`
    | '' = '';

  export let rounded: boolean = false;
</script>

<div class="bg-surface {padding} shadow-lg" class:rounded-xl={rounded}>
  <slot />
</div>
