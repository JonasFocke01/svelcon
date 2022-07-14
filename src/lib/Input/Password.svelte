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
  * default: 'Platzhalter'
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
  import { sha256 } from 'js-sha256';

  export let placeholder: string = 'Platzhalter';
  export let label: string = 'Label';
  export let password: string = '';
  export let required: boolean = false;

  let value: string = '';

  $: password = sha256(value);
</script>

<label class="block text-xl font-bold">
  <span class="text-text">{label}</span>
  <input
    {required}
    type="password"
    class="block w-full rounded-md shadow-sm pl-3 pt-1 pb-1 text-black"
    {placeholder}
    bind:value
  />
</label>
