<!-- @component
  a basic number input field

  **label**
  * string
  * default: 'Label'
  * sets the label of the field

  **value**
  * number
  * default: 0
  * represents the value of the field

  **min**
  * number
  * default: -1024
  * sets the minimum value of the field

  **max**
  * number
  * default: 1024
  * sets the maximum value of the field

  **placeholder**
  * string
  * default: '0'
  * sets the placeholder for the field

  **disabled**
  * boolean
  * default: false
  * sets the field to disabled/readonly

  **on:change**
  * function
  * default: () => {}
  * sets the callback function for the change event
 -->
<script lang="ts">
  import Text from '$lib/Wrapper/Text.svelte';

  export let placeholder: string = '0';
  export let label: string = 'Label';
  export let min = -1024;
  export let max = 1024;
  export let value = 0;
  export let disabled = false;

  $: {
    if (min >= max) {
      min = max - 1;
      console.error('min >= max');
    }
  }

  $: {
    value = value > min ? value : min;
    value = value < max ? value : max;
  }
</script>

<div class="block">
  <Text text={disabled ? `#${label}#` : `${label}`} />
  <input
    type="number"
    class="block w-full rounded-md shadow-sm pl-3 pt-1 pb-1 text-black"
    {placeholder}
    {min}
    {max}
    bind:value
    {disabled}
    on:change
  />
</div>
