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

**disabled**
* boolean
* default: false
* if true, the group is disabled/readonly

**showDisabledIcon**
* boolean
* default: false
* if true, the disabled icon will be displayed, if the group is disabled
 -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte/internal';
  import Text from '$lib/Wrapper/Text.svelte';
  // import Fa from 'svelte-fa/src/fa.svelte';
  // import { faTextSlash } from '@fortawesome/free-solid-svg-icons/index.es';

  let eventDispatcher = createEventDispatcher();
  export let label: string = '';

  export let items: Array<string> = [];
  export let chosenItem: string = 'none';

  export let disabled: boolean = false;
  export let showDisabledIcon: boolean = false;

  const uniqName = Date.now().toString() + Math.random().toString();

  function clickIt(item: string) {
    chosenItem = item;
    eventDispatcher('change', item);
  }
</script>

<div>
  {#if label}
    <div class="flex flex-row">
      <Text text={label} />
      <!-- {#if disabled && showDisabledIcon}
        <div class="mt-1.5 text-text">
          <Fa icon={faTextSlash} />
        </div>
      {/if} -->
    </div>
  {/if}
  {#if items.length}
    {#each items as item}
      <div class="flex flex-row mt-1">
        <input
          type="radio"
          id={item}
          name={uniqName}
          on:click={() => clickIt(item)}
          {disabled}
        />
        <div class="-mt-1 ml-2">
          <Text text={item} />
        </div>
      </div>
    {/each}
  {/if}
</div>
