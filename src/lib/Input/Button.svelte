<!-- @component
  a basic button

  **text**
  * string
  * default: ''
  * sets the text of the button

  **color**
  * string
  * default: 'bg-accent'
  * sets the color of the button

  **textColor**
  * string
  * default: 'text'
  * sets the text color of the button
  **additionalClasses**
  * string
  * default: ''
  * sets additional css/Tailwind classes for the button

  **on:click**
  * function
  * default: () => {}
  * triggered when the button is clicked

  **typewriterSpeed**
  * number
  * default: 0
  * if greater than 0, the text will be displayed typewriter style
 -->
<script lang="ts">
  import Text from '$lib/Wrapper/Text.svelte';

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

  export let textColor:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'surface'
    | 'text'
    | 'black' = 'text';

  export let typewriterSpeed = 0;
  export let additionalClasses = '';
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let text: string = '';
</script>

<label class="block">
  <button
    on:click
    class="block w-full {additionalClasses} bg-{bgColor} hover:bg-opacity-90 hover:scale-101 active:scale-99 duration-100"
    class:py-7={size === 'large'}
    class:py-3={size === 'medium'}
    class:text-4xl={size === 'large'}
    class:text-xl={size === 'medium'}
    class:text-sm={size === 'small'}
  >
    <div class="flex flex-row justify-center">
      <Text {text} {textColor} {typewriterSpeed} />
    </div>
  </button>
</label>
