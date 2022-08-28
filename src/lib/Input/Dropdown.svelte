<!-- @component
display a basic dropdown field

**label**
* string
* default: 'Label'
* sets the label of the field

**options**
* Array< string >
* default: ['']
* all available options

**value**
* string
* default: ''
* represents the value of the field

**on:change**
* function
* default: () => {}
* triggered when the value of the input changes

**disabled**
* boolean
* default: false
* if true, the field is disabled/readonly

**showDisabledIcon**
* boolean
* default: false
* if true, the disabled icon will be displayed, if the field is disabled
 -->
<script lang="ts">
  import Text from '$lib/Wrapper/Text.svelte';
  // import Fa from 'svelte-fa/src/fa.svelte';
  // import { faTextSlash } from '@fortawesome/free-solid-svg-icons/index.es';

  export let options: Array<string>;
  export let label: string = 'Label';
  export let value = '';
  export let disabled = false;
  export let showDisabledIcon = false;
</script>

{#if options}
  <label class="block">
    <div class="flex flex-row">
      <Text text={label} />
      <!-- {#if disabled && showDisabledIcon}
        <div class="mt-1.5 text-text">
          <Fa icon={faTextSlash} />
        </div>
      {/if} -->
    </div>
    <select
      class="block w-full mt-1 rounded-md shadow-lg pl-3 pt-1 pb-1 text-black"
      bind:value
      on:change
      {disabled}
    >
      {#each options as option}
        <option>{option}</option>
      {/each}
    </select>
  </label>
{/if}
