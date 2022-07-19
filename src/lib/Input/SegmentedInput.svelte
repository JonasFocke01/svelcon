<!-- @component
An input field but segmented for each digit

**label**
* string
* default: ''
* sets the label of the field

**value**
* string
* default: ''
* represents the value of the field

**segmentCount**
* number
* default: !NO DEFAULT!
* sets the number of segments which in turn are the number of inputable digits
 -->
<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import Textfield from './Textfield.svelte';
  import Text from '$lib/Wrapper/Text.svelte';

  const eventDispatcher = createEventDispatcher();

  export let label: string = '';

  export let value: string = '';

  export let segmentCount: number;

  let segmentArray: Array<{ id: number; value: string; element: any }>;

  onMount(() => {
    segmentArray = Array.apply(null, Array(segmentCount)).map(function (x, i) {
      return { id: i, value: '', focus: false };
    });
    value = segmentArray.map((segment) => ' ').join('');
  });
  async function input(segment: number, val: any) {
    segmentArray.length !== segment + 1
      ? segmentArray[segment + 1].element.focusThis()
      : null;
    val = val.target.value;
    segmentArray[segment].value = val;
    value = segmentArray
      .map((segment) => (segment.value ? segment.value : ' '))
      .join('');

    eventDispatcher('input');
  }
</script>

{#if segmentArray}
  <div>
    <Text text={label} />
  </div>
  <div class="flex flex-row">
    {#each segmentArray as segment}
      <div class="w-8 ml-1 focus:border-surface">
        <Textfield
          bind:this={segment.element}
          placeholder="*"
          maxLength={1}
          on:input={(e) => {
            //@ts-ignore
            input(segment.id, e);
          }}
        />
      </div>
    {/each}
  </div>
{/if}
