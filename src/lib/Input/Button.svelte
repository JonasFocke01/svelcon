<!-- @component
  a basic button

  **label**
  * string
  * default: 'Label'
  * sets the text of the button

  **color**
  * string
  * default: 'bg-accent'
  * sets the color of the button

  **additionalClasses**
  * string
  * default: ''
  * sets additional css/Tailwind classes for the button

  **on:click**
  * function
  * default: () => {}
  * triggered when the button is clicked
 -->
<script lang="ts">
  import Text from '$lib/Wrapper/Text.svelte';

  interface Text {
    text: string;
    color?:
      | 'error'
      | 'primary'
      | 'secondary'
      | 'accent'
      | 'success'
      | 'warning'
      | 'info'
      | 'surface'
      | 'text'
      | 'black';
    typewriter?: {
      enable: boolean;
      speed: number;
    };
  }
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
  export let additionalClasses = '';
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let text: Text = {
    text: ''
  };
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
      <Text
        text={text.text}
        textcolor={text.color}
        typewriter={text.typewriter}
      />
    </div>
  </button>
</label>
