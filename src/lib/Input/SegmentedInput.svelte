<script lang="ts">
  import { scale } from 'svelte/transition';
  import { createEventDispatcher, onMount } from 'svelte';
  import Textfield from './Textfield.svelte';

  const eventDispatcher = createEventDispatcher();

  export let value: string = '';

  export let segmentCount: number;

  let segmentArray: Array<{ id: number; value: string }>;

  onMount(() => {
    segmentArray = Array.apply(null, Array(segmentCount)).map(function (x, i) {
      return { id: i, value: '' };
    });
    value = segmentArray.map((segment) => ' ').join('');
  });
  async function input(segment: number, val: string) {
    segmentArray[segment].value = val;
    value = segmentArray
      .map((segment) => (segment.value ? segment.value : ' '))
      .join('');

    eventDispatcher('input');
  }
</script>

{#if segmentArray}
  {#each segmentArray as segment}
    <div in:scale class="w-8 flex flex-row ml-1 focus:border-surface">
      <Textfield
        placeholder="*"
        maxLength={1}
        on:input={(e) => {
          //@ts-ignore
          input(segment.id, e.target.value);
        }}
      />
    </div>
  {/each}
{/if}
