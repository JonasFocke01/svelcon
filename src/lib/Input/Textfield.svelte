<!-- @component
  a basic textinput field

  **label**
  * string
  * default: 'Label'
  * sets the label of the field

  **value**
  * string
  * default: ''
  * represents the value of the field

  **placeholder**
  * string
  * default: 'Platzhalter'
  * sets the placeholder for the field

  **required**
  * boolean
  * default: false
  * if true, the field is required

  **paddingleft**
  * boolean
  * default: false
  * if true, pl-10 is applyed to the inputtext

  **disabled**
  * boolean
  * default: false
  * if true, the field is disabled/readonly

  **let:warnUser**
  * boolean
  * slot
  * if true, the user is to be warned. Only works if required is true.

  **slot**
  * HTML
  * default: no default
  * adds the content above the input field and disposes a boolean if the user is to be warned.
 -->
<script lang="ts">
  import { onMount } from 'svelte';

  export let placeholder: string = 'Platzhalter';
  export let label: string = 'Label';
  export let required = false;
  export let value = '';
  export let paddingleft = false;
  export let disabled = false;

  let warnUser = false;

  $: {
    warnUser = required && value?.length === 0;
  }
  onMount(() => {
    if (disabled && required) {
      console.error(
        'ERROR: input ' + label + ' is disabled and required at the same time!'
      );
    }
  });
</script>

<label class="block text-xl font-bold">
  <span class="text-text" class:italic={disabled}>
    {#if !label.includes('Label')}
      {label}
    {/if}
    {#if required}
      <i>*Notwendig</i>
    {/if}
    <slot {warnUser} />
  </span>
  <input
    type="text"
    class="block w-full rounded-md pl-3 pt-1 pb-1 text-black
			{warnUser ? 'bg-warning' : null} 
			{paddingleft ? 'pl-10' : null}
			
		"
    {placeholder}
    bind:value
    on:change
    {disabled}
  />
</label>
