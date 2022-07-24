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
 -->
<script lang="ts">
  import Text from '$lib/Wrapper/Text.svelte';

  export let label: string = 'Label';
  export let checked: boolean = false;
  export let disabled: boolean = false;
</script>

<label class="inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    class="form-check-input h-4 w-4, rounded-sm bg-secondary checked:bg-accent focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
    bind:checked
    on:change
    {disabled}
  />
  <div class="ml-2">
    <Text text={label} />
  </div>
</label>
