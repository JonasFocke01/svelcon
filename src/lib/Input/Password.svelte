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

  **disabled**
  * boolean
  * default: false
  * sets the field to disabled/readonly

  **showDisabledIcon**
  * boolean
  * default: false
  * shows a disabled icon if the field is disabled

  **required**
  * boolean
  * default: false
  * sets the field to required
 -->
<script lang="ts">
  import Text from '$lib/Wrapper/Text.svelte';
  import { sha256 } from 'js-sha256';
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faTextSlash } from '@fortawesome/free-solid-svg-icons/index.es';

  export let placeholder: string = 'Placeholder';
  export let label: string = 'Label';
  export let password: string = '';
  export let required: boolean = false;
  export let disabled: boolean = false;
  export let showDisabledIcon: boolean = false;

  let value: string = '';

  $: password = sha256(value);
</script>

<label class="block">
  <div class="flex flex-row">
    <Text text={label} />
    {#if disabled && showDisabledIcon}
      <div class="mt-1.5 text-text">
        <Fa icon={faTextSlash} />
      </div>
    {/if}
  </div>
  <input
    {required}
    type="password"
    class="block w-full rounded-md shadow-sm pl-3 pt-1 pb-1 text-black"
    {placeholder}
    bind:value
    {disabled}
  />
</label>
