<!-- @component
display a basic checkbox

**label**
* string
* default: 'Label'
* sets the label of the checkbox

**checked**
* boolean
* default: false
* represents the checked state of the checkbox.

**on:change**
* function
* default: () => {}
* triggered when the checkbox is checked or unchecked.

**disabled**
* boolean
* default: false
* if true, the checkbox is disabled.

**showDisabledIcon**
* boolean
* default: false
* if true, the disabled icon will be displayed, if the checkbox is disabled.
 -->
<script lang="ts">
  import Text from '$lib/Wrapper/Text.svelte';
  // import Fa from 'svelte-fa/src/fa.svelte';
  // import { faTextSlash } from '@fortawesome/free-solid-svg-icons/index.es';

  export let label: string = 'Label';
  export let checked: boolean = false;
  export let disabled: boolean = false;
  export let showDisabledIcon = false;
</script>

<label class="inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    class="form-check-input h-4 w-4, rounded-sm bg-secondary checked:bg-accent focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
    bind:checked
    on:change
    {disabled}
  />
  <div class="ml-2 flex flex-row">
    {#if disabled && showDisabledIcon}
      <!-- <div class="mt-1.5 text-text">
        <Fa icon={faTextSlash} />
      </div> -->
    {/if}
    <div class="ml-1">
      <Text text={label} />
    </div>
  </div>
</label>
