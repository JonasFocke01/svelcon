<!-- @component
display a date inputfield

**label**
* string
* default: 'Label'
* sets the label of the field

**placeholder**
* string
* default: 'Placeholder'
* sets the placeholder for the field

**min**
* string
* default: '1970-01-01'
* sets the minimum date of the field

**max**
* string
* default: '2100-01-01'
* sets the maximum date of the field

**value**
* date
* default: new Date()
* represents the value of the field

**disabled**
* boolean
* default: false
* sets the field to disabled/readonly

**showDisabledIcon**
* boolean
* default: false
* shows a disabled icon if the field is disabled
 -->
<script lang="ts">
  import Text from '$lib/Wrapper/Text.svelte';
  // import Fa from 'svelte-fa/src/fa.svelte';
  // import { faTextSlash } from '@fortawesome/free-solid-svg-icons/index.es';

  export let placeholder: string = 'Placeholder';
  export let label: string = 'Label';
  export let min = '1970-01-01';
  export let max = '2100-01-01';
  export let value = new Date();
  export let disabled = false;
  export let showDisabledIcon = false;
</script>

<label class="block">
  <div class="flex flex-row">
    <Text text={label} />

    {#if disabled && showDisabledIcon}
      <!-- <div class="mt-1.5 text-text">
        <Fa icon={faTextSlash} />
      </div> -->
    {/if}
  </div>
  <input
    type="datetime-local"
    class="block w-full rounded-md shadow-lg pl-3 pt-1 pb-1 text-black"
    {placeholder}
    {min}
    {max}
    on:change
    bind:value
    {disabled}
  />
</label>
