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

  **divideHeadderSlot**
  * boolean
  * default: true
  * if the headder should be underlined
 -->
<script lang="ts">
  export let padding:
    | `${'' | '-'}p${'' | 't' | 'b' | 'r' | 'l' | 'x' | 'y'}-${number}`
    | '' = '';

  export let rounded: boolean = false;
  export let divideHeadderSlot = true;
</script>

<div
  class="bg-surface {padding} shadow-lg flex flex-col space-y"
  class:divide-y={divideHeadderSlot}
  class:rounded-xl={rounded}
>
  <slot name="Headder" />
  <div class:pt-2={divideHeadderSlot}>
    <slot />
  </div>
</div>
