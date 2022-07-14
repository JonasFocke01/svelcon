<!-- @component
  a basic button in small size

  **label**
  * string
  * default: 'Label'
  * sets the text of the button

  **color**
  * string
  * default: 'bg-accent'
  * sets the color of the button

  **additionalClasses**
  * string
  * default: ''
  * sets additional css/Tailwind classes for the button

  **on:click**
  * function
  * default: () => {}
  * triggered when the button is clicked
 -->
<script lang="ts">
  export let label = 'Label';
  export let color = 'bg-accent';
  export let additionalClasses = '';
</script>

<label class="block">
  <span class="text-text" />
  <button
    on:click
    class="block w-full text-sm font-bold text-text {additionalClasses} {color} hover:bg-opacity-90 hover:scale-105 active:scale-95 duration-100"
    >{label}
  </button>
</label>
