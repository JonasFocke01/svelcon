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
 -->
<script lang="ts">
  export let options: Array<string>;
  export let label: string = 'Label';
  export let value = '';
</script>

{#if options}
  <label class="block text-xl font-bold">
    <span class="text-text">{label}</span>
    <select
      class="block w-full mt-1 rounded-md shadow-lg pl-3 pt-1 pb-1 text-black"
      bind:value
      on:change
    >
      {#each options as option}
        <option>{option}</option>
      {/each}
    </select>
  </label>
{/if}
