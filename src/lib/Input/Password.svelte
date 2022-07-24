<!-- @component
  a basic input field which displays the letters as dots

  **label**
  * string
  * default: 'Label'
  * sets the label of the field

  **password**
  * string
  * default: ''
  * represents the value of the field

  **placeholder**
  * string
  * default: 'Placeholder'
  * sets the placeholder for the field

  **on:valueChanged**
  *same as on:change but dispatched after hashing the value*
  * function
  * default: () => {}
  * sets the callback function for the change event

  **required**
  * boolean
  * default: false
  * sets the field to required
 -->
<script lang="ts">
  import Text from '$lib/Wrapper/Text.svelte';
  import { sha256 } from 'js-sha256';

  export let placeholder: string = 'Placeholder';
  export let label: string = 'Label';
  export let password: string = '';
  export let required: boolean = false;

  let value: string = '';

  $: password = sha256(value);
</script>

<label class="block">
  <Text text={label} />
  <input
    {required}
    type="password"
    class="block w-full rounded-md shadow-sm pl-3 pt-1 pb-1 text-black"
    {placeholder}
    bind:value
  />
</label>
