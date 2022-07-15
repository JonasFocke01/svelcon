<!-- @component
display a basic radio group

**label**
* string
* default: !NO DEFAULT!
* sets the label of the Group

**items**
* Array<string>
* default: !NO DEFAULT!
* sets the items of the Group

**chosenItem**
* string
* default: 'none'
* represents the checked item of the Group

**on:change**
* function
* default: !NO DEFAULT!
* is called when the chosen item changes
 -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte/internal';
  import Text from '$lib/Wrapper/Text.svelte';

  let eventDispatcher = createEventDispatcher();
  export let label: string = '';

  export let items: Array<string> = [];
  export let chosenItem: string = 'none';

  const uniqName = Date.now().toString() + Math.random().toString();

  function clickIt(item: string) {
    chosenItem = item;
    eventDispatcher('change', item);
  }
</script>

<div>
  {#if label}
    <Text text={label} />
  {/if}
  {#if items.length}
    {#each items as item}
      <div class="flex flex-row mt-1">
        <input
          type="radio"
          id={item}
          name={uniqName}
          on:click={() => clickIt(item)}
        />
        <div class="-mt-1 ml-2">
          <Text text={item} />
        </div>
      </div>
    {/each}
  {/if}
</div>
