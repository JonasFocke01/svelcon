<script lang="ts">
  import { scale } from 'svelte/transition';
  import { createEventDispatcher, onMount } from 'svelte';
  import Textfield from './Textfield.svelte';

  const eventDispatcher = createEventDispatcher();

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
  <div class="flex flex-row">
    {#each segmentArray as segment}
      <div in:scale class="w-8 ml-1 focus:border-surface">
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
