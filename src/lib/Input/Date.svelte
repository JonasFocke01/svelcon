<!-- @component
display a date inputfield

**label**
* string
* default: 'Label'
* sets the label of the field

**placeholder**
* string
* default: 'Platzhalter'
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
 -->
<script lang="ts">
  export let placeholder: string = 'Platzhalter';
  export let label: string = 'Label';
  export let min = '1970-01-01';
  export let max = '2100-01-01';
  export let value = new Date();
</script>

<label class="block text-xl font-bold">
  <span class="text-text">{label}</span>
  <input
    type="datetime-local"
    class="block w-full rounded-md shadow-lg pl-3 pt-1 pb-1 text-black"
    {placeholder}
    {min}
    {max}
    on:change
    bind:value
  />
</label>
