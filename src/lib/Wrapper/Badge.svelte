<svelte:options accessors />

<!-- @component
  a basic badge

  **text**
    * string
    * default: ''
    * the text of the badge. 
    * This should never be a long text but rather a single digit

  **bgColor**
    * string
    * default: 'bg-accent'
    * sets the bgColor of the badge

  **slot**
    * slot
    * default: !NO DEFAULT!
    * what to display the badge on

  **bounce**
    * boolean
    * default: true
    * if true, the badge will bounce continously.
 -->
<script lang="ts">
  import Text from './Text.svelte';

  export let text: string = '';
  export let bounce: boolean = true;

  export let bgColor:
    | 'error'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'success'
    | 'warning'
    | 'info'
    | 'surface'
    | 'text'
    | 'black' = 'accent';
</script>

<div class="relative max-w-fit">
  <div class="absolute w-full -mt-2" class:animate-bounce={bounce}>
    <div class="ml-auto px-1 rounded-full max-w-min bg-{bgColor}">
      <div class="translate-x-0.5">
        <Text {text} size="xs" />
      </div>
    </div>
  </div>
  <slot />
</div>
