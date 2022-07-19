<script lang="ts" context="module">
  /**
   * Each exported Item is an object with the following properties:
   */
  export interface Item {
    text: string;
    value: string;
    selected: boolean;
  }
</script>

<!-- @component
  Displays a list of items that can be selected if wanted

  How to use: You can create an Item array in the parent component and pass it directly, 
  but you can also pass an string array or an key value object array and it will be automatically converted 
  to an Item array

  **text**
  * string
  * default: ''
  * the headline of the component
  
  **inputItemsString**
  * Array<string>
  * default !No default!
  * an array of strings that will be converted to an Item array
  * note: only pass this, but DO NOT BIND TO IT!

  **inputItemsKeyValue**
  * Array<{text: string, value: string}>
  * default !No default!
  * an array of key value objects that will be converted to an Item array
  * note: only pass this, but DO NOT BIND TO IT!

  **itemListToBind**
  * Array<Item>
  * default: []
  * the exported itemarray
  * BIND THIS!

  **selectable**
  * boolean
  * default: false
  * if true, the items can be selected

  **multiselect**
  * boolean
  * default: false
  * if true, multiple items can be selected

  **showCheckbox**
  * boolean
  * default: false
  * if true, displays a checkbox for every item

  **filterable**
  * boolean
  * default: false
  * if true, a filterbox will appear

  **button**
  * boolean
  * default: false
  * if true, a button is displayed below the list

  **buttonText**
  * string
  * default: 'Button'
  * the text of the button

  **on:buttonClicked**
  * function
  * default: () => {}
  * the function to be called when the button is clicked
-->
<script lang="ts">
  import Checkbox from '$lib/Input/Checkbox.svelte';
  import Button from '$lib/Input/Button.svelte';
  import Textfield from '$lib/Input/Textfield.svelte';
  import Card from '$lib/Wrapper/Card.svelte';
  import { createEventDispatcher, onMount } from 'svelte/internal';
  import Text from './Text.svelte';

  let eventDispatcher = createEventDispatcher();

  let filter: string = '';

  export let text: string = '';
  export let showCheckbox: boolean = false;
  export let inputItemsString: Array<string> = [];
  export let inputItemsKeyValue: Array<{
    text: string;
    value: string;
  }> = [];
  export let itemlistToBind: Array<Item> = [];

  export let selectable: boolean = false;
  export let multiselect: boolean = false;
  export let filterable: boolean = false;

  export let button: boolean = false;
  export let buttontext: string = 'Button';

  function selectItem(item: Item) {
    if (selectable) {
      eventDispatcher('itemSelected', item);
      if (!multiselect) {
        itemlistToBind.forEach((i) => {
          i.selected = i.text === item.text;
        });
      } else {
        item.selected = !item.selected;
      }
      itemlistToBind = itemlistToBind;
    }
  }

  onMount(() => {
    inputItemsString.length > 0
      ? inputItemsString.forEach((i) => {
          itemlistToBind = [
            ...itemlistToBind,
            { text: i, value: '', selected: false }
          ];
        })
      : null;
    inputItemsKeyValue.length > 0
      ? inputItemsKeyValue.forEach((i) => {
          itemlistToBind = [
            ...itemlistToBind,
            { text: i.text, value: i.value, selected: false }
          ];
        })
      : null;
  });
</script>

<Card>
  <div class="flex flex-row">
    <div class="mb-4" on:click={() => console.log(filter)}>
      <Text text={filter ? `#${text}#` : text} />
    </div>
    {#if filterable}
      <div class="ml-auto mt-1">
        <Textfield placeholder="Filter" bind:value={filter} />
      </div>
    {/if}
  </div>
  <ul>
    {#if itemlistToBind && itemlistToBind.length}
      {#each filter.length > 0 ? itemlistToBind.filter((e) => e.text
                .toLowerCase()
                .indexOf(filter.toLowerCase()) > -1) : itemlistToBind as item}
        <li
          on:click={() => selectItem(item)}
          class="mt-2 w-full flex flex-row p-2 rounded-lg cursor-pointer"
          class:bg-primary={item.selected}
          class:cursor-pointer={selectable}
          class:hover:bg-secondary={selectable}
          class:cursor-default={!selectable}
        >
          <div class="w-2/3">
            <Text text={`> ${item.text}`} />
          </div>
          {#if !showCheckbox && item.value}
            <div class="w-2/3">
              <Text text={`>${item.value}`} />
            </div>
          {:else}
            <Checkbox bind:checked={item.selected} label="" />
          {/if}
        </li>
      {/each}
    {/if}
  </ul>
  {#if button}
    <div class="mt-4">
      <Button
        text={{ text: buttontext }}
        on:click={() => {
          eventDispatcher('buttonClicked');
        }}
      />
    </div>
  {/if}
</Card>
