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
  export let disabled = false;
  export let showDisabledIcon = false;

  let warnUser = false;

  $: {
    warnUser = required && value?.length === 0;
  }
  $: {
    if (disabled && required) {
      console.error(
        'ERROR: input ' + label + ' is disabled and required at the same time!'
      );
    }
  }
</script>

<label class="block">
  <div class="flex flex-row">
    {#if !label.includes('Label')}
      <Text text={label} />
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
  <slot {warnUser} />
  <textarea
    class="block w-full rounded-md pl-3 pt-1 pb-1 text-black
			{warnUser ? 'bg-warning' : null}
			
		"
    {placeholder}
    bind:value
    on:change
    {disabled}
  />
</label>
