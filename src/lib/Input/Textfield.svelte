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
  * default: 'Placeholder'
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

  **on:change**
  * function
  * default: () => {}
  * triggered when the value of the field changes.

  **on:input**
  * function
  * default: () => {}
  * triggered when the user inputs something.

  **method: focusThis**
  * function
  * focuses and selects everything in the input field.

  **showDisabledIcon**
  * boolean
  * default: false
  * if true, the disabled icon will be displayed, if the field is disabled
 -->
<script lang="ts">
  import Text from '$lib/Wrapper/Text.svelte';
  import MdDoNotDisturbAlt from 'svelte-icons/md/MdDoNotDisturbAlt.svelte';

  export let placeholder: string = 'Placeholder';
  export let label: string = 'Label';
  export let required = false;
  export let value = '';
  export let paddingleft = false;
  export let disabled = false;
  export let maxLength = 255;
  export let showDisabledIcon = false;

  let warnUser = false;

  $: {
    if (disabled && required) {
      console.error(
        `The Inputfield ${label} is disabled and required simultaneously. This is not allowed.`
      );
    }
  }

  $: {
    warnUser = required && value?.length === 0;
  }

  let thisInput: any;
  export function focusThis() {
    thisInput.focus();
    thisInput.select();
  }
</script>

<label class="block">
  <div class="flex flex-row">
    {#if !label.includes('Label')}
      <Text text={disabled ? `#${label}#` : label} />
    {/if}
    {#if required}
      <Text text="#!*required#" />
    {/if}
    {#if disabled && showDisabledIcon}
      <div class="mt-1 w-4 text-text">
        <MdDoNotDisturbAlt />
      </div>
    {/if}
  </div>
  <input
    bind:this={thisInput}
    type="text"
    class="block w-full rounded-md pl-3 pt-1 pb-1 text-black
			{warnUser ? 'bg-warning' : null} 
			{paddingleft ? 'pl-10' : null}
			
		"
    maxlength={maxLength}
    {placeholder}
    bind:value
    on:change
    on:input
    {disabled}
  />
</label>
