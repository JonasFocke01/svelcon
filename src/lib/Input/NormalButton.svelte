<!-- @component
  a basic button

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
    class="block w-full py-7 text-4xl font-bold text-text {additionalClasses} {color} hover:bg-opacity-90 hover:scale-101 active:scale-100 duration-100"
    >{label}
  </button>
</label>
